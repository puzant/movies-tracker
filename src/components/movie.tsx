import moment from 'moment'
import { IMovie } from "@/interfaces"
import { MovieRating } from '@/components'

import moviePlacegolder from '@/assets/poster-placeholder.svg'

export const Movie = ({ movie }: IMovie) => {
  const getMoviePoster = () => {
    if (movie.poster_path)
      return `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
    return moviePlacegolder
  }

  return (
    <div className='h-full border rounded-xl flex flex-col shadow-md cursor-pointer'>
      <img src={getMoviePoster()} className='bg-[#dbdbdb] rounded-t-xl' />
      <div className='p-3 flex flex-col'>
        <span className='font-bold'>{movie.original_title}</span>
        <span className='text-gray-500'>{moment(movie.release_date).format("MMM D, YYYY")}</span>
        <MovieRating vote={movie.vote_average} />
      </div>
    </div>
  )
}