import React from "react";
import { useTranslation } from "react-i18next";
import { extractColors } from "extract-colors";
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

  const [posterBackDropColors, setPosterBackDropColors] = React.useState<any>([]);

  const {
    data: movieDetails,
    isLoading,
    error,
  } = useMovieDetailsQuery(apiFunctions, movieId, i18n, sessionId);

  React.useEffect(() => {
    const movieStatus = movieDetails?.account_states;

    if (isAuthenticated && movieStatus) {
      setMovieStatus(movieStatus);
    }
  }, [isAuthenticated, movieDetails]);

  React.useEffect(() => {
    const fetchColor = async () => {
      try {
        if (movieDetails) {
          const posterPath = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}`;
          const colors = await extractColors(posterPath, options);
          setPosterBackDropColors(colors);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchColor();
  }, [movieDetails]);

  const options = {
    pixels: 64000,
    distance: 0.22,
    crossOrigin: "Anonymous",
    saturationDistance: 0.2,
    lightnessDistance: 0.2,
    hueDistance: 0.083333333,
  } as {};

  React.useEffect(() => {
    const fetchColor = async () => {
      try {
        if (movieDetails) {
          const posterPath = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}`;
          const colors = await extractColors(posterPath, options);
          setPosterBackDropColors(colors);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchColor();
  }, [movieDetails]);

  return {
    i18n,
    t,
    movieId,
    posterBackDropColors,
    setPosterBackDropColors,
    movieDetails,
    isLoading,
    error,
    options,
  };
};

export default useMovieDetails;
