import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getRequestToken } from "@/api";

const useRequestTokenQuery = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["requestToken"],
    queryFn: () => getRequestToken(),
  });
};

export default useRequestTokenQuery;
