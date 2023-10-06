import React from "react"
import { Link } from "react-router-dom"

import { usePaginatedQuery } from "@/queries"
import { getUpcomingMovies } from '@/api'
import { IMovie } from "@/interfaces"
import { Movie, LoadingSpinner } from "@/components"

export const UpcomingMovies = () => {
  const {
    data: upcomingMoviesData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } =
    usePaginatedQuery(getUpcomingMovies, 'upcomingMovies')

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 100
    ) {
      if (!isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {isLoading ? <div className="flex justify-center mt-12"><LoadingSpinner /></div> :
        <div className='w-full sm:w-[80%] px-4 sm:px-8 py-4 m-auto'>
          {isLoading ? <div className='flex justify-center'><LoadingSpinner /></div> :
            <div className='grid grid-cols-2 sm:grid-cols-5 gap-7'>
              {
                upcomingMoviesData.pages.map(page => (
                  page.data.results.map((movie: IMovie) => (
                    <Link to={`/movie/${movie.id}`}>
                      <Movie key={movie.id} movie={movie} />
                    </Link>
                  ))
                ))
              }
            </div>
          }

          {isFetchingNextPage && (
            <div className='mt-2 flex justify-center'>
              <LoadingSpinner />
            </div>
          )}
        </div>
      }
    </div>
  )
}