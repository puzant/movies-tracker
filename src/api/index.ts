import axios from './axiosInstance'
import { IPostLoginBody } from '@/interfaces'

export const getMovies = (sortOption: any = 'popularity.desc', genres = null, page = 1) => {
  return axios.get(`discover/movie?&page=${page}&sort_by=${sortOption.key}&with_genres=${genres?.map(obj => obj.id).join(',')}`)
}

export const getMovie = (movieId: string) => axios.get(`movie/${movieId}?append_to_response=credits,keywords,reviews,recommendations,account_states`)

export const getGenres = () => axios.get('/genre/movie/list?language=en')

export const getRequestToken = () => axios.get('/authentication/token/new')

export const login = ({ username, password, requestToken }: IPostLoginBody) => {
  return axios.post('authentication/token/validate_with_login', {
    username,
    password,
    request_token: requestToken
  })
}

export const createSession = ({ requestToken }) =>
  axios.post('/authentication/session/new', { request_token: requestToken });

