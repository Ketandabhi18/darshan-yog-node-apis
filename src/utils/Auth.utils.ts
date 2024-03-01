import { db } from "../config/db.config";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AuthMessage, generalMessage, statusCode } from "../config/constant";
import { collections } from "../config/collections";
import { sendOtp } from "../middleware/Otp";

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
    let { name, email, mobile, password } = data;

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
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Set environment variables for your credentials
    // Read more at http://twil.io/secure
    const accountSid = "AC8dedee7b4537b26974944eac444c07c8";
    const authToken = "c020290076d0a01fbc6cb4ec452cd7b2";
    const verifySid = "VA3a76ffdcd084c518a93cda5e3a834d13";
    const client = require("twilio")(accountSid, authToken);

    client.verify.v2
      .services(verifySid)
      .verifications.create({ to: "+918849836465", channel: "sms" })
      .then((verification) => console.log(verification.status))
      .then(() => {
        const readline = require("readline").createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        readline.question("Please enter the OTP:", (otpCode) => {
          client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: "+918849836465", code: otpCode })
            .then((verification_check) =>
              console.log(verification_check.status)
            )
            .then(() => readline.close());
        });
      });
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: "error",
      message: generalMessage.SOMETHING_WENT_WRONG,
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

module.exports = {
  userLoginUtils,
  adminLoginUtils,
  getOtpUtils,
  registerUserUtils,
};
