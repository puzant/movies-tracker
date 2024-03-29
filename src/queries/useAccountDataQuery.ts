import { useQuery } from "@tanstack/react-query";
import { IApiFunction } from "@/interfaces";

const useAccountDataQuery = (apiFunctions: IApiFunction, sessionId: string) => {
  return useQuery({
    queryKey: [apiFunctions.getAccountDetails.key, sessionId],
    queryFn: () => apiFunctions.getAccountDetails.func(sessionId),
  });
};

export default useAccountDataQuery;
