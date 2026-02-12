import express from "express";
import { AddEvent, AllEvents } from "../controllers/EventController.js";

export const EventRouter = express.Router();

EventRouter.post('/', AddEvent);
EventRouter.get('/', AllEvents);