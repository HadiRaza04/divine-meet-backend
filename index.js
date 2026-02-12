import express from 'express';
import { port } from './env.js';
import UserRouter from './routes/UserRoute.js';
import connectDB from './config/db.js';
import { EventRouter } from './routes/EventRoute.js';
import { MosqueRouter } from './routes/MosqueRoute.js';
import { OrganizationRouter } from './routes/OrganizationRoute.js';
import { CustomerRouter } from './routes/CustomerRoute.js';

const app = express();
connectDB();
app.use(express.json());
app.use('/', UserRouter)
app.use('/events', EventRouter);
app.use('/mosque', MosqueRouter);
app.use('/organization', OrganizationRouter);
app.use('/customers', CustomerRouter);

app.listen(port, () => console.log(`Server listen on port: ${port}`))