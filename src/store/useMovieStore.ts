import { create } from 'zustand';

interface IMovieStore {
  isFavorite: boolean
  isInWatchlist: boolean
  isRated: number | boolean | null
  setMovieStatus: (param: any) => void
  resetMovieStatus: () => void
}

const useMovieStore = create<IMovieStore>((set) => ({
  isFavorite: false,
  isInWatchlist: false,
  isRated: null,

  setMovieStatus: (movieStatus) => set({ 
    isFavorite: movieStatus.favorite, 
    isInWatchlist: movieStatus.watchlist, 
    isRated: movieStatus.rated ? movieStatus.rated.value : movieStatus.rated
  }),

  resetMovieStatus: () => set({
    isFavorite: false,
    isInWatchlist: false,
    isRated: null,
  })
}))

export default useMovieStore