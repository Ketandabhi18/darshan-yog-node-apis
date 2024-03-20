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

module.exports = {
  getActiveEventsUtils,
};
