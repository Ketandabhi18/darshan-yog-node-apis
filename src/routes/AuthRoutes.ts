import { Router } from "express";
import {
  getOtpController,
  login,
  registerController,
} from "../controller/AuthController";
const AuthRoutes = Router();

AuthRoutes.post("/login", login);
AuthRoutes.post("/register", registerController);
AuthRoutes.post("/get-otp", getOtpController);
export default AuthRoutes;
