import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import bcrypt from 'bcryptjs';
import adminAuthRouter from './routes/adminRoutes.js';
import showRouter from './routes/showRoutes.js';

const app = express();
const port = process.env.PORT || 5000;
connectDB();

const allowedOrigins = 'http://localhost:5174';

app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/admin', adminAuthRouter);
app.use('/api/show', showRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
