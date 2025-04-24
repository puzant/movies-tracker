import React from "react";
import { useTranslation } from "react-i18next";

import useFavoriteMovieMutation from "@/mutations/useFavoriteMovieMutation";
import useMovieWatchListMutation from "@/mutations/useMovieWatchListMutation";
import useRateMovieMutation from "@/mutations/useRateMovieMutation";
import useDeleteMovieRatingMutation from "@/mutations/useDeleteMovieRatingMutation";

import useUserStore from "@/store/useUserStore";
import useMovieStore from "@/store/useMovieStore";

const useMovieToolbar = (movieId: number) => {
  const { t } = useTranslation();
  const { sessionId, accountId, isAuthenticated, accentColor, username, setAccentColor } = useUserStore();
  const { isFavorite, isInWatchlist, isRated } = useMovieStore();

  const [rating, setRating] = React.useState<boolean | number | null>(isRated);
  const [showRating, setShowRating] = React.useState<boolean>(false);

  const favoriteTooltip = isAuthenticated ? t("add_movie_to_favorite") : t("login_to_add_movie_to_favorite");
  const watchListTooltip = isAuthenticated ? t("add_movie_to_watch_list") : t("login_to_add_movie_to_watchlist");
  const rateMovieTooltip = isAuthenticated ? t("rate_movie") : t("login_to_rate_movie");

  const { mutateAsync: rateMovieMutation } = useRateMovieMutation();
  const { mutateAsync: deleteRatingMutation } = useDeleteMovieRatingMutation();
  const { mutateAsync: setFavoriteMutation, isPending: addingFavoriteLoading } = useFavoriteMovieMutation();
  const { mutateAsync: setMovieWatchListMutation, isPending: addingWatchListLoading } = useMovieWatchListMutation();

  React.useEffect(() => {
    if (isRated !== null) setRating(isRated);
  }, [isRated]);

  const handleSetMovieToFavorite = () => {
    if (!isAuthenticated) return;
    setFavoriteMutation({ accountId, sessionId, id: movieId, favorite: !isFavorite });
  };

  const handleSetMovieToWatchList = () => {
    if (!isAuthenticated) return;
    setMovieWatchListMutation({ accountId, sessionId, id: movieId, isInWatchlist: !isInWatchlist });
  };

  const handleMovieRating = async (ratingValue: number | null) => {
    if (!isAuthenticated) return;
    setRating(ratingValue);

    if (ratingValue === null) {
      const deleteResponse = await deleteRatingMutation({
        id: movieId,
        sessionId,
      });

      if (deleteResponse.success) setRating(ratingValue);
    } else {
      const ratingResponse = await rateMovieMutation({
        id: movieId,
        rating: ratingValue,
        sessionId,
      });

      if (ratingResponse.success) setRating(ratingValue);
    }
  };

  const onRateMovie = () => {
    if (isAuthenticated) return setShowRating(!showRating);
    return;
  };

  return {
    t,
    accentColor,
    isAuthenticated,
    sessionId,
    accountId,
    username,
    setAccentColor,
    isFavorite,
    isInWatchlist,
    isRated,
    addingFavoriteLoading,
    addingWatchListLoading,
    rating,
    showRating,
    handleSetMovieToFavorite,
    handleSetMovieToWatchList,
    handleMovieRating,
    onRateMovie,
    favoriteTooltip,
    watchListTooltip,
    rateMovieTooltip,
  };
};

export default useMovieToolbar;
