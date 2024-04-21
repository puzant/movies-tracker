import axios from "./axiosInstance";
import { IAccount, IMovieList } from "@/interfaces";

export const getAccountDetails = (sessionId: string): Promise<IAccount> => {
  return axios.get(`/account?session_id=${sessionId}`);
};

export const getFavoriteMovies = (
  accountId: string,
  sessionId: string,
  language: string
): Promise<IMovieList[]> => {
  return axios.get(`/account/${accountId}/favorite/movies?language=${language}`, {
    params: { session_id: sessionId },
  });
};

export const getMoviesInWatchlist = (
  accountId: string,
  sessionId: string,
  language: string
): Promise<IMovieList[]> => {
  return axios.get(`/account/${accountId}/watchlist/movies?language=${language}`, {
    params: { session_id: sessionId },
  });
};

export const getRatedMovies = (
  accountId: string,
  sessionId: string,
  language: string
): Promise<IMovieList[]> => {
  return axios.get(`/account/${accountId}/rated/movies?language=${language}`, {
    params: { session_id: sessionId },
  });
};
