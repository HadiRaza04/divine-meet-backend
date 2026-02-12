import express from "express";
import { AddOrg, AllOrg } from "../controllers/OrganizationController.js";

export const OrganizationRouter = express.Router();

OrganizationRouter.post('/', AddOrg);
OrganizationRouter.get('/', AllOrg);