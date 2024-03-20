import { Request, Response } from "express";
import { statusCode, generalMessage } from "../config/constant";
import { getActiveEventsUtils } from "../utils/Event.Utils";

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

module.exports = {
  getActiveEventsController,
};
