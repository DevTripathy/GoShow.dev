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
    const { movieId, movieData, showsInput, showPrice} = req.body;

    let movie = await Movie.findById(movieId);

    if (!movie) {
      // Use provided movieData instead of fetching from TMDB API
      if (movieData) {
        // Fetch additional movie details from TMDB if runtime, genres, or casts are missing
        let runtime = movieData.runtime;
        let genres = movieData.genres || [];
        let casts = movieData.casts || [];
        if (!runtime || genres.length === 0 || casts.length === 0) {
          try {
            const promises = [];
            if (!runtime || genres.length === 0) {
              promises.push(axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`},
              }));
            }
            if (casts.length === 0) {
              promises.push(axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`},
              }));
            }
            const responses = await Promise.all(promises);
            let index = 0;
            if (!runtime || genres.length === 0) {
              const movieApiData = responses[index++].data;
              if (!runtime) runtime = movieApiData.runtime;
              if (genres.length === 0) genres = movieApiData.genres;
            }
            if (casts.length === 0) {
              const movieCreditsData = responses[index].data;
              casts = movieCreditsData.cast.slice(0, 10);
            }
          } catch (tmdbError) {
            console.error('TMDB API error fetching details:', tmdbError.message);
            if (!runtime) runtime = 120; // Default runtime if API fails
            if (genres.length === 0) genres = [];
            if (casts.length === 0) casts = [];
          }
        }

        const movieDetails = {
          _id: movieId,
          title: movieData.title,
          overview: movieData.overview,
          poster_path: movieData.poster_path,
          backdrop_path: movieData.backdrop_path,
          release_date: movieData.release_date,
          original_language: movieData.original_language,
          tagline: movieData.tagline || "",
          genres: genres,
          casts: casts,
          runtime: runtime,
          vote_average: movieData.vote_average,
        }

        // Save the new movie to the database
        movie = await Movie.create(movieDetails);
      } else {
        // Fallback to TMDB API if movieData not provided
        try {
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
        } catch (tmdbError) {
          console.error('TMDB API error:', tmdbError.message);
          return res.json({ success: false, message: 'Failed to fetch movie details from TMDB' });
        }
      }
    }

    // Add shows to the movie
    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      const times = Array.isArray(show.time) ? show.time : [show.time];
      times.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {}
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

    res.json({success: true, shows});

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
      dateTime[date].push({ time: show.showDateTime, showId: show._id });

    })
    res.json({success: true, movie, dateTime});


  } catch (error) {
    console.error(error);
    res.json({success: false, message: error.message});
  }
}

// API to get all bookings from the database
export const getBookings = async (req, res) => {
  try {
    const shows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie').sort({showDateTime: 1});

    const bookings = [];

    shows.forEach(show => {
      Object.entries(show.occupiedSeats).forEach(([seat, userName]) => {
        bookings.push({
          user: { name: userName },
          show: {
            _id: show._id,
            movie: show.movie,
            showDateTime: show.showDateTime,
            showPrice: show.showPrice,
          },
          amount: show.showPrice,
          bookedSeats: [seat],
          isPaid: true,
        });
      });
    });

    res.json({success: true, bookings});

  } catch (error) {
    console.error(error);
    res.json({success: false, message: error.message});
  }
}
