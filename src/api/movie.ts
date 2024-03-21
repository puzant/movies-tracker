import axios from "./axiosInstance";
import { DateTime } from "luxon";
import {
  IGenre,
  IPopularMoviesParams,
  IFavoriteMoviePayload,
  IWatchListPayload,
  IRatingPayload,
  IDeleteRatingPayload,
  IMovie,
} from "@/interfaces";

export const getMovies = async ({
  sortBy,
  selectedGenres,
  startDate,
  endDate,
  selectedLanguage,
  page,
}: IPopularMoviesParams): Promise<IMovie[]> => {
  const response = await axios.get(`discover/movie?language=${selectedLanguage}`, {
    params: {
      page: page,
      sort_by: typeof sortBy === "object" && "key" in sortBy ? sortBy.key : sortBy,
      with_genres: selectedGenres?.map((obj: IGenre) => obj.id).join(",") || null,
      "primary_release_date.gte": startDate
        ? DateTime.fromISO(startDate).toFormat("yyyy-MM-dd")
        : null,
      "primary_release_date.lte": endDate ? DateTime.fromISO(endDate).toFormat("yyyy-MM-dd") : null,
    },
  });
  return response.data;
};

export const getUpcomingMovies = async (
  selectedLanguage: string,
  page: number = 1
): Promise<IMovie[]> => {
  const response = await axios.get(`/movie/upcoming?language=${selectedLanguage}&page=${page}`);
  return response.data;
};

export const searchMovies = async (query: string, page: number = 1): Promise<IMovie[]> => {
  const response = await axios.get("/search/movie", {
    params: {
      query: query,
      page: page,
    },
  });
  return response.data;
};

export const getMovie = async (
  movieId: string | undefined,
  sessionId: string,
  selectedLanguage: string
): Promise<IMovie> => {
  const response = await axios.get(`movie/${movieId}?language=${selectedLanguage}`, {
    params: {
      session_id: sessionId,
      append_to_response: "credits,keywords,reviews,recommendations,account_states",
    },
  });
  return response.data;
};

export const getGenres = async (selectedLanguage: string): Promise<IGenre[]> => {
  const response = await axios.get(`/genre/movie/list?language=${selectedLanguage}`);
  return response.data.genres;
};

export const setFavoriteMovie = ({ accountId, sessionId, id, favorite }: IFavoriteMoviePayload) => {
  return axios.post(`/account/${accountId}/favorite?session_id=${sessionId}`, {
    media_type: "movie",
    media_id: id,
    favorite: favorite,
  });
};

export const setMovieInWatchList = ({
  accountId,
  sessionId,
  id,
  isInWatchlist,
}: IWatchListPayload) => {
  return axios.post(`/account/${accountId}/watchlist?session_id=${sessionId}`, {
    media_type: "movie",
    media_id: id,
    watchlist: isInWatchlist,
  });
};

export const rateMovie = ({ id, rating, sessionId }: IRatingPayload) => {
  return axios.post(`/movie/${id}/rating?session_id=${sessionId}`, {
    value: rating,
  });
};

export const deleteMovieRating = ({ id, sessionId }: IDeleteRatingPayload) => {
  return axios.delete(`/movie/${id}/rating?session_id=${sessionId}`);
};
