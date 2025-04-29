import React from "react";
import { useTranslation } from "react-i18next";
import { useQueries, UseQueryResult } from "@tanstack/react-query";

import { IApiFunction, IMoviesListResponse } from "@/interfaces";
import useUserStore from "@/store/useUserStore";

const useProfile = (apiFunctions: IApiFunction) => {
  const { i18n, t } = useTranslation();
  const { username, accountId, sessionId, accentColor } = useUserStore();

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const results: UseQueryResult<IMoviesListResponse, Error>[] = useQueries({
    queries: [
      {
        queryKey: [apiFunctions.getFavoriteMovies.key, accountId, sessionId, i18n.language],
        queryFn: () => apiFunctions.getFavoriteMovies.func(accountId, sessionId, i18n.language),
      },
      {
        queryKey: [apiFunctions.getMoviesInWatchlist.key, accountId, sessionId, i18n.language],
        queryFn: () => apiFunctions.getMoviesInWatchlist.func(accountId, sessionId, i18n.language),
      },
      {
        queryKey: [apiFunctions.getRatedMovies.key, accountId, sessionId, i18n.language],
        queryFn: () => apiFunctions.getRatedMovies.func(accountId, sessionId, i18n.language),
      },
    ],
  });

  const anyLoading = results.some((result) => result.status === "pending");

  const [favoriteMovies, moviesInWatchlist, ratedMovies] = results.map(
    (query) => query.data?.results ?? []
  );

  return {
    t,
    username,
    accentColor,
    openDialog,
    setOpenDialog,
    anyLoading,
    favoriteMovies,
    moviesInWatchlist,
    ratedMovies,
  };
};

export default useProfile;
