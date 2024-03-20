import { Router } from "express";
import { getActiveEventsController } from "../controller/EventController";

const EventRoutes = Router();

// get api for active events
EventRoutes.get("/active", getActiveEventsController);


export default EventRoutes;
