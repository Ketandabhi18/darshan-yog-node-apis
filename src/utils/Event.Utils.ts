import axios from "axios";
import { Messages, generalMessage, statusCode } from "../config/constant";

export const getActiveEventsUtils = async () => {
  try {
    const response = await axios.get(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/active"
    );
    return {
      status: statusCode.SUCCESS,
      data: response.data.data,
      messsage: Messages.ACTIVE_EVENTS,
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

export const registerForEventUtils = async (data: any, headers: any) => {
  try {
    const response = await axios.post(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/register",
      data,
      {
        headers: headers,
      }
    );
    console.log("response.data.data :: ", response.data.data);
    return {
      status: statusCode.SUCCESS,
      data: response.data.data,
      messsage: Messages.ACTIVE_EVENTS,
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
export const registeredEventUtils = async (headers: any) => {
  try {
    const response = await axios.get(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/register?eventCode=YOGDHAM_FEB24",
      {
        headers: headers,
      }
    );
    console.log("response.data.data :: ", response.data.data);
    return {
      status: statusCode.SUCCESS,
      data: response.data.data,
      messsage: Messages.ACTIVE_EVENTS,
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
  getActiveEventsUtils,
  registerForEventUtils,
  registeredEventUtils,
};
