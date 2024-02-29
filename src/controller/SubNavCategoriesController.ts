import { Request, Response } from "express";
import { generalMessage, statusCode } from "../config/constant";
import {
  createSubNavCategoriesUtils,
  deleteSubNavCategoryUtils,
  getAllSubNavCategoriesUtils,
  getSingleSubNavCategoryUtils,
  updateSubNavCategoryUtils,
} from "../utils/SubNavCategoriesUtils";
export const createSubNavCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("createSubNavCate :: req.body :: ", req.body);
    const data = await createSubNavCategoriesUtils(req.body);
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

export const getAllSubNavCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getAllSubNavCategoriesUtils();
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

export const getSingleSubNavCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getSingleSubNavCategoryUtils(req.params.id);
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

export const updateSubNavCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await updateSubNavCategoryUtils(req.body);
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

export const deleteSubNavCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await deleteSubNavCategoryUtils(req.body);
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
  createSubNavCategoriesController,
  getAllSubNavCategoriesController,
  getSingleSubNavCategoriesController,
  updateSubNavCategoriesController,
  deleteSubNavCategoriesController,
};
