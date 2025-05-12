import * as api from "@/api";

const apiManager = {
  //  movies related api's
  getMovies: { func: api.getMovies, key: "movies" },
  getUpcomingMovies: { func: api.getUpcomingMovies, key: "upcomingMovies" },
  searchMovies: { func: api.searchMovies, key: "searchMovies" },
  getMovie: { func: api.getMovie, key: "movieDetails" },
  getTrendingMovies: { func: api.getTrendingMovies, key: "trendingMovies" },
  getGenres: { func: api.getGenres, key: "genres" },

  //  movie related api's
  setFavoriteMovie: { func: api.setFavoriteMovie, key: "movieDetails" },
  setMovieInWatchList: { func: api.setMovieInWatchList, key: "movieDetails" },
  rateMovie: { func: api.rateMovie, key: "movieDetails" },
  deleteMovieRating: { func: api.deleteMovieRating, key: "movieDetails" },

  //  authentication related api's
  login: { func: api.login, key: "" },
  createSession: { func: api.createSession, key: "session" },
  deleteSession: { func: api.deleteSession, key: "session" },
  getRequestToken: { func: api.getRequestToken, key: "requestToken" },

  //  user related api's
  getAccountDetails: { func: api.getAccountDetails, key: "userAccount" },
  getFavoriteMovies: { func: api.getFavoriteMovies, key: "favoriteMovies" },
  getMoviesInWatchlist: { func: api.getMoviesInWatchlist, key: "watchlistMovies" },
  getRatedMovies: { func: api.getRatedMovies, key: "ratedMovies" },
};

export default apiManager;
