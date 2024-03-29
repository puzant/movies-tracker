import { useTranslation } from "react-i18next";
import useGenresQuery from "@/queries/useGenresQuery";
import useFiltersStore from "@/store/useFiltersStore";
import useUserStore from "@/store/useUserStore";

export const useFilters = () => {
  const { i18n, t } = useTranslation();

  const { accentColor } = useUserStore();
  const { sortBy, releaseDate, selectedGenres, setSort, setStartDate, setEndDate, setGenres } =
    useFiltersStore();

  const { data: genres, isFetching } = useGenresQuery(i18n.language);

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
