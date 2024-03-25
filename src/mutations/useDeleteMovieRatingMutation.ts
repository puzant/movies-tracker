import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovieRating } from "@/api";
import { IDeleteRatingPayload } from "@/interfaces";

const useDeleteMovieRatingMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRatingMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IDeleteRatingPayload) => deleteMovieRating(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  return {
    deleteRatingMutation,
    ...mutationState,
  };
};

export default useDeleteMovieRatingMutation;
