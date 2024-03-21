import axios from "./axiosInstance";
import { IAccount, IMovieList } from "@/interfaces";

export const getAccountDetails = async (sessionId: string): Promise<IAccount> => {
  const response = await axios.get(`/account?session_id=${sessionId}`);
  return response.data;
};

export const getFavoriteMovies = async (
  accountId: string,
  sessionId: string,
  language: string
): Promise<IMovieList[]> => {
  const response = await axios.get(`/account/${accountId}/favorite/movies?language=${language}`, {
    params: { session_id: sessionId },
  });
  return response.data;
};

export const getMoviesInWatchlist = async (
  accountId: string,
  sessionId: string,
  language: string
): Promise<IMovieList[]> => {
  const response = await axios.get(`/account/${accountId}/watchlist/movies?language=${language}`, {
    params: { session_id: sessionId },
  });
  return response.data;
};

export const getRatedMovies = async (
  accountId: string,
  sessionId: string,
  language: string
): Promise<IMovieList[]> => {
  const response = await axios.get(`/account/${accountId}/rated/movies?language=${language}`, {
    params: { session_id: sessionId },
  });
  return response.data;
};
