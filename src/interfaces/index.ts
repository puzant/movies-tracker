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