import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  IFavoriteMoviePayload,
  IWatchListPayload,
  IRatingPayload,
  IDeleteRatingPayload,
} from "@/interfaces";

import {
  setFavoriteMovie,
  setMovieInWatchList,
  rateMovie,
  deleteMovieRating,
} from "@/api";

import useUserStore from "@/store/useUserStore";
import useMovieStore from "@/store/useMovieStore";

import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarRateIcon from "@mui/icons-material/StarRate";
import { CircularProgress, Rating } from "@mui/material";

export const MovieToolbar = ({ movieId }: { movieId: number }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { sessionId, accountId, isAuthenticated, accentColor } = useUserStore();
  const { isFavorite, isInWatchlist, isRated } = useMovieStore();

  const [rating, setRating] = React.useState<any>(isRated);
  const [showRating, setShowRating] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isRated !== null) setRating(isRated);
  }, [isRated]);

  const { mutate: setFavorietMovieMutation, isPending: addingFavoriteLoading } =
    useMutation({
      mutationFn: (payload: IFavoriteMoviePayload) => setFavoriteMovie(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
      },
    });

  const {
    mutate: setMovieWatchListMutation,
    isPending: addingWatchListLoading,
  } = useMutation({
    mutationFn: (payload: IWatchListPayload) => setMovieInWatchList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  const { mutate: rateMovieMutation } = useMutation({
    mutationFn: (payload: IRatingPayload) => rateMovie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  const { mutate: deleteRatingMutation } = useMutation({
    mutationFn: (payload: IDeleteRatingPayload) => deleteMovieRating(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  const handleSetMovieToFavorite = () => {
    if (!isAuthenticated) return;

    setFavorietMovieMutation({
      accountId,
      sessionId,
      id: movieId,
      favorite: !isFavorite,
    });
  };

  const handleSetMovieToWatchList = () => {
    if (!isAuthenticated) return;

    setMovieWatchListMutation({
      accountId,
      sessionId,
      id: movieId,
      isInWatchlist: !isInWatchlist,
    });
  };

  const handleMovieRating = (ratingValue: number | null) => {
    if (!isAuthenticated) return;

    setRating(ratingValue);

    if (ratingValue === null) {
      const deleteResponse: any = deleteRatingMutation({
        id: movieId,
        sessionId,
      });

      if (deleteResponse.status.success) setRating(ratingValue);
    } else {
      const ratingResponse: any = rateMovieMutation({
        id: movieId,
        rating: ratingValue,
        sessionId,
      });

      if (ratingResponse.status.success) setRating(ratingValue);
    }
  };

  const onRateMovie = () => {
    if (isAuthenticated) return setShowRating(!showRating);
    return;
  };

  return (
    <div className="flex justify-center sm:justify-start gap-4 mt-4">
      <Tooltip
        arrow
        onClick={handleSetMovieToFavorite}
        title={
          isAuthenticated
            ? t("add_movie_to_favorite")
            : t("login_to_add_movie_to_favorite")
        }
      >
        {addingFavoriteLoading ? (
          <div className="bg-[#0277bd] rounded-full w-[48px] h-[48px] flex justify-center items-center">
            <CircularProgress sx={{ color: "#fff" }} size={30} />
          </div>
        ) : (
          <FavoriteIcon
            sx={{
              background: accentColor,
              borderRadius: "50%",
              padding: "12px",
              width: "48px",
              height: "48px",
              color: isFavorite ? "#b91c1c" : "#fff",
              fontSize: "28px",
            }}
          />
        )}
      </Tooltip>

      <Tooltip
        arrow
        onClick={handleSetMovieToWatchList}
        title={
          isAuthenticated
            ? t("add_movie_to_watch_list")
            : t("login_to_add_movie_to_watchlist")
        }
      >
        {addingWatchListLoading ? (
          <div className="bg-[#0277bd] rounded-full w-[48px] h-[48px] flex justify-center items-center">
            <CircularProgress sx={{ color: "#fff" }} size={30} />
          </div>
        ) : (
          <BookmarkIcon
            sx={{
              background: accentColor,
              borderRadius: "50%",
              padding: "12px",
              width: "48px",
              height: "48px",
              color: isInWatchlist ? "#84cc16" : "#fff",
              fontSize: "28px",
            }}
          />
        )}
      </Tooltip>

      <Tooltip
        arrow
        onClick={onRateMovie}
        title={isAuthenticated ? t("rate_movie") : t("login_to_rate_movie")}
      >
        <StarRateIcon
          sx={{
            background: accentColor,
            borderRadius: "50%",
            padding: "12px",
            width: "48px",
            height: "48px",
            color: isRated ? "#fbbf24" : "#fff",
            fontSize: "28px",
          }}
        />
      </Tooltip>

      {showRating && (
        <div className="bg-white px-4 flex items-center rounded-md">
          <Rating
            data-testid="rating-movie-component"
            precision={0.5}
            name="movie-rating"
            value={rating}
            onChange={(e, newValue) => handleMovieRating(newValue)}
          />
        </div>
      )}
    </div>
  );
};
