import { Routes, Route } from 'react-router-dom';
import { Home, MovieDetails } from '@/pages';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:movieId" element={<MovieDetails />} />
    </Routes>
  )
}

export default AppRoutes