import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setFavoriteMovie } from "@/api";
import { IFavoriteMoviePayload } from "@/interfaces";

const useFavoriteMovieMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: setFavoriteMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IFavoriteMoviePayload) => setFavoriteMovie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  return {
    setFavoriteMutation,
    ...mutationState,
  };
};

export default useFavoriteMovieMutation;
