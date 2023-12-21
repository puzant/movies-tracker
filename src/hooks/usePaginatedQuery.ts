import { useInfiniteQuery } from "@tanstack/react-query";

interface IPage {
  data: {
    page: number 
    total_pages: number
  }
}

const useInfiniteMovieQuery = (queryKey: any, queryFn: any) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage: IPage) => {
      if (lastPage.data.page < lastPage.data.total_pages) {
        return lastPage.data.page + 1;
      }
      return undefined;
    },
  }) 
}

export default useInfiniteMovieQuery