import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes";
import { connection } from "./config/db.config";

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;
connection();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
