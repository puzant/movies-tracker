import axios from './axiosInstance'

export const getAccountDetails = (sessionId: string) => {
  return axios.get(`/account?session_id=${sessionId}`)
}

export const getFavoriteMovies = (accountId: string, sessionId: string) => {
  return axios.get(`/account/${accountId}/favorite/movies`, {
    params: {session_id: sessionId}
  })
}

export const getMoviesInWatchlist = (accountId: string, sessionId: string) => {
  return axios.get(`/account/${accountId}/watchlist/movies`, {
    params: {session_id: sessionId}
  })
}

export const getRatedMovies = (accountId: string, sessionId: string) => {
  return axios.get(`/account/${accountId}/rated/movies`, {
    params: {session_id: sessionId}
  })
}