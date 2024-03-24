import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getGenres } from "@/api";
import { IGenre } from "@/interfaces";

const useGenresQuery = (language: string): UseQueryResult<IGenre[]> => {
  return useQuery<IGenre[]>({
    queryKey: ["genres", language],
    queryFn: () => getGenres(language),
  });
};

export default useGenresQuery;
