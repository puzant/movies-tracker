import { create } from "zustand";
import { IGenre, ISortingOption } from "@/interfaces";
import { sortingOptions } from "@/utils/constants";

interface IFiltersStore {
  sortBy: ISortingOption;
  releaseDate: {
    start: null | Date;
    end: null | Date;
  };
  selectedGenres: IGenre[];
  setSort: (param: ISortingOption) => void;
  setStartDate: (param: Date | null) => void;
  setEndDate: (param: Date | null) => void;
  setGenres: (param: IGenre) => void;
}

const useFiltersStore = create<IFiltersStore>((set) => ({
  sortBy: sortingOptions[0],
  releaseDate: {
    start: null,
    end: null,
  },
  selectedGenres: [],

  setSort: (sortingOption) =>
    set({
      sortBy: sortingOption,
    }),

  setStartDate: (startDate: null | Date) => {
    set((state) => ({
      releaseDate: { ...state.releaseDate, start: startDate },
    }));
  },

  setEndDate: (endDate: null | Date) => {
    set((state) => ({
      releaseDate: { ...state.releaseDate, end: endDate },
    }));
  },

  setGenres: (genre: IGenre) => {
    set((state) => {
      const updatedGenres = [...state.selectedGenres];

      if (updatedGenres.includes(genre)) {
        return {
          selectedGenres: updatedGenres.filter((selectedGenre) => selectedGenre.id !== genre.id),
        };
      } else {
        updatedGenres.push(genre);
        return { selectedGenres: updatedGenres };
      }
    });
  },
}));

export default useFiltersStore;
