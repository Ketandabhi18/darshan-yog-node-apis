import { Router } from "express";
import {
  getActiveEventsController,
  registerEventController,
} from "../controller/EventController";

const EventRoutes = Router();

// get api for active events
EventRoutes.get("/active", getActiveEventsController);
EventRoutes.post("/register", registerEventController);

export default EventRoutes;
