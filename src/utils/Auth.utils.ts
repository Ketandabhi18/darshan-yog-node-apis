import { db } from "../config/db.config";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AuthMessage, generalMessage, statusCode } from "../config/constant";
import { collections } from "../config/collections";

export const adminLoginUtils = async (data: any) => {
  try {
    const { username, password } = data;

    let findAdmin = await db
      .collection(collections.admins)
      .findOne({ username: username });
    console.log("login :: findAdmin :: ", findAdmin);

    if (!findAdmin) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: AuthMessage.ADMIN_NOT_EXISTS,
      };
    }

    let comparePass = await compare(password, findAdmin.password);
    console.log("comparePass :: ", password, findAdmin.password);
    if (!comparePass) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: AuthMessage.INVALID_PASSWORD,
      };
    }

    let secret = process.env.SECRET ?? "";
    console.log("secret :: ", secret);
    let token = sign({ id: findAdmin._id }, secret, {
      expiresIn: 86400 /* expires in 24 hours */,
    });

    let updateAdmin = await db.collection(collections.admins).findOneAndUpdate(
      { username: username },
      {
        $set: {
          token,
          updateAt: new Date(),
        },
      },
      { upsert: true, returnDocument: "after" }
    );
    console.log("udpateAdmin :: ", updateAdmin);
    if (updateAdmin) {
      (updateAdmin.originalPassword = undefined),
        (updateAdmin.password = undefined);
    }

    return {
      status: statusCode.SUCCESS,
      data: updateAdmin,
      message: AuthMessage.LOGIN_SUCCESS,
    };
  } catch (error) {
    console.log(error);
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};

export const userLoginUtils = async (data: any) => {
  try {
    const { username, password } = data;

    let findUser = await db
      .collection(collections.users)
      .findOne({ username: username });
    console.log("login :: findUser :: ", findUser);

    if (!findUser) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: AuthMessage.USER_NOT_EXISTS,
      };
    }

    let comparePass = await compare(password, findUser.password);
    console.log("comparePass :: ", password, findUser.password);
    if (!comparePass) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: AuthMessage.INVALID_PASSWORD,
      };
    }

    let secret = process.env.SECRET ?? "";
    console.log("secret :: ", secret);
    let token = sign({ id: findUser._id }, secret, {
      expiresIn: 86400 /* expires in 24 hours */,
    });

    let updateUser = await db.collection(collections.users).findOneAndUpdate(
      { username: username },
      {
        $set: {
          token,
          updateAt: new Date(),
        },
      },
      { upsert: true, returnDocument: "after" }
    );
    console.log("udpateUser :: ", updateUser);
    if (updateUser) {
      (updateUser.originalPassword = undefined),
        (updateUser.password = undefined);
    }

    return {
      status: statusCode.SUCCESS,
      data: updateUser,
      message: AuthMessage.LOGIN_SUCCESS,
    };
  } catch (error) {
    console.log(error);
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};
