import useMovieToolbar from "@/hooks/useMovieToolbar";

import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarRateIcon from "@mui/icons-material/StarRate";
import { CircularProgress, Rating } from "@mui/material";

export const MovieToolbar = ({ movieId }: { movieId: number }) => {
  const {
    accentColor,
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
  } = useMovieToolbar(movieId);

  return (
    <div className="flex justify-center sm:justify-start gap-4 mt-4">
      <Tooltip arrow onClick={handleSetMovieToFavorite} title={favoriteTooltip}>
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

      <Tooltip arrow onClick={handleSetMovieToWatchList} title={watchListTooltip}>
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

      <Tooltip arrow onClick={onRateMovie} title={rateMovieTooltip}>
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
