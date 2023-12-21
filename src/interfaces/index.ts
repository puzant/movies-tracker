export interface IApiFunction {
  [key: string]: {
    func: (...params: any[]) => void
    key: string
  }
}
export interface IMovies {
  movies: IMovie[]
}

export interface IMovie {
  adult: boolean
  backdrop_path: string
  budget: number
  genres: IGenre[]
  homepage: boolean
  id: number
  imdb_id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  vote_average: number
  vote_count: number
  keywords: {
    keywords: IKeyword[]
  }
}

export interface IKeyword {
  id: number
  name: string
}

export interface ISortingOption {
  id: number;
  key: string;
  name: string;
}

export interface IGenre {
  id: number
  name: string
}

export interface IPerson {
  adult: boolean
  gender: number
  id: number
  name: string
  known_fo_department: string
  original_name: string
  popularity: string
  profile_path: string
}


export interface ICast extends IPerson{
  cast_id: number
  character: string 
  credit_id: string 
  gender: number 
  order: number
}

export interface ICrew extends IPerson {
  cast_id: number
  department: string 
  credit_id: string 
  job: number 
}

export interface IReview {
  author: string
  authorDetails: IAuthorDetails
  content: string 
  created_at: string 
  id: string
  updated_at: string
  url: string
}

export interface IAuthorDetails {
  avatar_path: string | null 
  name: string
  rating: number
  username: string
}

export interface IPostLoginBody {
  username: string 
  password: string 
  requestToken: string 
}

export interface IGetFavoriteMoviesParams {
  sort_by: string 
  page?: number
}

export interface IFavoriteMoviePayload {
  accountId: string
  sessionId: string
  id: number
  favorite: boolean
}

export interface IWatchListPayload {
  accountId: string
  sessionId: string
  id: number
  isInWatchlist: boolean
}

export interface IRatingPayload {
  id: number 
  rating: number 
  sessionId: string
}

export interface IDeleteRatingPayload {
  id: number
  sessionId: string
}