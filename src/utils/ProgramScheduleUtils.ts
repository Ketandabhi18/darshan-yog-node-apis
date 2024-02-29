import { unlinkSync } from "fs";
import { collections } from "./../config/collections";
import { Messages, generalMessage, statusCode } from "../config/constant";
import { db } from "../config/db.config";
import { removeImageCloudinary, upload } from "../middleware/upload";
import { ObjectId } from "mongodb";

export const createProgramUtils = async (data: any, file: any) => {
  try {
    console.log("data :: file ::", data, file);

    let findProgram = await db.collection(collections.programschedule).findOne({
      name: data.name,
    });
    console.log("createProgram :: findProgram ::", findProgram);

    if (findProgram) {
      if (file) unlinkSync(file.path);
      return {
        status: statusCode.BAD_REQUEST,
        data: findProgram,
        message: Messages.PROGRAM_ALREADY_SCHEDULED,
      };
    }

    let image: string = "",
      public_id: string = "";

    if (file) {
      const localFilePath = file.path || "";
      console.log("createProgram :: localFilePath ::  ", localFilePath);
      const { isSuccess, statusCode, data, message } = await upload(
        localFilePath
      );

      console.log("createProgram :: isSuccess :: ", isSuccess);

      unlinkSync(localFilePath);

      if (!isSuccess) {
        return {
          status: statusCode,
          data: data,
          message: message,
        };
      }
      image = data.secure_url;
      public_id = data.public_id;
    }

    const programSchedule = await db
      .collection(collections.programschedule)
      .insertOne({ ...data, image, public_id, createdAt: new Date() });

    console.log("programSchedule :: program :: ", programSchedule);

    return {
      status: statusCode.CREATED,
      data: programSchedule,
      messsage: Messages.PROGRAM_SCHEDULED,
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

export const deleteProgramUtils = async (_id: any) => {
  try {
    const deleteProgram = await db
      .collection(collections.programschedule)
      .findOne({ _id: new ObjectId(_id) });
    if (!deleteProgram) {
      return {
        status: statusCode.BAD_REQUEST,
        data: deleteProgram,
        message: Messages.PROGRAM_SCHEDULE_NOT_FOUND,
      };
    }

    await removeImageCloudinary(deleteProgram.public_id);
    await db
      .collection(collections.programschedule)
      .findOneAndDelete({ _id: new ObjectId(_id) });

    return {
      status: statusCode.SUCCESS,
      data: {},
      message: Messages.PROGRAM_SCHEDULE_DELETED,
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
  createProgramUtils,
  deleteProgramUtils,
};
