import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarRateIcon from '@mui/icons-material/StarRate';

export const MovieToolbar = () => {
  return (
    <div className="flex justify-center sm:justify-start gap-4 mt-4">
      <Tooltip title="Favorite">
        <FavoriteIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: '#fff', fontSize: '28px' }} />
      </Tooltip>

      <Tooltip title="Watch List">
        <BookmarkIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: '#fff', fontSize: '28px' }} />
      </Tooltip>

      <Tooltip title="Rate Movie">
        <StarRateIcon sx={{ background: '#0277bd', borderRadius: '50%', padding: '12px', width: '48px', height: '48px', color: '#fff', fontSize: '28px' }} />
      </Tooltip>
    </div>
  )
}