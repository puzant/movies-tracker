import { ISortingOption, IMovie, IGenre } from '@/interfaces';

export const sortingOptions: ISortingOption[] = [
  { id: 1, key: 'popularity.desc', name: 'Popularity Descending' },
  { id: 2, key: 'popularity.asc', name: 'Popularity Ascending' },
  { id: 3, key: 'vote_average.desc', name: 'Rating Descending' },
  { id: 4, key: 'vote_average.asc', name: 'Rating Ascending' },
  { id: 5, key: 'primary_release_date.desc', name: 'Release Date Descending' },
  { id: 6, key: 'primary_release_date.asc', name: 'Release Date Ascending' },
];