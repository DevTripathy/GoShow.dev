import express from 'express'
import { addShow, getNowPlayingMovies, getShow, getShows, getShowById } from '../controllers/showController.js';
import userAuth from '../middleware/userAuth.js';

const showRouter = express.Router();

showRouter.get('/now-playing', userAuth, getNowPlayingMovies);
showRouter.post('/add', userAuth, addShow);
showRouter.get("/all", getShows)
showRouter.get("/:movieId", getShow)
showRouter.get("/show/:id", getShowById)


export default showRouter;
