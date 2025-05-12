import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IWatchListPayload } from "@/interfaces";
import apiManager from "@/apiManager";

const useMovieWatchListMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: setMovieWatchListMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IWatchListPayload) => apiManager.setMovieInWatchList.func(payload),
    onSuccess: (msg) => {
      toast(msg.status_message);
      queryClient.invalidateQueries({ queryKey: [apiManager.setMovieInWatchList.key] });
    },
  });

  return {
    setMovieWatchListMutation,
    ...mutationState,
  };
};

export default useMovieWatchListMutation;
