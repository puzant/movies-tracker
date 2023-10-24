import React from "react"
import { Link } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'

import { getUpcomingMovies } from '@/api'
import { IMovie } from "@/interfaces"
import { Movie, LoadingSpinner } from "@/components"

export const UpcomingMovies = () => {

  const { data: upcomingMoviesData, isLoading } = useQuery({
    queryKey: ['movieDetails'],
    queryFn: getUpcomingMovies
  })

  return (
    <div>
      <div className='w-full sm:w-[80%] px-4 sm:px-8 py-4 m-auto'>
        {isLoading ? <div className='flex justify-center'><LoadingSpinner /></div>
          :
          <div className='grid grid-cols-2 sm:grid-cols-5 gap-7'>
            {upcomingMoviesData.data.results.map((movie: IMovie) => (
              <Link to={`/movie/${movie.id}`}>
                <Movie key={movie.id} movie={movie} />
              </Link>
            ))}
          </div>
        }

      </div>
    </div>
  )
}