import React from 'react'
import { Link } from 'react-router-dom';

import { useCustomQuery, usePaginatedQuery } from '@/queries';
import { getMovies, getGenres, getAccountDetails } from '@/api';
import { IMovie, IGenre, ISortingOption } from '@/interfaces';
import { sortingOptions } from '@/utils/constants'
import { Filters, Movie, LoadingSpinner } from '@/components';

export const Home = () => {
  const sessionId = localStorage.getItem('sessionId')
  const [selectedOption, setSelectedOption] = React.useState<ISortingOption>(sortingOptions[0])
  const [selectedGenres, setSelectedGenres] = React.useState<IGenre[]>([])

  const { data: genresData } = useCustomQuery(getGenres, 'genres')

  const {
    data: moviesData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = usePaginatedQuery(
    getMovies,
    'movies',
    selectedOption,
    selectedGenres,
  );

  const { data: accountData } = useCustomQuery(
    getAccountDetails,
    'userAccount',
    sessionId,
    { enabled: sessionId }
  )

  const { genres } = genresData?.data || {}

  const handleGenreSelection = (genre: IGenre): void => {
    if (selectedGenres.includes(genre))
      setSelectedGenres(selectedGenres.filter(selectedGenre => selectedGenre.id !== genre.id))
    else
      setSelectedGenres([...selectedGenres, genre])
  }

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
    <div className='mt-8'>
      <div className='px-4 sm:px-8'>
        <span className='text-2xl font-semibold'>Popular Movies</span>
      </div>

      <div className='flex gap-6 px-4 sm:px-8 py-4'>
        <Filters
          genres={genres}
          selectedGenres={selectedGenres}
          sortingOptions={sortingOptions}
          selectedOption={selectedOption}
          onChange={(e: Event) => setSelectedOption(e)}
          onGenreSelection={handleGenreSelection}
        />

        <div className='w-full md:w-4/5'>
          {isLoading ? <div className='flex justify-center'><LoadingSpinner /></div> :
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>
              {
                moviesData.pages.map(page => (
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
    </div >
  )
}