import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IWatchListPayload } from "@/interfaces";
import { setMovieInWatchList } from "@/api";

const useMovieWatchListMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: setMovieWatchListMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IWatchListPayload) => setMovieInWatchList(payload),
    onSuccess: (msg) => {
      toast(msg.status_message);
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  return {
    setMovieWatchListMutation,
    ...mutationState,
  };
};

export default useMovieWatchListMutation;
