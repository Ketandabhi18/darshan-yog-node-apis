import { Router } from "express";
import auth from "../middleware/Auth";
import { MulterUpload } from "../middleware/Multer";
import {
  createProgramController,
  deleteProgramController,
} from "../controller/ProgramScheduleController";

const ProgramScheduleRoutes = Router();

ProgramScheduleRoutes.post(
  "/create",
  auth,
  MulterUpload("program-schedule").single("image"),
  createProgramController
);

ProgramScheduleRoutes.post("/delete", auth, deleteProgramController);

export default ProgramScheduleRoutes;
