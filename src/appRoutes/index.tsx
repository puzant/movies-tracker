import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import withApiFunctions from "@/HOC/withApiFunctions";
import { PrivateRoutes } from "./privateRoute";

const Home = lazy(() => import("@/pages/home/home"));
const Login = lazy(() => import("@/pages/login/login"));
const MovieDetails = lazy(() => import("@/pages/movieDetails/movieDetails"));
const UpcomingMovies = lazy(() => import("@/pages/upcomingMovies/upcomingMovies"));
const SearchResults = lazy(() => import("@/pages/searchResults/searchResults"));
const FullCastCrew = lazy(() => import("@/pages/fullCastCrew/fullCastCrew"));
const Profile = lazy(() => import("@/pages/profile/profile"));
const Reviews = lazy(() => import("@/pages/reviews/reviews"));

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
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfileWithApi />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
