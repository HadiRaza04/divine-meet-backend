import express from 'express';
import { Signup, Signin, ForgotPassword, ResetPassword } from '../controllers/UserController.js';
import Protect from '../middlewares/Protect.js';
import authorize from '../middlewares/Role.js';

const UserRouter = express.Router();


UserRouter.post('/signup', Protect, Signup)
UserRouter.post('/signin', Signin)
UserRouter.post('/reset-password', Protect, ForgotPassword)
UserRouter.post('/reset-password/:token', Protect, ResetPassword)

export default UserRouter;