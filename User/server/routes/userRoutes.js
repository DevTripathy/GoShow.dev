import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserBookings, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { getUserDetails } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/getuser', userAuth, getUserDetails);

userRouter.get('/bookings', userAuth, getUserBookings);

userRouter.get('/profile', userAuth, getUserProfile);
userRouter.put('/profile', userAuth, updateUserProfile);

export default userRouter;
