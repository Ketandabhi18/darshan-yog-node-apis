import { Router } from "express";
import auth from "../middleware/Auth";
import { MulterUpload } from "../middleware/Multer";
import {
  createProgramController,
  deleteProgramController,
  getAllProgramController,
  getSingleProgramController,
  updateScheduledProgramController,
} from "../controller/ProgramScheduleController";

const ProgramScheduleRoutes = Router();

ProgramScheduleRoutes.post(
  "/create",
  auth,
  MulterUpload("program-schedule").single("image"),
  createProgramController
);

ProgramScheduleRoutes.post("/delete", auth, deleteProgramController);
ProgramScheduleRoutes.get("/get-all", auth, getAllProgramController);
ProgramScheduleRoutes.get("/get-single/:id", auth, getSingleProgramController);
ProgramScheduleRoutes.post(
  "/update",
  auth,
  MulterUpload("program-schedule").single("image"),
  updateScheduledProgramController
);

export default ProgramScheduleRoutes;
