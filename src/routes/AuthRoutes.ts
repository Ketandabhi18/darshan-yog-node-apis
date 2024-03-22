import { Router } from "express";
import {
  getOtpController,
  login,
  registerController,
  userUpdateController,
} from "../controller/AuthController";
const AuthRoutes = Router();

AuthRoutes.post("/login", login);
AuthRoutes.post("/register", registerController);
AuthRoutes.post("/get-otp", getOtpController);
AuthRoutes.post("/update-user", userUpdateController);
export default AuthRoutes;
