export interface IApiFunction {
  [key: string]: {
    func: (...params: any[]) => Promise<any>;
    key: string;
  };
}

export interface IMovies {
  movies: IMovie[];
}

interface IAccountStates {
  favorite: boolean;
  rated: boolean;
  watchlist: boolean;
}

export interface IKeyword {
  id: number;
  name: string;
}

export interface ISortingOption {
  id: number;
  key: string;
  name: string;
}

export interface IGenreResponse {
  genres: IGenre[];
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IPerson {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  known_for_department: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface ICast extends IPerson {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrew extends IPerson {
  department: string;
  credit_id: string;
  job: string;
}

export interface ISpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IBelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface IProductionCompanies {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface IProductionCountries {
  iso_3166_1: string;
  name: string;
}

export interface IReview {
  author: string;
  author_details: IAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface IRecommededMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMoviesListResponse {
  page: number;
  results: IMovieList[];
  total_pages: number;
  total_results: number;
}

export interface IMovieList {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: IBelongsToCollection;
  budget?: number;
  genres?: IGenre[];
  homepage?: string;
  id: number;
  account_states?: IAccountStates;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies?: IProductionCompanies[];
  production_countries?: IProductionCountries[];
  release_date: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: ISpokenLanguages[];
  status?: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits?: {
    cast: ICast[];
    crew: ICrew[];
  };
  keywords?: {
    keywords: IKeyword[];
  };
  reviews?: {
    page: number;
    results: IReview[];
    total_pages: number;
    total_results: number;
  };
  recommendations?: {
    page: number;
    results: IRecommededMovie[];
    total_pages: number;
    total_results: number;
  };
}

export interface IAuthorDetails {
  avatar_path: string | null;
  name: string;
  rating: number;
  username: string;
}

export interface IPopularMoviesParams {
  sortBy: ISortingOption;
  selectedGenres: IGenre[];
  startDate: string;
  endDate: string;
  selectedLanguage: string;
  page: number;
}

export interface IPostLoginBody {
  username: string;
  password: string;
  requestToken: string;
}

export interface IGetFavoriteMoviesParams {
  sort_by: string;
  page?: number;
}

export interface IFavoriteMoviePayload {
  accountId: number | null;
  sessionId: string;
  id: number;
  favorite: boolean;
}

export interface IWatchListPayload {
  accountId: number | null;
  sessionId: string;
  id: number;
  isInWatchlist: boolean;
}

export interface IRatingPayload {
  id: number;
  rating: number;
  sessionId: string;
}

export interface IDeleteRatingPayload {
  id: number;
  sessionId: string;
}

export interface IAccount {
  id: number;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  username: string;
  tmdb: {
    avatar_path: string | null;
  };
  gravatar: {
    hash: string;
  };
}

export interface IPage {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}
