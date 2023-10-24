import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Movie, LoadingSpinner } from '@/components';
import { searchMovies } from "@/api"
import { IMovie } from '@/interfaces'

export const SearchResults = () => {
  // const location = useLocation();
  // const searchQuery = new URLSearchParams(location.search).get('query');

  // const {
  //   data: SearchResults,
  //   isLoading,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage
  // } = usePaginatedQuery(
  //   searchMovies,
  //   'searchResults',
  //   searchQuery,
  // );

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop >=
  //     document.documentElement.scrollHeight - 100
  //   ) {
  //     if (!isFetchingNextPage && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   }
  // };

  // React.useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScroll]);

  return null
  return (
    <div className='px-4 sm:px-8 py-4'>
      <div className='w-full md:w-4/5 m-auto'>
        {isLoading ? <div className='flex justify-center'><LoadingSpinner /></div> :
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>
            {
              SearchResults.pages.map(page => (
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
    </div>
  )
}