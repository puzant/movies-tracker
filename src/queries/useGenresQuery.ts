import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/api";

const useGenresQuery = (language: string) => {
  return useQuery({
    queryKey: ["genres", language],
    queryFn: () => getGenres(language),
  });
};

export default useGenresQuery;
