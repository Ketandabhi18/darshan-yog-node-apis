import { Router } from "express";
import { login } from "../controller/AuthController";
const AuthRoutes = Router();

AuthRoutes.post("/login", login);

export default AuthRoutes;
