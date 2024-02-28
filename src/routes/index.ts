import { Router } from "express";
import AuthRoutes from "./AuthRoutes";
const router = Router();

router.use("", AuthRoutes);

export default router;
