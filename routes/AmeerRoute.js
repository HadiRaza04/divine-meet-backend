import express from 'express';
import { getAllAmeers, addAmeer } from '../controllers/AmeerController.js';
import Protect from '../middlewares/Protect.js';
import upload from '../middlewares/Upload.js';

export const AmeerRoute = express.Router();

AmeerRoute.get('/', Protect, getAllAmeers);
AmeerRoute.post('/', upload.none(), addAmeer);