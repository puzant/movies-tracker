import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import apiManager from "@/apiManager";
import useFiltersStore from "@/store/useFiltersStore";
import useUserStore from "@/store/useUserStore";

export const useFilters = () => {
  const { i18n, t } = useTranslation();

  const { accentColor } = useUserStore();
  const { sortBy, releaseDate, selectedGenres, setSort, setStartDate, setEndDate, setGenres } = useFiltersStore();

  const { data: genres = [], isFetching } = useQuery({
    queryKey: [apiManager.getGenres.key, i18n.language],
    queryFn: () => apiManager.getGenres.func(i18n.language),
    select: (res) => res?.genres ?? [],
  });

  return {
    genres,
    isFetching,
    t,
    accentColor,
    sortBy,
    releaseDate,
    selectedGenres,
    setSort,
    setStartDate,
    setEndDate,
    setGenres,
  };
};

export default useFilters;
