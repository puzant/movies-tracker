import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { IApiFunction } from "@/interfaces";
import useMovieStore from "@/store/useMovieStore";
import useUserStore from "@/store/useUserStore";

const useMovieDetails = (apiFunctions: IApiFunction) => {
  const { i18n, t } = useTranslation();
  const { movieId } = useParams();
  const { setMovieStatus } = useMovieStore();
  const { sessionId, isAuthenticated } = useUserStore();

  const {
    data: movieDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: [apiFunctions.getMovie.key, movieId, i18n.language],
    queryFn: () => apiFunctions.getMovie.func(movieId, sessionId, i18n.language),
  });

  useEffect(() => {
    const movieStatus = movieDetails?.account_states;

    if (isAuthenticated && movieStatus) {
      setMovieStatus(movieStatus);
    }
  }, [isAuthenticated, movieDetails, setMovieStatus]);

  return {
    i18n,
    t,
    movieId,
    movieDetails,
    isLoading,
    error,
  };
};

export default useMovieDetails;
