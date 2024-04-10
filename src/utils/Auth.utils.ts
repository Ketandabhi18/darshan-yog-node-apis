import { db } from "../config/db.config";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import {
  AuthMessage,
  Messages,
  generalMessage,
  statusCode,
} from "../config/constant";
import { collections } from "../config/collections";
import { sendOtp } from "../middleware/Otp";
import axios from "axios";

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

    let secret = process.env.SECRETADMIN ?? "";
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

    let secret = process.env.SECRETUSER ?? "";
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

export const registerUserUtils = async (data: any) => {
  try {
    let { name, email, mobile, password, ...restFields } = data;

    let findUser = await db
      .collection(collections.users)
      .findOne({ email: email });
    console.log("findUser :: ", findUser?._id);

    if (findUser) {
      const { password, originalPassword, ...withoutPasswords } = findUser;
      return {
        status: 400,
        data: withoutPasswords,
        message: AuthMessage.EMAIL_ALREADY_EXISTS,
      };
    }

    let pass = await hash(password, 10);
    const registerUser = await db.collection(collections.users).insertOne({
      name,
      email,
      mobile,
      originalPassword: password,
      password: pass,
      ...restFields,
      createAt: new Date(),
    });
    console.log("registerUser :: ", registerUser);

    const otpresponse = await sendOtp(mobile);
    console.log("RegisterUser  :: sendOtpResponse :: ", otpresponse);

    return {
      status: statusCode.CREATED,
      data: registerUser,
      message: AuthMessage.REGISTRATION_SUCCESS,
    };
  } catch (error) {
    console.log("Registration :: error :: ", error);
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};

export const getOtpUtils = async (data: any) => {
  try {
    const res = await axios.post(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/otp",
      {
        username: data.username,
        countryCode: "+91",
      }
    );
    console.log("get otp :: res.data", res.data);

    if (res.data.data) {
      return {
        status: statusCode.SUCCESS,
        data: {},
        message: AuthMessage.OTP_SENT,
      };
    } else {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: res.data.error.errorMessage,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};

export const userLoginCentralizedAPi = async (data: any) => {
  try {
    const { username, password } = data;
    console.log("username :: ", username, "password :: ", password);

    // Encode username and password in base64
    const authString = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );

    const requestHeaders = {
      // "Content-Type": "application/json",
      Authorization: `Basic ${authString}`,
    };

    const response = await axios.get(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/user",
      {
        headers: requestHeaders,
      }
    );
    console.log("response :: data :: Login Api :: ", response);
    if (Object.keys(response.headers).includes("authorization")) {
      return {
        status: statusCode.SUCCESS,
        data: { token: response.headers.authorization, ...response.data.data },
        message: AuthMessage.LOGIN_SUCCESS,
      };
    } else {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: AuthMessage.LOGIN_FAILED,
      };
    }
  } catch (error) {
    console.log("error :: ", error);
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};

export const userUpdateUtils = async (data: any, headers: any) => {
  try {
    const response = await axios.post(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/save/user",
      data,
      { headers: headers }
    );

    console.log("user update utils :: ", response.data);

    if (response.data.data) {
      return {
        status: statusCode.SUCCESS,
        data: response.data.data,
        message: Messages.USER_UPDATED,
      };
    } else {
      return {
        status: statusCode.BAD_REQUEST,
        data: null,
        message: response.data.error.errorMessage,
      };
    }
  } catch (error) {
    console.log("error :: ", error);
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};

export const userPasswordUpdateUtils = async (data: any, headers: any) => {
  try {
    const response = await axios.post(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/password",
      data,
      { headers: headers }
    );

    console.log("response.data.data :: ", response);
    return {
      status: statusCode.SUCCESS,
      data: response.data.data,
      message: Messages.USER_PASSWORD_UPDATED,
    };
  } catch (error) {
    console.log("error :: ", error);
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};

module.exports = {
  userLoginUtils,
  adminLoginUtils,
  getOtpUtils,
  registerUserUtils,
  userLoginCentralizedAPi,
  userUpdateUtils,
  userPasswordUpdateUtils,
};
