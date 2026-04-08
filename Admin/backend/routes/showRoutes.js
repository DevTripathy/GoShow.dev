import express from 'express'
import { addShow, getNowPlayingMovies, getShow, getShows, getBookings } from '../controllers/showController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const showRouter = express.Router();

showRouter.get('/now-playing', getNowPlayingMovies);
showRouter.post('/add', adminAuth, addShow);
showRouter.get("/all", adminAuth, getShows)
showRouter.get("/:movieId", adminAuth, getShow)
showRouter.get("/bookings/all", adminAuth, getBookings)


export default showRouter;
