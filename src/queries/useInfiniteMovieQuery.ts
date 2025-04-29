import { IMovie } from "@/interfaces";
import { useInfiniteQuery, QueryKey } from "@tanstack/react-query";

type PaginatedMovieResponse = {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
};

const useInfiniteMovieQuery = (queryKey: QueryKey, queryFn: any) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedMovieResponse) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export default useInfiniteMovieQuery;
