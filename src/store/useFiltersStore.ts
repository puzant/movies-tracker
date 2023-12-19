import { create } from 'zustand';
import { IGenre } from "@/interfaces";
import { sortingOptions } from "@/utils/constants";

interface IFiltersStore {
  sortBy: any
  releaseDate: {
    start: null | Date
    end: null | Date
  }
  selectedGenres: IGenre[]
  setSort: (param: any) => void
  setStartDate: (param: any) => void
  setEndDate: (param: any) => void
  setGenres: (param: any) => void
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

  setStartDate: (startDate: Date) => {
    set((state) => ({
      releaseDate: { ...state.releaseDate, start: startDate },
    }));
  },

  setEndDate: (endDate: Date) => {
    set((state) => ({
      releaseDate: { ...state.releaseDate, end: endDate },
    }));
  },

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