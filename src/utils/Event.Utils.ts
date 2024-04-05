import axios from "axios";
import { Messages, generalMessage, statusCode } from "../config/constant";
const moment = require("moment-timezone");

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
    const inputDateTimeArrival = moment.tz(
      data.arrivalDate,
      "MM-DD-YYYY HH:mm",
      "Asia/Kolkata"
    );

    const inputDateTimeDeparture = moment.tz(
      data.departureDate,
      "MM-DD-YYYY HH:mm",
      "Asia/Kolkata"
    );
    const outputDateTimeArrival =
      inputDateTimeArrival.format("YYYY-MM-DD HH:mm");
    const outputDateTimeDeparture =
      inputDateTimeDeparture.format("YYYY-MM-DD HH:mm");

    console.log("registerForEvent :: body ::", {
      ...data,
      arrivalDate: `${outputDateTimeArrival} IST`,
      departureDate: `${outputDateTimeDeparture} IST`,
    });
    const response = await axios.post(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/register",
      {
        ...data,
        arrivalDate: `${outputDateTimeArrival} IST`,
        departureDate: `${outputDateTimeDeparture} IST`,
      },
      {
        headers: headers,
      }
    );

    console.log("registerEvent :: response.data.data :: ", response.data);
    return {
      status: statusCode.SUCCESS,
      data: response.data.data,
      messsage: Messages.ACTIVE_EVENTS,
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
export const registeredEventUtils = async (headers: any) => {
  try {
    const response = await axios.get(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/register?eventCode=YOGDHAM_FEB24",
      {
        headers: headers,
      }
    );

    const newData = response.data.data.map((E: any) => {
      const arrivalDate = moment
        .utc(E.arrivalDate)
        .utcOffset("+02:00")
        .format("YYYY-MM-DD HH:mm");
      const departureDate = moment
        .utc(E.departureDate)
        .utcOffset("+02:00")
        .format("YYYY-MM-DD HH:mm");
      E.arrivalDate = arrivalDate;
      E.departureDate = departureDate;
      return E;
    });

    return {
      status: statusCode.SUCCESS,
      data: newData,
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
