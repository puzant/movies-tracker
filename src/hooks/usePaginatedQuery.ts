import { useInfiniteQuery } from "@tanstack/react-query";

interface IPage {
  page: number;
  total_pages: number;
}

const useInfiniteMovieQuery = (queryKey: any, queryFn: any) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage: IPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export default useInfiniteMovieQuery;
