import axios from './axiosInstance'

export const getMovies = (sortOption: any = 'popularity.desc', genres = null, page = 1) =>
  axios.get(`discover/movie?&page=${page}&sort_by=${sortOption.key}&with_genres=${genres?.map(obj => obj.id).join(',')}`)

export const getUpcomingMovies = (page = 1) => axios.get(`/movie/upcoming?language=en-US&page=${page}`)

export const getMovie = (movieId: string, sessionId?: string) => 
  axios.get(`movie/${movieId}?append_to_response=credits,keywords,reviews,recommendations,account_states`, {
    params: {
      session_id: sessionId
    }
  })

export const getGenres = () => axios.get('/genre/movie/list?language=en')
