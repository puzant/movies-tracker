import { useQuery, useInfiniteQuery } from 'react-query';

export const useCustomQuery = (queryFunc, ...params) => {
  const [, ...restParams] = params;

  return useQuery([params], () => queryFunc(...restParams), restParams.at(-1));
};

export const usePaginatedQuery = (queryFunc, ...params) => {
  const [, ...restParams] = params;

  return useInfiniteQuery([params], ({ pageParam = 1 }) => queryFunc(...restParams, pageParam), {
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.total_pages) {
        return lastPage.data.page + 1;
      }
      return undefined;
    },
  });
};