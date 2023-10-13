
import useStore from '@/store'
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarRateIcon from '@mui/icons-material/StarRate';

export const MovieToolbar = () => {
  const isAuthenticated = useStore(state => state.isAuthenticated)

  return (
    <div className="flex justify-center sm:justify-start gap-4 mt-4">
      <Tooltip title={isAuthenticated ? "Add movie to your favorite list" : "Login to add movie to your favorite list"}>
        <FavoriteIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: '#fff', fontSize: '28px' }} />
      </Tooltip>

      <Tooltip title={isAuthenticated ? "Add movie to your watch list" : "Login to add movie to your watch list"}>
        <BookmarkIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: '#fff', fontSize: '28px' }} />
      </Tooltip>

      <Tooltip title={isAuthenticated ? "Rate movie" : "Login to rate movie"}>
        <StarRateIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: '#fff', fontSize: '28px' }} />
      </Tooltip>
    </div>
  )
}