import express from 'express';
import { port } from './env.js';
import UserRouter from './routes/UserRoute.js';
import connectDB from './config/db.js';
import { EventRouter } from './routes/EventRoute.js';
import { MosqueRouter } from './routes/MosqueRoute.js';
import { OrganizationRouter } from './routes/OrganizationRoute.js';
import { CustomerRouter } from './routes/CustomerRoute.js';
import cors from 'cors';
import {AmeerRoute} from './routes/AmeerRoute.js';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
connectDB();
app.use(cors());
app.use('/', UserRouter)
app.use('/ameer', AmeerRoute)
app.use('/events', EventRouter);
app.use('/mosque', MosqueRouter);
app.use('/organization', OrganizationRouter);
app.use('/customers', CustomerRouter);

app.listen(port, () => console.log(`Server listen on port: ${port}`))