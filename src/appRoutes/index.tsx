import { Routes, Route } from 'react-router-dom';
import { Home, MovieDetails, Login } from '@/pages';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:movieId" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes