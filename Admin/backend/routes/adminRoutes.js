
import express from 'express';
import 'dotenv/config';
import { adminLogin, adminLogout, sendAdminVerificationEmail, verifyAdminEmail, sendAdminPasswordResetEmail, resetAdminPassword, getAdminDetails, isAdminAuthenticated, getDashboardData, getAllBookings, getAllShows, deleteShow } from '../controllers/adminController.js';
import adminAuth from '../middleware/adminAuth.js';

const adminAuthRouter = express.Router();

adminAuthRouter.post('/login', adminLogin);
adminAuthRouter.post('/logout', adminAuth, adminLogout);
adminAuthRouter.post('/send-verification-email', adminAuth, sendAdminVerificationEmail);
adminAuthRouter.post('/verify-email', adminAuth, verifyAdminEmail);
adminAuthRouter.post('/send-password-reset-email', sendAdminPasswordResetEmail);
adminAuthRouter.post('/reset-password', resetAdminPassword);
adminAuthRouter.get('/data', adminAuth, getAdminDetails);
adminAuthRouter.post('/isAuth', adminAuth, isAdminAuthenticated);

adminAuthRouter.get('/all-shows', adminAuth, getAllShows);
adminAuthRouter.post('/delete-show/:showId', adminAuth, deleteShow);
adminAuthRouter.get('/dashboard', getDashboardData);
adminAuthRouter.get('/all-bookings',adminAuth, getAllBookings);

export default adminAuthRouter;
