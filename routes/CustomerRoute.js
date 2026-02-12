import express from "express";
import { AddOrg, AllOrg } from "../controllers/OrganizationController.js";
import { AddCustomer, GetAllCustomers } from "../controllers/CustomerController.js";

export const CustomerRouter = express.Router();

CustomerRouter.post('/', AddCustomer);
CustomerRouter.get('/', GetAllCustomers);