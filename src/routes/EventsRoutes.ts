import { Router } from "express";
import {
  getActiveEventsController,
  registerEventController,
  registeredEventController,
} from "../controller/EventController";

const EventRoutes = Router();

// get api for active events
EventRoutes.get("/active", getActiveEventsController);
EventRoutes.post("/register", registerEventController);
EventRoutes.get("/event-registrations", registeredEventController);

export default EventRoutes;
