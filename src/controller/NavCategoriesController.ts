import { Request, Response } from "express";
import { generalMessage, statusCode } from "../config/constant";
import {
  createNavCategoriesUtils,
  deleteNavCategoryUtils,
  getAllNavCategoryUtils,
  getSingleNavCategoryUtils,
  updateNavCategoryUtils,
} from "../utils/NavCategoriesUtils";

export const createNavCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("createNavCate :: req.body :: ", req.body);
    const data = await createNavCategoriesUtils(req.body);
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

export const getSingleNavCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("singlecategory :: req.params :: ", req.params, req.query);
    const data = await getSingleNavCategoryUtils(req.params.id);
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

export const getAllNavCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getAllNavCategoryUtils();
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

export const updateNavCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await updateNavCategoryUtils(req.body);
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

export const deleteNavCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await deleteNavCategoryUtils(req.body);
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
  createNavCategoriesController,
  getSingleNavCategoryController,
  getAllNavCategoryController,
  updateNavCategoryController,
  deleteNavCategoryController,
};
