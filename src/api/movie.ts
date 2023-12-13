import axios from './axiosInstance'
import { DateTime } from 'luxon';
import { 
  IGenre, 
  ISortingOption,
  IFavoriteMoviePayload, 
  IWatchListPayload, 
  IRatingPayload, 
  IDeleteRatingPayload
 } from '@/interfaces'

export const getMovies = (sort: ISortingOption | string = 'popularity.desc', with_genres: IGenre[], startDate: string, endDate: string, page: number) => {
  return axios.get('discover/movie?language=en-Us', {
    params: {
      page: page,
      sort_by: (typeof sort === 'object' && 'key' in sort) ? sort.key : sort,
      with_genres: with_genres?.map((obj: IGenre) => obj.id).join(',') || null,
      'primary_release_date.gte': startDate ? DateTime.fromISO(startDate).toFormat("yyyy-MM-dd") : null,
      'primary_release_date.lte': endDate ? DateTime.fromISO(endDate).toFormat("yyyy-MM-dd") : null,
    }
  })
}

export const getUpcomingMovies = (page: number = 1) => {
  return axios.get(`/movie/upcoming?language=en-US&page=${page}`)
}

export const searchMovies = (query: string, page = 1) => {
  return axios.get('/search/movie', {
    params: {
      query: query,
      page: page,
    }
  })
}

export const getMovie = (movieId: string | undefined, sessionId?: string) => {
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

export const setFavoriteMovie = ({accountId, sessionId, id, favorite}: IFavoriteMoviePayload) => {
  return axios.post(`/account/${accountId}/favorite?session_id=${sessionId}`, {
    media_type: 'movie',
    media_id: id,
    favorite: favorite
  })
}

export const setMovieInWatchList = ({ accountId, sessionId, id, isInWatchlist }: IWatchListPayload) => {
  return axios.post(`/account/${accountId}/watchlist?session_id=${sessionId}`, {
    media_type: 'movie',
    media_id: id,
    watchlist: isInWatchlist
  })
  
}

export const rateMovie = ({ id, rating, sessionId }: IRatingPayload) => {
  return axios.post(`/movie/${id}/rating?session_id=${sessionId}`, { value: rating })
}

export const deleteMovieRating = ({ id, sessionId }: IDeleteRatingPayload) => {
  return axios.delete(`/movie/${id}/rating?session_id=${sessionId}`);
}