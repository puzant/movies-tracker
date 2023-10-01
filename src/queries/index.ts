import { useQuery, useInfiniteQuery } from 'react-query';

export const useCustomQuery = (queryFunc, ...params) => {
  const [key, ...restParams] = params;

  return useQuery([params], () => queryFunc(...restParams));
};
