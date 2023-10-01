import axios from './axiosInstance'

export const getMovies = (sortOption: any = 'popularity.desc', genres = null) => {
  return axios.get(`discover/movie?&page=1&sort_by=${sortOption.key}&with_genres=${genres?.map(obj => obj.id).join(',')}`)
}

export const getMovie = (movieId: string) => axios.get(`movie/${movieId}`)

export const getGenres = () => axios.get('/genre/movie/list?language=en')
