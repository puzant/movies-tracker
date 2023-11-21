import { create } from 'zustand';
import { IGenre } from "@/interfaces";
import { sortingOptions } from "@/utils/constants";

interface IFiltersStore {
  sortBy: string
  releaseDate: {
    start: null | Date
    end: null | Date
  }
  selectedGenres: IGenre[]
}

const useFiltersStore = create<IFiltersStore>((set) => ({
  sortBy: sortingOptions[0],
  releaseDate: {
    start: null,
    end: null
  },
  selectedGenres: [],

  setSort: (sortingOption) => set({ 
    sortBy: sortingOption
  }),

  setReleaseDate: (start, end) => set((state) => ({
    releaseDate: {
      start: start,
      end: end,
    },
  })),

  setGenres: (genre: IGenre) => set((state) => {
    const updatedGenres = [...state.selectedGenres]

    if (updatedGenres.includes(genre)) {
      return { selectedGenres: updatedGenres.filter((selectedGenre) => selectedGenre.id !== genre.id)
      }
    } else {
      updatedGenres.push(genre)
      return { selectedGenres: updatedGenres }
    }

  }),
  
}))

export default useFiltersStore