import axios from './axiosInstance'

export const getMovies = (sortOption: any = 'popularity.desc', genres = null, page = 1) => {
  return axios.get(`discover/movie?&page=${page}&sort_by=${sortOption.key}&with_genres=${genres?.map(obj => obj.id).join(',')}`)
}

export const getMovie = (movieId: string) => axios.get(`movie/${movieId}?append_to_response=credits,keywords,reviews,recommendations,account_states`)

export const getGenres = () => axios.get('/genre/movie/list?language=en')
