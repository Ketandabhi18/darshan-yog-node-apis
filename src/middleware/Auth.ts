import { NextFunction, Request, Response } from "express";
import { VerifyErrors, verify } from "jsonwebtoken";
import { AuthMessage, generalMessage, statusCode } from "../config/constant";

const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined =
      (req.headers["x-access-token"] as string) ||
      (req.params["x-access-token"] as string) ||
      (req.query["x-access-token"] as string);
    console.log("auth :: token :: ", token);

    if (!token) {
      return res.send({
        status: statusCode.UNAUTHORIZED,
        data: "",
        message: AuthMessage.NO_TOKEN,
      });
    }

    let secret: string =
      req.body.type === 1
        ? process.env.SECRETADMIN
        : process.env.SECRETUSER ?? "";
    verify(token, secret, function (err: VerifyErrors | null, decoded: any) {
      if (err) {
        return res.send({
          status: statusCode.BAD_REQUEST,
          data: err,
          message: AuthMessage.FAILED_TO_AUTHENTICATE,
        });
      }
      console.log("auth :: decode :: ", decoded);
      req.userId = decoded.id;

      next();
    });
  } catch (error) {
    console.log("auth :: error :: ", error);
    return res.send({
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    });
  }
};

export default auth;
