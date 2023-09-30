import axios from './axiosInstance'

export const getMovies = () => {
  return axios.get('discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc')
}

export const getGenres = () => axios.get('/genre/movie/list?language=en')
