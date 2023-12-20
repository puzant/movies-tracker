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

 interface IPopularMoviesParams {
  sortBy: ISortingOption
  selectedGenres: IGenre[]
  startDate: string 
  endDate: string 
  selectedLanguage: string 
  page: number
}

  export const getMovies = ({
    sortBy, 
    selectedGenres,
    startDate,
    endDate,
    selectedLanguage,
    page
  }: IPopularMoviesParams) => {
  return axios.get(`discover/movie?language=${selectedLanguage}`, {
    params: {
      page: page,
      sort_by: (typeof sortBy === 'object' && 'key' in sortBy) ? sortBy.key : sortBy,
      with_genres: selectedGenres?.map((obj: IGenre) => obj.id).join(',') || null,
      'primary_release_date.gte': startDate ? DateTime.fromISO(startDate).toFormat("yyyy-MM-dd") : null,
      'primary_release_date.lte': endDate ? DateTime.fromISO(endDate).toFormat("yyyy-MM-dd") : null,
    }
  })
}

export const getUpcomingMovies = (selectedLanguage: string, page: number = 1) => {
  return axios.get(`/movie/upcoming?language=${selectedLanguage}&page=${page}`)
}

export const searchMovies = (query: string, page = 1) => {
  return axios.get('/search/movie', {
    params: {
      query: query,
      page: page,
    }
  })
}

export const getMovie = (movieId: string | undefined, sessionId: string, selectedLanguage: string) => {
  return axios.get(`movie/${movieId}?language=${selectedLanguage}`, {
    params: {
      session_id: sessionId,
      append_to_response: 'credits,keywords,reviews,recommendations,account_states',
    }
  })
}

export const getGenres = (selectedLanguage: string) => {
  return axios.get(`/genre/movie/list?language=${selectedLanguage}`)
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