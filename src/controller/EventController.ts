import { Request, Response } from "express";
import { statusCode, generalMessage } from "../config/constant";
import {
  getActiveEventsUtils,
  registerForEventUtils,
  registeredEventUtils,
} from "../utils/Event.Utils";

export const getActiveEventsController = async (req: any, res: Response) => {
  try {
    const data = await getActiveEventsUtils();
    res.json(data);
  } catch (error) {
    console.log("error ::", error``);
    res.json({
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    });
  }
};

export const registerEventController = async (req: any, res: Response) => {
  try {
    console.log("req.headers.authorization :: ", req.headers.authorization);
    console.log("req.body :: ", req.body);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${req.headers.authorization}`,
    };
    const data = await registerForEventUtils(req.body, headers);
    res.json(data);
  } catch (error) {
    console.log("error ::", error``);
    res.json({
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    });
  }
};

export const registeredEventController = async (req: any, res: Response) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${req.headers.authorization}`,
    };
    const data = await registeredEventUtils(headers);
    res.json(data);
  } catch (error) {
    console.log("error ::", error);
    res.json({
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    });
  }
};

module.exports = {
  getActiveEventsController,
  registerEventController,
  registeredEventController,
};
