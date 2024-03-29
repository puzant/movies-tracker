import { useQuery } from "@tanstack/react-query";
import { IApiFunction } from "@/interfaces";

const useMovieDetailsQuery = (
  apiFunctions: IApiFunction,
  movieId: string | undefined,
  i18n: any,
  sessionId: string
) => {
  return useQuery({
    queryKey: [apiFunctions.getMovie.key, movieId, i18n.language],
    queryFn: () => apiFunctions.getMovie.func(movieId, sessionId, i18n.language),
  });
};

export default useMovieDetailsQuery;
