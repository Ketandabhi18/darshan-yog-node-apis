import { Request, Response } from "express";
import { generalMessage, statusCode } from "../config/constant";
import {
  createProgramUtils,
  deleteProgramUtils,
  getAllProgramUtils,
  getSingleProgramUtils,
  updateScheduledProgramUtils,
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

export const getAllProgramController = async (req: any, res: Response) => {
  try {
    const data = await getAllProgramUtils();
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

export const getSingleProgramController = async (req: any, res: Response) => {
  try {
    const data = await getSingleProgramUtils(req.params.id);
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

export const updateScheduledProgramController = async (
  req: any,
  res: Response
) => {
  try {
    const data = await updateScheduledProgramUtils(req.body, req.file);
    res.json(data);
  } catch (error) {
    console.log("error :: controller", error``);
    res.json({
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    });
  }
};

module.exports = {
  createProgramController,
  deleteProgramController,
  getAllProgramController,
  getSingleProgramController,
  updateScheduledProgramController,
};
