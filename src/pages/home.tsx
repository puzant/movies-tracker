import { useQuery } from 'react-query';
import { Filters } from '@/components';
import { getMovies } from '@/api';

export const Home = () => {
  const { data: moviesData, isLoading } = useQuery('movies', getMovies)

  return (
    <div className='mt-8'>
      <div className='px-8'>
        <span className='text-2xl font-semibold'>Popular Movies</span>
      </div>

      <div className='flex gap-6 px-8 py-4'>
        <Filters />

        <div className='w-[80%]'>
          {isLoading ? 'loading' :
            <div className='grid grid-cols-2 sm:grid-cols-5 gap-7'>
              {moviesData?.data.results.map(movie => (
                <div className='border rounded-xl flex flex-col shadow-md cursor-pointer'>
                  <img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} className='rounded-t-xl' />
                  <div className='p-3 flex flex-col'>
                    <span className='font-bold'>{movie.original_title}</span>
                    <span className='text-gray-500'>{movie.release_date}</span>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}