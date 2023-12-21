import axios from './axiosInstance'

export const getAccountDetails = (sessionId: string) => {
  return axios.get(`/account?session_id=${sessionId}`)
}

export const getFavoriteMovies = (accountId: string, sessionId: string, language: string) => {
  return axios.get(`/account/${accountId}/favorite/movies?language=${language}`, {
    params: {session_id: sessionId}
  })
}

export const getMoviesInWatchlist = (accountId: string, sessionId: string, language: string) => {
  return axios.get(`/account/${accountId}/watchlist/movies?language=${language}`, {
    params: {session_id: sessionId}
  })
}

export const getRatedMovies = (accountId: string, sessionId: string, language: string) => {
  return axios.get(`/account/${accountId}/rated/movies?language=${language}`, {
    params: {session_id: sessionId}
  })
}