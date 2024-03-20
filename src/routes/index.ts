import { Router } from "express";
import AuthRoutes from "./AuthRoutes";
import NavCategoriesRoutes from "./NavCategoriesRoutes";
import SubNavCategoriesRoutes from "./SubNavCategoriesRoutes";
import ProgramScheduleRoutes from "./ProgramScheduleRoutes";
import EventRoutes from "./EventsRoutes";
const router = Router();

router.use("", AuthRoutes);
router.use("/nav-categories", NavCategoriesRoutes);
router.use("/sub-nav-categories", SubNavCategoriesRoutes);
router.use("/program-schedule", ProgramScheduleRoutes);
router.use("/events", EventRoutes);

export default router;
