import axios from './axiosInstance'

export const getAccountDetails = (sessionId: string) => {
  return axios.get(`/account?session_id=${sessionId}`)
}

export const getFavoriteMovies = (accountId: string) => {
  return axios.get(`/account/${accountId}/favorite/movies`)
}