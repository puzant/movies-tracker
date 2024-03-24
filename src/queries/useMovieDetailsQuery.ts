import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IApiFunction, IMovie } from "@/interfaces";

const useMovieDetailsQuery = (
  apiFunctions: any,
  movieId: string | undefined,
  i18n: any,
  sessionId: string
): UseQueryResult<IMovie> => {
  return useQuery<IMovie>({
    queryKey: [apiFunctions.getMovie.key, movieId, i18n.language],
    queryFn: () => apiFunctions.getMovie.func(movieId, sessionId, i18n.language),
  });
};

export default useMovieDetailsQuery;
