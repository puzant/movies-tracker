import Rating from '@mui/material/Rating';

export const MovieRating = ({ vote }: { vote: number }) => {
  return (
    <Rating name="read-only" value={vote / 2} precision={0.5} readOnly />
  )
}