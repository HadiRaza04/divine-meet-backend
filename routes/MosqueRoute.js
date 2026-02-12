import express from "express";
import { AddMosque, AllMosque } from "../controllers/MosqueController.js";

export const MosqueRouter = express.Router();

MosqueRouter.post('/', AddMosque);
MosqueRouter.get('/', AllMosque);