import * as dotenv from "dotenv";
dotenv.config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const verifySid = process.env.VERIFYSID;

const client = require("twilio")(accountSid, authToken);

export const sendOtp = async (phoneNumber: any) => {
  try {
    const res = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: `+91${phoneNumber}`, channel: "sms" })
      .then((verification) => console.log(verification.status));
    return res;
  } catch (error) {
    console.log("error :: ", error);
  }
};

export const verifyOtp = async (phoneNumber: any, otpCode: any) => {
  try {
    client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: `+91${phoneNumber}`, code: otpCode })
      .then((verification_check) => console.log(verification_check.status));
  } catch (error) {
    console.log("error :: ", error);
  }
};
// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+91", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+91", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });

module.exports = {
  sendOtp,
  verifyOtp,
};
