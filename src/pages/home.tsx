import React from 'react'
import { Link } from 'react-router-dom';

import useStore from '@/store'
import { sortingOptions } from '@/utils/constants'
import { useCustomQuery, usePaginatedQuery } from '@/queries';
import { getMovies, getAccountDetails } from '@/api';
import { IMovie, IGenre, ISortingOption } from '@/interfaces';
import { Filters, Movie, LoadingSpinner } from '@/components';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const Home = () => {
  const [startDate, setStartDate] = React.useState<Date | null>(null)
  const [endDate, setEndDate] = React.useState<Date | null>(null)
  const [selectedOption, setSelectedOption] = React.useState<ISortingOption>(sortingOptions[0])
  const [selectedGenres, setSelectedGenres] = React.useState<IGenre[]>([])

  const { isAuthenticated, sessionId } = useStore()

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
    startDate,
    endDate
  );

  const { data: accountData } = useCustomQuery(
    getAccountDetails,
    'userAccount',
    sessionId,
    {
      enabled: isAuthenticated,
      onSuccess: (data) => {
        useStore.setState({ accountId: data.data.id });
      }
    }
  )

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
          selectedGenres={selectedGenres}
          selectedOption={selectedOption}
          onSortSelection={(e: Event) => setSelectedOption(e)}
          onGenreSelection={handleGenreSelection}
        >
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { size: 'small' } }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />

          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { size: 'small' } }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
        </Filters>

        <div className='w-full md:w-4/5'>
          {isLoading ? <div className='flex justify-center'><LoadingSpinner /></div> :
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>
              {moviesData.pages.map((page: { data: { results: IMovie[] } }) => (
                page.data.results.map((movie: IMovie) => (
                  <Link key={movie.id} to={`/movie/${movie.id}`}>
                    <Movie movie={movie} />
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