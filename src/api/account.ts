import axios from "./axiosInstance";
import { IAccount, IMovieList } from "@/interfaces";

/**
 *
 * @param {string} sessionId
 * @returns {Promise<IAccount>}
 */
export const getAccountDetails = (sessionId: string): Promise<IAccount> => {
  return axios.get(`/account?session_id=${sessionId}`);
};

/**
 *
 * @param {string} accountId
 * @param {string} sessionId
 * @param {string} language
 * @returns {Promise<IMovieList[]>}
 */
export const getFavoriteMovies = (accountId: string, sessionId: string, language: string): Promise<IMovieList[]> => {
  return axios.get(`/account/${accountId}/favorite/movies?language=${language}`, {
    params: { session_id: sessionId },
  });
};

/**
 *
 * @param {string} accountId
 * @param {string} sessionId
 * @param {string} language
 * @returns {Promise<IMovieList[]>}
 */
export const getMoviesInWatchlist = (accountId: string, sessionId: string, language: string): Promise<IMovieList[]> => {
  return axios.get(`/account/${accountId}/watchlist/movies?language=${language}`, {
    params: { session_id: sessionId },
  });
};

/**
 *
 * @param {string} accountId
 * @param {string} sessionId
 * @param {string} language
 * @returns {<IMovieList[]>}
 */
export const getRatedMovies = (accountId: string, sessionId: string, language: string): Promise<IMovieList[]> => {
  return axios.get(`/account/${accountId}/rated/movies?language=${language}`, {
    params: { session_id: sessionId },
  });
};
