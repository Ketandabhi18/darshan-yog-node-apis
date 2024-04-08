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
    console.log("registerForEvent :: req.body :: arrival and departure", {
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
    });
    if (typeof data.groupDetails === "string") {
      const convertedGroupDetails = JSON.parse(data.groupDetails);
      data.groupDetails = convertedGroupDetails;
    }

    const inputDateTimeArrival = moment(data.arrivalDate).format(
      "YYYY-MM-DD HH:mm"
    );

    const inputDateTimeDeparture = moment(data.departureDate).format(
      "YYYY-MM-DD HH:mm"
    );
    console.log(
      "registerForEvent :: convertsion progress :: arrival and departure",
      {
        arrivalDate: inputDateTimeArrival,
        departureDate: inputDateTimeDeparture,
      }
    );
    // const outputDateTimeArrival =
    //   inputDateTimeArrival.format("YYYY-MM-DD HH:mm");
    // const outputDateTimeDeparture =
    //   inputDateTimeDeparture.format("YYYY-MM-DD HH:mm");

    console.log("registerForEvent :: body ::", {
      ...data,
      arrivalDate: `${inputDateTimeArrival} IST`,
      departureDate: `${inputDateTimeDeparture} IST`,
    });
    const response = await axios.post(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/register",
      {
        ...data,
        arrivalDate: `${inputDateTimeArrival} IST`,
        departureDate: `${inputDateTimeDeparture} IST`,
      },
      {
        headers: headers,
      }
    );

    console.log("registerEvent :: response.data.data :: ", response.data);
    if (typeof response.data == "object") {
      return {
        status: statusCode.SUCCESS,
        data: response.data.data,
        messsage: Messages.ACTIVE_EVENTS,
      };
    } else {
      return {
        status: statusCode.BAD_REQUEST,
        data: null,
        messsage: generalMessage.SOMETHING_WENT_WRONG,
      };
    }
  } catch (error) {
    console.log("error :: ", error);
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      data: error,
      message: generalMessage.SOMETHING_WENT_WRONG,
    };
  }
};
export const getregisteredEventUtils = async (headers: any) => {
  try {
    const response = await axios.get(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/register?eventCode=YOGDHAM_FEB24",
      {
        headers: headers,
      }
    );
    console.log("RegisteredEvent :: response.data :: ", response.data);
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

export const postregisteredEventUtils = async (headers: any, body: any) => {
  try {
    console.log("post registeredEvets :: body :: ", body);
    let url: any = "";
    if (body.eventCode && body.mobileNumber) {
      url = `http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/register?eventCode=${body.eventCode}&mobileNumber=%2B91${body.mobileNumber}`;
    } else {
      url = `http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/register?eventCode=YOGDHAM_FEB24`;
    }
    console.log("url :: ", url);
    const response = await axios.get(url, {
      headers: headers,
    });
    console.log("RegisteredEvent :: response.data :: ", response.data);
    if (response.data.data === null) {
      return {
        status: statusCode.BAD_REQUEST,
        data: null,
        message: response.data.error.errorMessage,
      };
    }
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
  getregisteredEventUtils,
  postregisteredEventUtils,
};
