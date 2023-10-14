import React from 'react';
import useStore from '@/store'
import { useCustomMutation } from '@/mutations';
import { setFavoriteMovie, setMovieInWatchList, rateMovie, deleteMovieRating } from '@/api'

import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarRateIcon from '@mui/icons-material/StarRate';

export const MovieToolbar = ({ movieDetails }) => {
  const { favorite, watchlist, rated } = movieDetails.account_states
  const isAuthenticated = useStore(state => state.isAuthenticated)

  const [accountStatus, setAccountStatus] = React.useState({
    isFavorite: favorite,
    isInWatchList: watchlist,
    isRated: rated,
  })

  const {
    mutateAsync: setFavorietMovieMutation,
    isLoading: addingFavoriteLoading
  } = useCustomMutation(setFavoriteMovie, 'movieDetails')

  const {
    mutateAsync: setMovieWatchListMutation,
    isLoading: addingWatchListLoading
  } = useCustomMutation(setMovieInWatchList, 'movieDetails')

  const {
    mutateAsync: rateMovieMutation,
    isLoading: rateingLoading
  } = useCustomMutation(rateMovie, 'movieDetails')

  const {
    mutateAsync: deleteRatingMutation,
    isLoading: deleteRatingLoading
  } = useCustomMutation(deleteMovieRating, 'movieDetails')

  const handleSetMovieToFavorite = async () => {
    const setFavoriteResponse = await setFavorietMovieMutation({ id: movieDetails.id, favorite: !accountStatus.isFavorite })
  }

  const handleSetMovieToWatchList = async () => {
    const setMovieToWatchListResponse = await setMovieWatchListMutation()
  }


  const handleRateMovie = async () => {
    const rateMovieResponse = await rateMovieMutation()
  }

  return (
    <div className="flex justify-center sm:justify-start gap-4 mt-4">
      <Tooltip
        arrow
        onClick={handleSetMovieToFavorite}
        title={isAuthenticated ? "Add movie to your favorite list" : "Login to add movie to your favorite list"}
      >
        <FavoriteIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: accountStatus.isFavorite ? '#b91c1c' : '#fff', fontSize: '28px' }} />
      </Tooltip>

      <Tooltip
        arrow
        title={isAuthenticated ? "Add movie to your watch list" : "Login to add movie to your watch list"}
      >
        <BookmarkIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: accountStatus.isInWatchList ? '#84cc16' : '#fff', fontSize: '28px' }} />
      </Tooltip>

      <Tooltip
        arrow
        title={isAuthenticated ? "Rate movie" : "Login to rate movie"}
      >
        <StarRateIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: accountStatus.isRated ? '#fbbf24' : '#fff', fontSize: '28px' }} />
      </Tooltip>
    </div>
  )
}