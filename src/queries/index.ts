import { useQuery, useInfiniteQuery } from 'react-query';

export const useCustomQuery = (queryFunc, ...params) => {
  const [, ...restParams] = params;

  return useQuery([params], () => queryFunc(...restParams));
};

export const usePaginatedQuery = (queryFunc, key, id) => {
  return useInfiniteQuery([key, id], ({ pageParam = 1 }) => queryFunc(id, pageParam), {
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.pageNumber < lastPage.pagination.total_pages) {
        return lastPage.pagination.pageNumber + 1;
      }
      return undefined;
    },
  });
};