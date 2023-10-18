import React from 'react';
import useStore from '@/store'
import { useCustomMutation } from '@/mutations';
import { setFavoriteMovie, setMovieInWatchList, rateMovie, deleteMovieRating } from '@/api'

import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarRateIcon from '@mui/icons-material/StarRate';
import { CircularProgress } from '@mui/material';

export const MovieToolbar = ({ movieDetails }) => {
  const { favorite, watchlist, rated } = movieDetails.account_states || {}
  const { sessionId, accountId, isAuthenticated } = useStore()

  const [accountStatus, setAccountStatus] = React.useState({
    isFavorite: '',
    isInWatchlist: '',
    isRated: '',
  })

  React.useEffect(() => {
    setAccountStatus({
      isFavorite: favorite,
      isInWatchlist: watchlist,
      isRated: rated,
    })
  }, [])

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
    if (!isAuthenticated) return

    const setFavoriteResponse = await setFavorietMovieMutation({
      accountId,
      sessionId,
      id: movieDetails.id,
      favorite: !accountStatus.isFavorite
    })
  }

  const handleSetMovieToWatchList = async () => {
    if (!isAuthenticated) return

    const setMovieToWatchListResponse = await setMovieWatchListMutation({
      accountId,
      sessionId,
      id: movieDetails.id,
      isInWatchlist: !accountStatus.isInWatchlist
    })
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
        {addingFavoriteLoading ?
          <div className='bg-[#0277bd] rounded-full w-[48px] h-[48px] flex justify-center items-center'>
            <CircularProgress sx={{ color: "#fff" }} size={30} />
          </div>
          :
          <FavoriteIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: accountStatus.isFavorite ? '#b91c1c' : '#fff', fontSize: '28px' }} />
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
          <BookmarkIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: accountStatus.isInWatchlist ? '#84cc16' : '#fff', fontSize: '28px' }} />
        }
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