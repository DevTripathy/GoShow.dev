import express from 'express';
import { createBooking, getOccupiedSeats, holdSeats } from '../controllers/bookingController.js';
import userAuth from '../middleware/userAuth.js';


const bookingRouter = express.Router();

// Route to create a new booking
bookingRouter.post('/create', userAuth, createBooking);

bookingRouter.post('/hold', userAuth, holdSeats);

// Route to get occupied seats for a show
bookingRouter.get('/seats/:showId', getOccupiedSeats);

export default bookingRouter;
