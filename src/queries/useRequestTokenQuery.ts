import { useQuery } from "@tanstack/react-query";
import { getRequestToken } from "@/api";

const useRequestTokenQuery = () => {
  return useQuery({
    queryKey: ["requestToken"],
    queryFn: () => getRequestToken(),
  });
};

export default useRequestTokenQuery;
