import { useQuery, useInfiniteQuery } from 'react-query';

export const useCustomQuery = (queryFunc, ...params) => {
  console.log("🚀 ~ file: index.ts:4 ~ useCustomQuery ~ params:", params)
  const [, ...restParams] = params;

  return useQuery([params], () => queryFunc(...restParams));
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