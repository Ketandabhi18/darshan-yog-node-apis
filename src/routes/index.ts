import { Router } from "express";
import AuthRoutes from "./AuthRoutes";
import NavCategoriesRoutes from "./NavCategoriesRoutes";
import SubNavCategoriesRoutes from "./SubNavCategoriesRoutes";
const router = Router();

router.use("", AuthRoutes);
router.use("/nav-categories", NavCategoriesRoutes);
router.use("/sub-nav-categories", SubNavCategoriesRoutes);

export default router;
