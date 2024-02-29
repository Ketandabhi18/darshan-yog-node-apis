import { ObjectId } from "mongodb";
import { collections } from "../config/collections";
import { Messages, generalMessage, statusCode } from "../config/constant";
import { db } from "../config/db.config";

export const createNavCategoriesUtils = async (data: any) => {
  try {
    const { name } = data;

    const findNavCategory = await db
      .collection(collections.navcategories)
      .findOne({ name });

    if (findNavCategory) {
      return {
        status: statusCode.BAD_REQUEST,
        data: findNavCategory,
        message: Messages.NAVCATEGORY_ALREADY_EXISTS,
      };
    }

    let createArea: any = await db
      .collection(collections.navcategories)
      .insertOne({
        name,
        isDeleted: 0,
        createAt: new Date(),
      });

    return {
      status: statusCode.CREATED,
      data: createArea,
      message: Messages.NAVCATEGORY_ADDED,
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

export const getSingleNavCategoryUtils = async (id: any) => {
  try {
    const Id: string = `${id}`;

    const NavCategory = await db
      .collection(collections.navcategories)
      .findOne({ _id: new ObjectId(Id) });
    if (!NavCategory) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: Messages.NAVCATEGORY_NOT_EXIST,
      };
    }

    return {
      status: statusCode.SUCCESS,
      data: NavCategory,
      message: Messages.NAVCATEGORY_DETAILS,
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

export const getAllNavCategoryUtils = async () => {
  try {
    const NavCategories = await db
      .collection(collections.navcategories)
      .aggregate([])
      .toArray();
    if (NavCategories.length == 0) {
      return {
        status: statusCode.BAD_REQUEST,
        data: [],
        message: Messages.NAVCATEGORY_NOT_EXIST,
      };
    }

    return {
      status: statusCode.SUCCESS,
      data: NavCategories,
      message: Messages.NAVCATEGORY_DETAILS,
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

export const updateNavCategoryUtils = async (data: any) => {
  try {
    console.log("updated obj :: ", data);

    const NavCategory = await db
      .collection(collections.navcategories)
      .findOne({ _id: new ObjectId(data._id) });
    if (!NavCategory) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: Messages.NAVCATEGORY_NOT_EXIST,
      };
    }
    const { _id, ...updateObj } = data;

    let updateNavCategory = await db
      .collection(collections.navcategories)
      .findOneAndUpdate(
        { _id: new ObjectId(_id) },
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
      data: updateNavCategory,
      message: Messages.NAVCATEGORY_UPDATED,
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

export const deleteNavCategoryUtils = async (data: any) => {
  try {
    console.log("delete obj :: ", data);

    const NavCategory = await db
      .collection(collections.navcategories)
      .findOne({ _id: new ObjectId(data._id) });
    if (!NavCategory) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: Messages.NAVCATEGORY_NOT_EXIST,
      };
    }
    const { _id } = data;

    await db
      .collection(collections.navcategories)
      .findOneAndDelete({ _id: new ObjectId(_id) });

    return {
      status: statusCode.SUCCESS,
      data: {},
      message: Messages.NAVCATEGORY_DELETED,
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
  createNavCategoriesUtils,
  getSingleNavCategoryUtils,
  getAllNavCategoryUtils,
  updateNavCategoryUtils,
  deleteNavCategoryUtils,
};
