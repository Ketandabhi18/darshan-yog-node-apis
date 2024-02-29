import { Router } from "express";
import AuthRoutes from "./AuthRoutes";
import NavCategoriesRoutes from "./NavCategoriesRoutes";
const router = Router();

router.use("", AuthRoutes);
router.use("/nav-categories", NavCategoriesRoutes);

export default router;
