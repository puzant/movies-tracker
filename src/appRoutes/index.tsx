import { Routes, Route } from "react-router-dom";
import withApiFunctions from "@/HOC/withApiFunctions";

import {
  Home,
  Login,
  MovieDetails,
  UpcomingMovies,
  SearchResults,
  FullCastCrew,
  Profile,
  Reviews,
} from "@/pages";

const HomeWithApi = withApiFunctions(Home);
const UpcomingMoviesWithApi = withApiFunctions(UpcomingMovies);
const SearchResultsWithApi = withApiFunctions(SearchResults);
const MovieDetailsWithApi = withApiFunctions(MovieDetails);
const LoginWithApi = withApiFunctions(Login);
const ProfileWithApi = withApiFunctions(Profile);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeWithApi />} />
      <Route path="/upcoming" element={<UpcomingMoviesWithApi />} />
      <Route path="/search-results" element={<SearchResultsWithApi />} />
      <Route path="/movie/:movieId" element={<MovieDetailsWithApi />} />
      <Route path="/movie/:movieId/cast" element={<FullCastCrew />} />
      <Route path="/movie/:movieId/reviews" element={<Reviews />} />
      <Route path="/login" element={<LoginWithApi />} />
      <Route path="/profile" element={<ProfileWithApi />} />
    </Routes>
  );
};

export default AppRoutes;
