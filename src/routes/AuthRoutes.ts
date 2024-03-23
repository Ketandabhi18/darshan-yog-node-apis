import { Router } from "express";
import {
  getOtpController,
  login,
  registerController,
  userPasswordUpdateController,
  userUpdateController,
} from "../controller/AuthController";
const AuthRoutes = Router();

AuthRoutes.post("/login", login);
AuthRoutes.post("/register", registerController);
AuthRoutes.post("/get-otp", getOtpController);
AuthRoutes.post("/update-user", userUpdateController);
AuthRoutes.post("/update-password", userPasswordUpdateController);
export default AuthRoutes;
