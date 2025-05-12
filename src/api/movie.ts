import axios from "./axiosInstance";
import { DateTime } from "luxon";
import {
  IGenre,
  IGenreResponse,
  IPopularMoviesParams,
  IFavoriteMoviePayload,
  IWatchListPayload,
  IRatingPayload,
  IDeleteRatingPayload,
  IMovie,
  IMovieResponse,
  IMoviesListResponse,
} from "@/interfaces";

interface IRateMovieResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

/**
 * Fetches a list of movies based on various filters.
 *
 * @param {IPopularMoviesParams} params - The parameters for fetching popular movies.
 * @returns {Promise<IMovie[]>} A promise that resolves to a list of movies.
 */
export const getMovies = ({
  sortBy,
  selectedGenres,
  startDate,
  endDate,
  selectedLanguage,
  page,
}: IPopularMoviesParams): Promise<IMovie[]> => {
  return axios.get(`discover/movie?language=${selectedLanguage}`, {
    params: {
      page: page,
      sort_by: typeof sortBy === "object" && "key" in sortBy ? sortBy.key : sortBy,
      with_genres: selectedGenres?.map((obj: IGenre) => obj.id).join(",") || null,
      "primary_release_date.gte": startDate ? DateTime.fromISO(startDate).toFormat("yyyy-MM-dd") : null,
      "primary_release_date.lte": endDate ? DateTime.fromISO(endDate).toFormat("yyyy-MM-dd") : null,
    },
  });
};

/**
 * Fetches a list of upcoming movies.
 *
 * @param {string} selectedLanguage - The language for the movie data.
 * @param {number} [page=1] - The page number for pagination.
 * @returns {Promise<IMovie[]>} A promise that resolves to a list of upcoming movies.
 */
export const getUpcomingMovies = (selectedLanguage: string, page: number = 1): Promise<IMovie[]> => {
  return axios.get(`/movie/upcoming?language=${selectedLanguage}&page=${page}`);
};

/**
 * Searches for movies based on a query string.
 *
 * @param {string} query - The search query.
 * @param {number} [page=1] - The page number for pagination.
 * @returns {Promise<IMovie[]>} A promise that resolves to a list of movies matching the query.
 */
export const searchMovies = (query: string, page: number = 1): Promise<IMoviesListResponse> => {
  return axios.get("/search/movie", {
    params: {
      query: query,
      page: page,
    },
  });
};

/**
 *
 * @returns {Promise<IMovie>}
 */
export const getLatestMovie = (): Promise<IMovie> => {
  return axios.get("/movie/latest");
};

/**
 * Fetches details for a specific movie.
 *
 * @param {string | undefined} movieId - The ID of the movie.
 * @param {string} sessionId - The session ID for the user.
 * @param {string} selectedLanguage - The language for the movie data.
 * @returns {Promise<IMovie>} A promise that resolves to the movie details.
 */
export const getMovie = (
  movieId: string | number | undefined,
  sessionId: string,
  selectedLanguage: string
): Promise<IMovie> => {
  return axios.get(`movie/${movieId}?language=${selectedLanguage}`, {
    params: {
      session_id: sessionId,
      append_to_response: "credits,keywords,reviews,recommendations,account_states",
    },
  });
};

/**
 * Fetches a list of movie genres.
 *
 * @param {string} selectedLanguage - The language for the genre data.
 * @returns {Promise<any>} A promise that resolves to the list of genres.
 */
export const getGenres = (selectedLanguage: string): Promise<IGenreResponse> => {
  return axios.get(`/genre/movie/list?language=${selectedLanguage}`);
};

/**
 * Marks a movie as favorite for the user.
 *
 * @param {IFavoriteMoviePayload} payload - The payload containing account ID, session ID, movie ID, and favorite status.
 * @returns {Promise<IMovieResponse>} A promise that resolves to the response of the favorite action.
 */
export const setFavoriteMovie = ({
  accountId,
  sessionId,
  id,
  favorite,
}: IFavoriteMoviePayload): Promise<IMovieResponse> => {
  return axios.post(`/account/${accountId}/favorite?session_id=${sessionId}`, {
    media_type: "movie",
    media_id: id,
    favorite: favorite,
  });
};

/**
 * Adds or removes a movie from the user's watchlist.
 *
 * @param {IWatchListPayload} payload - The payload containing account ID, session ID, movie ID, and watchlist status.
 * @returns {Promise<IMovieResponse>} A promise that resolves to the response of the watchlist action.
 */
export const setMovieInWatchList = ({
  accountId,
  sessionId,
  id,
  isInWatchlist,
}: IWatchListPayload): Promise<IMovieResponse> => {
  return axios.post(`/account/${accountId}/watchlist?session_id=${sessionId}`, {
    media_type: "movie",
    media_id: id,
    watchlist: isInWatchlist,
  });
};

/**
 * Rates a movie for the user.
 *
 * @param {IRatingPayload} payload - The payload containing movie ID, rating, and session ID.
 * @returns {Promise<IMovieResponse>} A promise that resolves to the response of the rating action.
 */
export const rateMovie = ({ id, rating, sessionId }: IRatingPayload): Promise<IRateMovieResponse> => {
  return axios.post(`/movie/${id}/rating?session_id=${sessionId}`, {
    value: rating,
  });
};

/**
 * Deletes the user's rating for a movie.
 *
 * @param {IDeleteRatingPayload} payload - The payload containing movie ID and session ID.
 * @returns {Promise<IMovieResponse>} A promise that resolves to the response of the delete rating action.
 */
export const deleteMovieRating = ({ id, sessionId }: IDeleteRatingPayload): Promise<IMovieResponse> => {
  return axios.delete(`/movie/${id}/rating?session_id=${sessionId}`);
};

/**
 *
 * @returns {Promise<IMoviesListResponse>}
 */
export const getTrendingMovies = (): Promise<IMoviesListResponse> => {
  return axios.get(`/trending/movie/day`);
};
