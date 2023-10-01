import React from 'react'

import { useCustomQuery } from '@/queries';
import { getMovies, getGenres } from '@/api';
import { ISortingOption, IMovie, IGenre } from '@/interfaces';
import { Filters, Movie } from '@/components';

export const Home = () => {
  const sortingOptions: ISortingOption[] = [
    { id: 1, key: 'popularity.desc', name: 'Popularity Descending' },
    { id: 2, key: 'popularity.asc', name: 'Popularity Ascending' },
    { id: 3, key: 'vote_average.desc', name: 'Rating Descending' },
    { id: 4, key: 'vote_average.asc', name: 'Rating Ascending' },
    { id: 5, key: 'primary_release_date.desc', name: 'Release Date Descending' },
    { id: 6, key: 'primary_release_date.asc', name: 'Release Date Ascending' },
  ];

  const [selectedOption, setSelectedOption] = React.useState(sortingOptions[0])
  const [selectedGenres, setSelectedGenres] = React.useState([])

  const { data: genresData } = useCustomQuery(getGenres, 'genres')
  const { data: moviesData, isLoading } = useCustomQuery(getMovies, 'movies', selectedOption, selectedGenres)

  const { genres } = genresData?.data || {}

  const handleGenreSelection = (genre: IGenre) => {
    if (selectedGenres.includes(genre))
      setSelectedGenres(selectedGenres.filter(selectedGenre => selectedGenre.id !== genre.id))
    else
      setSelectedGenres([...selectedGenres, genre])
  }

  return (
    <div className='mt-8'>
      <div className='px-8'>
        <span className='text-2xl font-semibold'>Popular Movies</span>
      </div>

      <div className='flex gap-6 px-8 py-4'>
        <Filters
          genres={genres}
          selectedGenres={selectedGenres}
          sortingOptions={sortingOptions}
          selectedOption={selectedOption}
          onChange={(e) => setSelectedOption(e)}
          onGenreSelection={handleGenreSelection}
        />

        <div className='w-[80%]'>
          {isLoading ? 'loading' :
            <div className='grid grid-cols-2 sm:grid-cols-5 gap-7'>
              {moviesData?.data.results.map((movie: IMovie) => (
                <Movie key={movie.id} movie={movie} />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}