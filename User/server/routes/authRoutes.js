import express from 'express';
import 'dotenv/config';
import { userSignUp, userLogin, userLogout, sendVerificationEmail, verifyEmail, isAuthenticated, resetPassword, sendPasswordResetEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/user/login', userLogin);
authRouter.post('/user/signup', userSignUp);
authRouter.post('/user/logout', userLogout);
authRouter.post('/user/send-verification-email', userAuth, sendVerificationEmail);
authRouter.post('/user/verify-email', userAuth, verifyEmail);
authRouter.get('/getauthstatus', userAuth, isAuthenticated);
authRouter.post('/user/send-password-reset-email', sendPasswordResetEmail);
authRouter.post('/user/reset-password', resetPassword);

export default authRouter;