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

export interface ICast {
  adult: boolean
  cast_id: number
  character: string 
  credit_id: string 
  gender: number 
  id: number
  known_fo_department: string 
  name: string 
  order: number
  original_name: string 
  popularity: number 
  profile_path: string 
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