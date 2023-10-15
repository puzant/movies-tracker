import axios from './axiosInstance'
import moment from 'moment'
import { IGenre, ISortingOption } from '@/interfaces'

interface IDiscoverMoviesParams {
  page: number
  sort_by: ISortingOption 
  with_genres?: string
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
}

interface ISearchMoviesParams {
  page?: number
  query: string
}

const sessionId = localStorage.getItem('sessionId')
const accountId = localStorage.getItem('accountId')

export const getMovies = (sort: ISortingOption = 'popularity.desc', with_genres: IGenre, startDate: string, endDate: string, page: number) => {
  return axios.get('discover/movie', {
    params: {
      page: page,
      sort_by: sort.key,
      with_genres: with_genres?.map((obj: IGenre) => obj.id).join(',') || null,
      'primary_release_date.gte': startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      'primary_release_date.lte': endDate ? moment(endDate).format("YYYY-MM-DD") : null,
    }
  })
}

export const getUpcomingMovies = (page = 1) => {
  return axios.get(`/movie/upcoming?language=en-US&page=${page}`)
}

export const searchMovies = (query, page = 1) => {
  return axios.get('/search/movie', {
    params: {
      query: query,
      page: page,
    }
  })
}

export const getMovie = (movieId: string, sessionId?: string) => {
  return axios.get(`movie/${movieId}`, {
    params: {
      session_id: sessionId,
      append_to_response: 'credits,keywords,reviews,recommendations,account_states',
    }
  })
}

export const getGenres = () => {
  return axios.get('/genre/movie/list?language=en')
}

export const setFavoriteMovie = ({id, favorite}) => {
  return axios.post(`/account/${accountId}/favorite?session_id=${sessionId}`, {
    media_type: 'movie',
    media_id: id,
    favorite: favorite
  })
}

export const setMovieInWatchList = ({ id, isInWatchlist }) => {
  return axios.post(`/account/${accountId}/watchlist?session_id=${sessionId}`, {
    media_type: 'movie',
    media_id: id,
    watchlist: isInWatchlist
  })
  
}

export const rateMovie = (id: string, rating: number, sessionId: string) => {
  return axios.post(`/movie/${id}/rating?session_id=${sessionId}`, { value: rating })
}

export const deleteMovieRating = (id: string, sessionId: string) => {
  return axios.delete(`/movie/${id}/rating?session_id=${sessionId}`);
}