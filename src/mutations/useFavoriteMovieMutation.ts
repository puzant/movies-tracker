import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { setFavoriteMovie } from "@/api";
import { IFavoriteMoviePayload } from "@/interfaces";

const useFavoriteMovieMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: setFavoriteMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IFavoriteMoviePayload) => setFavoriteMovie(payload),
    onSuccess: (msg) => {
      toast(msg.status_message);
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  return {
    setFavoriteMutation,
    ...mutationState,
  };
};

export default useFavoriteMovieMutation;
