import { Request, Response } from "express";
import { statusCode, generalMessage } from "../config/constant";
import {
  getActiveEventsUtils,
  getregisteredEventUtils,
  postregisteredEventUtils,
  registerForEventUtils,
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

export const postregisteredEventController = async (
  req: any,
  res: Response
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${req.headers.authorization}`,
    };
    const data = await postregisteredEventUtils(headers, req.body);
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
export const getregisteredEventController = async (req: any, res: Response) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${req.headers.authorization}`,
    };
    const data = await getregisteredEventUtils(headers, req.query);
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
  postregisteredEventController,
  getregisteredEventController,
};
