import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes";
import { connection } from "./config/db.config";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT;
connection();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/test-centralized-api", async (req, res) => {
  try {
    const requestData = {
      mobileNumber: "+919998982350",
      firstName: "Ketan",
      gender: "Male",
      dateOfBirth: "27-02-2024",
      eventCode: "KOLKATA_FEB24",
      arrivalDate: "2024-04-07 04:00 IST",
      departureDate: "2024-04-11 13:00 IST",
      groupDetails: [
        {
          name: "Prince",
          relation: "Friend",
          gender: "Male",
          age: 27,
        },
      ],
      accomodationType: "Self",
      notes: null,
    };

    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQVMgQVNGIiwic3ViIjoiSldUIFRva2VuIiwidXNlcm5hbWUiOiIrOTE5OTk4OTgyMzUwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE3MTA3NDI1NTIsImV4cCI6MTcxMDc0NjE1Mn0.qDlU87P7-jhgMWUcWS_JTY3Xs5YkXZ-tjeAcWCZDqv0",
    };
    const response = await axios.post(
      "http://digitalaryasamaj.ap-south-1.elasticbeanstalk.com/event/register",
      requestData,
      {
        headers: requestHeaders,
      }
    );

    console.log("Response:", response.data);
    console.log("req.body :: ", req.body);

    res.send("fadfa");
  } catch (error) {}
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
