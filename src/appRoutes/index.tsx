import { Routes, Route } from 'react-router-dom';
import { Home, Login, MovieDetails, UpcomingMovies, SearchResults } from '@/pages';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upcoming" element={<UpcomingMovies />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/movie/:movieId" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes