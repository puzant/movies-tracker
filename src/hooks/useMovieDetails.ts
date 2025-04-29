import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import useMovieDetailsQuery from "@/queries/useMovieDetailsQuery";
import { IApiFunction } from "@/interfaces";
import useMovieStore from "@/store/useMovieStore";
import useUserStore from "@/store/useUserStore";

const useMovieDetails = (apiFunctions: IApiFunction) => {
  const { i18n, t } = useTranslation();
  const { movieId } = useParams();
  const { setMovieStatus } = useMovieStore();
  const { sessionId, isAuthenticated } = useUserStore();

  const { data: movieDetails, isLoading, error } = useMovieDetailsQuery(apiFunctions, movieId, i18n, sessionId);

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
