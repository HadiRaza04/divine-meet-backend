import express from 'express';
import { Signup, Signin, ForgotPassword, ResetPassword } from '../controllers/UserController.js';

const UserRouter = express.Router();


UserRouter.post('/signup', Signup)
UserRouter.post('/signin', Signin)
UserRouter.post('/reset-password', ForgotPassword)
UserRouter.post('/reset-password/:token', ResetPassword)

export default UserRouter;