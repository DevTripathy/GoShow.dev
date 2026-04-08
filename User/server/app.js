import express from 'express';
import payment from './routes/paymentRoutes.js';

const app = express();
app.use("/api/v1",payment);
app.use(express.json());

export default app;