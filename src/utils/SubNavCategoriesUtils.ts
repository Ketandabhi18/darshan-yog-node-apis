import { ObjectId } from "mongodb";
import { collections } from "../config/collections";
import { Messages, generalMessage, statusCode } from "../config/constant";
import { db } from "../config/db.config";

export const createSubNavCategoriesUtils = async (data: any) => {
  try {
    const { name, category_id, content } = data;

    const findSubNavCategory = await db
      .collection(collections.subnavcategories)
      .findOne({ name });

    if (findSubNavCategory) {
      return {
        status: statusCode.BAD_REQUEST,
        data: findSubNavCategory,
        message: Messages.SUBNAVCATEGORY_ALREADY_EXISTS,
      };
    }

    let createSubNavcategory: any = await db
      .collection(collections.subnavcategories)
      .insertOne({
        name,
        content,
        category_id: new ObjectId(category_id),
        isDeleted: 0,
        createAt: new Date(),
      });

    return {
      status: statusCode.CREATED,
      data: createSubNavcategory,
      message: Messages.SUBNAVCATEGORY_ADDED,
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

export const getAllSubNavCategoriesUtils = async () => {
  try {
    let subNavcategories: any = await db
      .collection(collections.subnavcategories)
      .aggregate([
        {
          $lookup: {
            from: "navcategories",
            localField: "category_id",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        {
          $project: {
            _id: 1,
            category_id: 1,
            content: 1,
            name: 1,
            category: { $arrayElemAt: ["$categoryDetails.name", 0] },
          },
        },
      ])
      .toArray();

    console.log("subNavcategories :: ", subNavcategories);

    if (subNavcategories.length == 0) {
      return {
        status: statusCode.BAD_REQUEST,
        data: [],
        message: Messages.SUBNAVCATEGORY_NOT_EXIST,
      };
    }

    return {
      status: statusCode.SUCCESS,
      data: subNavcategories,
      message: Messages.SUBNAVCATEGORY_DETAILS,
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

export const getSingleSubNavCategoryUtils = async (_id: any) => {
  try {
    let subNavcategory: any = await db
      .collection(collections.subnavcategories)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: "navcategories",
            localField: "category_id",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        {
          $project: {
            _id: 1,
            category_id: 1,
            name: 1,
            content: 1,
            category: { $arrayElemAt: ["$categoryDetails.name", 0] },
          },
        },
      ])
      .toArray();
    console.log("subNavcategory :: ", subNavcategory);
    if (subNavcategory.length == 0) {
      return {
        status: statusCode.BAD_REQUEST,
        data: [],
        message: Messages.SUBNAVCATEGORY_NOT_EXIST,
      };
    }

    return {
      status: statusCode.CREATED,
      data: subNavcategory,
      message: Messages.SUBNAVCATEGORY_DETAILS,
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

export const updateSubNavCategoryUtils = async (data: any) => {
  try {
    const { _id, ...updateObj } = data;
    const subNavCategory = await db
      .collection(collections.subnavcategories)
      .findOne({ _id: new ObjectId(_id) });
    console.log("subNavCategory :: ", subNavCategory);

    if (!subNavCategory) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: Messages.SUBNAVCATEGORY_NOT_EXIST,
      };
    }

    let updatesubNavCategory = await db
      .collection(collections.subnavcategories)
      .findOneAndUpdate(
        {
          _id: new ObjectId(_id),
        },
        {
          $set: {
            ...updateObj,
            updateAt: new Date(),
          },
        },
        { returnDocument: "after" }
      );
    return {
      status: statusCode.SUCCESS,
      data: updatesubNavCategory,
      message: Messages.SUBNAVCATEGORY_UPDATED,
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

export const deleteSubNavCategoryUtils = async (data: any) => {
  try {
    console.log("delete obj :: ", data);

    const NavCategory = await db
      .collection(collections.subnavcategories)
      .findOne({ _id: new ObjectId(data._id) });
    if (!NavCategory) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: Messages.SUBNAVCATEGORY_NOT_EXIST,
      };
    }
    const { _id } = data;

    await db
      .collection(collections.subnavcategories)
      .findOneAndDelete({ _id: new ObjectId(_id) });

    return {
      status: statusCode.SUCCESS,
      data: {},
      message: Messages.SUBNAVCATEGORY_DELETED,
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
  createSubNavCategoriesUtils,
  getAllSubNavCategoriesUtils,
  getSingleSubNavCategoryUtils,
  updateSubNavCategoryUtils,
  deleteSubNavCategoryUtils,
};
