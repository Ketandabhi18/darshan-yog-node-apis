import { unlinkSync } from "fs";
import { collections } from "./../config/collections";
import { Messages, generalMessage, statusCode } from "../config/constant";
import { db } from "../config/db.config";
import { removeImageCloudinary, upload } from "../middleware/upload";
import { ObjectId } from "mongodb";

export const createProgramUtils = async (data: any, file?: any) => {
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
      message: Messages.PROGRAM_SCHEDULED,
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

export const getAllProgramUtils = async () => {
  try {
    const programs = await db
      .collection(collections.programschedule)
      .aggregate([])
      .toArray();
    console.log(programs, "-----programs");

    if (programs.length === 0) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: Messages.PROGRAM_SCHEDULE_NOT_FOUND,
      };
    }

    return {
      status: statusCode.SUCCESS,
      data: programs,
      message: Messages.SCHEDULED_PROGRAMS,
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

export const getSingleProgramUtils = async (id: any) => {
  try {
    const Id: string = `${id}`;

    const SingleProgram = await db
      .collection(collections.programschedule)
      .findOne({ _id: new ObjectId(Id) });
    if (!SingleProgram) {
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: Messages.PROGRAM_SCHEDULE_NOT_FOUND,
      };
    }

    return {
      status: statusCode.SUCCESS,
      data: SingleProgram,
      message: Messages.SCHEDULED_PROGRAMS,
    };
  } catch (error) {
    console.log("error :: ", error);
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};

export const updateScheduledProgramUtils = async (data, file?) => {
  try {
    console.log("update schdule :: req.body :: req.file", data, file);
    const { id } = data;
    const localFilePath = file?.path;

    console.log("localFilePath :: ", localFilePath);

    const program = await db
      .collection(collections.programschedule)
      .findOne({ _id: new ObjectId(id) });

    console.log("program :: ", program);
    if (!program) {
      unlinkSync(localFilePath);
      return {
        status: statusCode.BAD_REQUEST,
        data: {},
        message: Messages.PROGRAM_SCHEDULE_NOT_FOUND,
      };
    }

    let secure_url: string = program.image,
      public_id: string = program.public_id;
    if (localFilePath) {
      if (public_id !== "") {
        let result = await removeImageCloudinary(program.public_id);
        if (!result.isSuccess) {
          return {
            status: result.statusCode,
            data: result.data,
            message: result.message,
          };
        }
      }

      const uploadRes: any = await upload(localFilePath);

      console.log("uploadRes :: isSuccess", uploadRes.isSuccess);
      unlinkSync(localFilePath);

      if (!uploadRes.isSuccess) {
        return {
          status: uploadRes.statusCode,
          data: uploadRes.data,
          message: uploadRes.message,
        };
      }
      secure_url = uploadRes.data.secure_url;
      public_id = uploadRes.data.public_id;
    }

    const updateProgram = await db
      .collection(collections.programschedule)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            secure_url: secure_url,
            public_id: public_id,
            ...data,
            updateAt: new Date(),
          },
        },
        { returnDocument: "after" }
      );
    return {
      status: statusCode.SUCCESS,
      data: updateProgram,
      message: Messages.PROGRAM_SCHEDULE_UPDATED,
    };
  } catch (error) {
    console.log("error :: utils ", error);
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
  getAllProgramUtils,
  getSingleProgramUtils,
  updateScheduledProgramUtils,
};
