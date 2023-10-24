import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useStore from '@/store'

import {
  IMovie,
  IFavoriteMoviePayload,
  IWatchListPayload,
  IRatingPayload,
  IDeleteRatingPayload
} from '@/interfaces';

import {
  setFavoriteMovie,
  setMovieInWatchList,
  rateMovie,
  deleteMovieRating
} from '@/api'

import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarRateIcon from '@mui/icons-material/StarRate';
import { CircularProgress, Rating } from '@mui/material';

export const MovieToolbar = ({ movieDetails }: IMovie) => {
  const queryClient = useQueryClient()

  const { favorite, watchlist, rated } = movieDetails.account_states || {}
  const { sessionId, accountId, isAuthenticated } = useStore()

  const [rating, setRating] = React.useState<number | null>(rated?.value)
  const [showRating, setShowRating] = React.useState<boolean>(false)

  const {
    mutate: setFavorietMovieMutation,
    isPending: addingFavoriteLoading
  } = useMutation({
    mutationFn: (payload: IFavoriteMoviePayload) => setFavoriteMovie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movieDetails'] })
    },
  })

  const {
    mutate: setMovieWatchListMutation,
    isPending: addingWatchListLoading
  } = useMutation({
    mutationFn: (payload: IWatchListPayload) => setMovieInWatchList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movieDetails'] })
    },
  })

  const {
    mutate: rateMovieMutation,
  } = useMutation({
    mutationFn: (payload: IRatingPayload) => rateMovie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movieDetails'] })
    },
  })

  const {
    mutate: deleteRatingMutation,
  } = useMutation({
    mutationFn: (payload: IDeleteRatingPayload) => deleteMovieRating(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movieDetails'] })
    },
  })

  const handleSetMovieToFavorite = () => {
    if (!isAuthenticated) return

    setFavorietMovieMutation({
      accountId,
      sessionId,
      id: movieDetails.id,
      favorite: !favorite
    })
  }

  const handleSetMovieToWatchList = () => {
    if (!isAuthenticated) return

    setMovieWatchListMutation({
      accountId,
      sessionId,
      id: movieDetails.id,
      isInWatchlist: !watchlist
    })
  }

  const handleMovieRating = (ratingValue: number | null) => {
    if (!isAuthenticated) return

    setRating(ratingValue)

    if (ratingValue === null) {
      const deleteResponse = deleteRatingMutation({
        id: movieDetails.id,
        sessionId
      })

      if (deleteResponse.status.success) setRating(ratingValue)
    } else {
      const ratingResponse = rateMovieMutation({
        id: movieDetails.id,
        rating: ratingValue,
        sessionId
      })

      if (ratingResponse.status.success) setRating(ratingValue)

    }
  }

  return (
    <div className="flex justify-center sm:justify-start gap-4 mt-4">
      <Tooltip
        arrow
        onClick={handleSetMovieToFavorite}
        title={isAuthenticated ? "Add movie to your favorite list" : "Login to add movie to your favorite list"}
      >
        {addingFavoriteLoading ?
          <div className='bg-[#0277bd] rounded-full w-[48px] h-[48px] flex justify-center items-center'>
            <CircularProgress sx={{ color: "#fff" }} size={30} />
          </div>
          :
          <FavoriteIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: favorite ? '#b91c1c' : '#fff', fontSize: '28px' }} />
        }
      </Tooltip>

      <Tooltip
        arrow
        onClick={handleSetMovieToWatchList}
        title={isAuthenticated ? "Add movie to your watch list" : "Login to add movie to your watch list"}
      >
        {addingWatchListLoading ?
          <div className='bg-[#0277bd] rounded-full w-[48px] h-[48px] flex justify-center items-center'>
            <CircularProgress sx={{ color: "#fff" }} size={30} />
          </div>
          :
          <BookmarkIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: watchlist ? '#84cc16' : '#fff', fontSize: '28px' }} />
        }
      </Tooltip>

      <Tooltip
        arrow
        onClick={() => setShowRating(!showRating)}
        title={isAuthenticated ? "Rate movie" : "Login to rate movie"}
      >
        <StarRateIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: rated?.value ? '#fbbf24' : '#fff', fontSize: '28px' }} />
      </Tooltip>

      {showRating && (
        <div className='bg-white px-4 flex items-center rounded-md'>
          <Rating
            precision={0.5}
            name="movie-rating"
            value={rating}
            onChange={(e, newValue) => handleMovieRating(newValue)}
          />
        </div>
      )}
    </div>
  )
}