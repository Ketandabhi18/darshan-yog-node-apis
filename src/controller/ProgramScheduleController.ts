import { Request, Response } from "express";
import { generalMessage, statusCode } from "../config/constant";
import {
  createProgramUtils,
  deleteProgramUtils,
} from "../utils/ProgramScheduleUtils";
export const createProgramController = async (req: any, res: Response) => {
  try {
    console.log("req.body :: req.file :: ", req.body, req.file);

    const data = await createProgramUtils(req.body, req.file);
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

export const deleteProgramController = async (req: any, res: Response) => {
  try {
    const data = await deleteProgramUtils(req.body._id);
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

module.exports = { createProgramController, deleteProgramController };
