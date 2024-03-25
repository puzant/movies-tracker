import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IWatchListPayload } from "@/interfaces";
import { setMovieInWatchList } from "@/api";

const useMovieWatchListMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: setMovieWatchListMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IWatchListPayload) => setMovieInWatchList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  return {
    setMovieWatchListMutation,
    ...mutationState,
  };
};

export default useMovieWatchListMutation;
