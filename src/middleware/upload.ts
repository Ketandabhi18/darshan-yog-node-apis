import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import { Messages, generalMessage, statusCode } from "../config/constant";

const upload = async (localFilePath: string) => {
  try {
    console.log("upload :: localFilePath :: ", localFilePath);

    // const cloudinaryResponse = await cloudinary.uploader.upload(localFilePath);
    const cloudinaryResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("upload :: coludinaryResponse :: ", cloudinaryResponse);
    const { secure_url } = cloudinaryResponse;
    if (!secure_url) {
      unlinkSync(localFilePath);
      return {
        isSuccess: false,
        statusCode: 400,
        data: {},
        message:
          "Couldn't upload your image at the moment. Please try again later.",
      };
    }

    // unlinkSync(localFilePath);
    return {
      isSuccess: true,
      statusCode: 200,
      data: cloudinaryResponse,
      message: "Successfully uploaded image.",
    };
  } catch (error) {
    console.log("upload :: error :: ", error);
    return {
      statusCode: 500,
      isSuccess: false,
      data: error,
      message: "Something went wrong.",
    };
  }
};

const removeImageCloudinary = async (public_id: string) => {
  try {
    let remove = await cloudinary.uploader.destroy(public_id);
    console.log("removeImageCloudinary :: remove :: ", remove);

    return {
      statusCode: 200,
      isSuccess: true,
      data: remove,
      message: "Remove Image",
    };
  } catch (error) {
    console.log("removeImageCloudinary :: error :: ", error);
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      isSuccess: false,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};

export { upload, removeImageCloudinary };
