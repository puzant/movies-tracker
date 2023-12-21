import { create } from 'zustand';

interface IMovieStatus {
  favorite: boolean
  watchlist: boolean
  rated: boolean | {value: number}
}

interface IMovieStore {
  isFavorite: boolean
  isInWatchlist: boolean
  isRated: number | boolean | null
  setMovieStatus: (param: IMovieStatus) => void
  resetMovieStatus: () => void
}

const useMovieStore = create<IMovieStore>((set) => ({
  isFavorite: false,
  isInWatchlist: false,
  isRated: null,

  setMovieStatus: (movieStatus) => set({ 
    isFavorite: movieStatus.favorite, 
    isInWatchlist: movieStatus.watchlist, 
    isRated: typeof movieStatus.rated === 'boolean' ?  movieStatus.rated : movieStatus.rated.value
  }),

  resetMovieStatus: () => set({
    isFavorite: false,
    isInWatchlist: false,
    isRated: null,
  })
}))

export default useMovieStore