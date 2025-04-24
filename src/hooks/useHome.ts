import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import useUserStore from "@/store/useUserStore";
import useFiltersStore from "@/store/useFiltersStore";
import useInfiniteMovieQuery from "@/queries/useInfiniteMovieQuery";
import { IApiFunction, IAccount } from "@/interfaces";

const useHome = (apiFunctions: IApiFunction) => {
  const { i18n, t } = useTranslation();
  const { sortBy, releaseDate, selectedGenres } = useFiltersStore();
  const { isAuthenticated, sessionId, accentColor } = useUserStore();

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const { data: accountData }: UseQueryResult<IAccount> = useQuery({
    queryKey: [apiFunctions.getAccountDetails.key, sessionId],
    queryFn: () => apiFunctions.getAccountDetails.func(sessionId),
    enabled: isAuthenticated,
  });

  const {
    data: moviesData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteMovieQuery(
    [
      apiFunctions.getMovies.key,
      sortBy,
      selectedGenres,
      releaseDate.start,
      releaseDate.end,
      i18n.language,
    ],
    ({ pageParam }: { pageParam: number }) =>
      apiFunctions.getMovies.func({
        sortBy: sortBy,
        selectedGenres: selectedGenres,
        startDate: releaseDate.start,
        endDate: releaseDate.end,
        selectedLanguage: i18n.language,
        page: pageParam,
      })
  );

  React.useEffect(() => {
    if (accountData)
      useUserStore.setState({
        accountId: accountData.id,
        username: accountData.username,
      });
  }, [accountData]);

  return {
    t,
    accentColor,
    openDialog,
    setOpenDialog,
    moviesData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useHome;
