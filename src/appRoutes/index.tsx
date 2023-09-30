import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:movieId" element={<Home />} />
    </Routes>
  )
}

export default AppRoutes