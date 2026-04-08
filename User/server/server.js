import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose, { connect } from 'mongoose';
import 'dotenv/config';
import connectDB from './configs/db.js';
// import { clerkMiddleware } from '@clerk/express'
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";
import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';


//payment started
import Razorpay from 'razorpay';


export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  
});


instance.orders.all().then(console.log).catch(console.error);

  


const app = express();
const port = process.env.PORT || 5000;
connectDB();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];

app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/v1', paymentRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

