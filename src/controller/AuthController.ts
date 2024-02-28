import { Request, Response } from "express";
import {
  adminLoginUtils,
  getOtpUtils,
  registerUserUtils,
  userLoginUtils,
} from "../utils/Auth.utils";
import { generalMessage, statusCode } from "../config/constant";

export const login = async (req: Request, res: Response) => {
  try {
    let data: any;
    console.log("login :: req.body :: ", req.body);
    const { type } = req.body;
    if (parseInt(type) === 1) {
      data = await adminLoginUtils(req.body);
      res.json(data);
    } else {
      data = await userLoginUtils(req.body);
      res.json(data);
    }
  } catch (error) {
    console.log("login :: error :: ", error);
    res.send({
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    console.log("login :: req.body :: ", req.body);

    const data = await registerUserUtils(req.body);
    res.json(data);
  } catch (error) {
    console.error("error :: ", error);
    res.json({
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    });
  }
};
export const getOtpController = async (req: Request, res: Response) => {
  try {
    console.log("req.body :: ", req.body);
    const data = await getOtpUtils(req.body);
    res.json(data);
  } catch (error) {
    console.log("login :: error :: ", error);
    res.json({
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    });
  }
};

module.exports = {
  login,
  getOtpController,
  registerController,
};
