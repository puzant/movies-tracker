import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IApiFunction, IMovie, IAccount } from "@/interfaces";

const useAccountDataQuery = (apiFunctions: any, sessionId: string): UseQueryResult<IAccount> => {
  return useQuery<IAccount>({
    queryKey: [apiFunctions.getAccountDetails.key, sessionId],
    queryFn: () => apiFunctions.getAccountDetails.func(sessionId),
  });
};

export default useAccountDataQuery;
