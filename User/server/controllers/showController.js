import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

//API to get movies currently playing in theatres in India

export const getNowPlayingMovies = async (req, res) => {
  try {
    const totalPagesToFetch = 3; // You can increase this if you want more results
    let allMovies = [];

    for (let page = 1; page <= totalPagesToFetch; page++) {
      const { data } = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        params: {
          region: "IN",
          page: page,
        },
      });

      allMovies = allMovies.concat(data.results);
    }

    // Sort all movies by popularity (descending)
    const sortedMovies = allMovies.sort((a, b) => b.popularity - a.popularity);

    // Remove duplicates based on movie id
    const uniqueMovies = Array.from(new Map(sortedMovies.map(m => [m.id, m])).values());

    res.json({ success: true, movies: uniqueMovies });
  } catch (error) {
    console.error(
      "Error fetching now playing Indian movies:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: "Failed to fetch now playing Indian movies",
      error: error.response?.data || error.message,
    });
  }
};



// API to add a new show to the database
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice} = req.body;

    let movie = await Movie.findById(movieId);

    if (!movie) {
      // Fetch movie details from TMDB API
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`},
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`},
          })
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        genres: movieApiData.genres,
        runtime: movieApiData.runtime,
        vote_average: movieApiData.vote_average,
      }

      // Save the new movie to the database
      movie = await Movie.create(movieDetails);
    }

    // Add shows to the movie
    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeates: {}
        })
      })
    });

    if(showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    res.json({ success: true, message: "Shows added successfully" });


  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
    
  }
}

//API to get all shows from the database
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie').sort({showDateTime: 1});

    // filter unique shows
    const uniqueShowsMap = new Set(shows.map(show => show.movie));
    res.json({success: true, shows: Array.from(uniqueShowsMap)});

  } catch (error) {
    console.error(error);
    res.json({success: false, message: error.message});
  }
}



// API to get a single show from the database
export const getShow = async (req, res) => {
  try {
    const {movieId} = req.params;

    //get all upcoming shows for the movie
    const shows = await Show.find({movie: movieId, showDateTime: {$gte: new Date()}}).populate('movie').sort({showDateTime: 1});

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split('T')[0];
      if(!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id, price: show.showPrice });

    })

    // Add showPrice to movie object for consistency
    movie.showPrice = shows.length > 0 ? shows[0].showPrice : 100;

    res.json({success: true, movie, dateTime});


  } catch (error) {
    console.error(error);
    res.json({success: false, message: error.message});
  }
}

// API to get a single show by ID
export const getShowById = async (req, res) => {
  try {
    const { id } = req.params;

    const show = await Show.findById(id).populate('movie');

    if (!show) {
      return res.json({ success: false, message: 'Show not found' });
    }

    res.json({ success: true, show });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
