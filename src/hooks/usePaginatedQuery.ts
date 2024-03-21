import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteMovieQuery = (queryKey: any, queryFn: any) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export default useInfiniteMovieQuery;
