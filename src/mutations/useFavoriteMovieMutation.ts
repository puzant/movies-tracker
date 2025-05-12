import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IFavoriteMoviePayload } from "@/interfaces";
import apiManager from "@/apiManager";

const useFavoriteMovieMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: setFavoriteMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IFavoriteMoviePayload) => apiManager.setFavoriteMovie.func(payload),
    onSuccess: (msg) => {
      toast(msg.status_message);
      queryClient.invalidateQueries({ queryKey: [apiManager.setFavoriteMovie.key] });
    },
  });

  return {
    setFavoriteMutation,
    ...mutationState,
  };
};

export default useFavoriteMovieMutation;
