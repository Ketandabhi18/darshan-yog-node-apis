import { Router } from "express";
import {
  getActiveEventsController,
  registerEventController,
  getregisteredEventController,
  postregisteredEventController,
} from "../controller/EventController";

const EventRoutes = Router();

// get api for active events
EventRoutes.get("/active", getActiveEventsController);
EventRoutes.post("/register", registerEventController);
EventRoutes.get("/event-registrations", getregisteredEventController);
EventRoutes.post("/registration-check", postregisteredEventController);

export default EventRoutes;
