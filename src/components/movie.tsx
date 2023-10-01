import { IMovie } from "@/interfaces"

export const Movie = ({ movie }: IMovie) => {
  return (
    <div className='border rounded-xl flex flex-col shadow-md cursor-pointer'>
      <img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} className='rounded-t-xl' />
      <div className='p-3 flex flex-col'>
        <span className='font-bold'>{movie.original_title}</span>
        <span className='text-gray-500'>{movie.release_date}</span>
      </div>
    </div>
  )
}