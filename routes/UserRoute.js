import express from 'express';
import { Signup, Signin, ForgotPassword, ResetPassword, getAllUsers, createUser, editUser, editPassword } from '../controllers/UserController.js';
import Protect from '../middlewares/Protect.js';
import authorize from '../middlewares/Role.js';
// import upload from '../middlewares/Upload.js';

const UserRouter = express.Router();


UserRouter.post('/signup', Signup)
UserRouter.post('/create-user', Protect, authorize('admin'), createUser)
UserRouter.post('/signin', Signin)
UserRouter.put('/edit-user/:id', Protect, authorize('admin'), editUser);
UserRouter.put('/edit-password/:id', Protect, editPassword);
UserRouter.get('/all-users', Protect, authorize('admin'), getAllUsers)
UserRouter.post('/reset-password', Protect, ForgotPassword)
UserRouter.post('/reset-password/:token', Protect, ResetPassword)

export default UserRouter;