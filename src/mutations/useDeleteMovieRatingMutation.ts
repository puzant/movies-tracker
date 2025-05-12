import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IDeleteRatingPayload } from "@/interfaces";
import apiManager from "@/apiManager";

const useDeleteMovieRatingMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRatingMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IDeleteRatingPayload) => apiManager.deleteMovieRating.func(payload),
    onSuccess: (msg) => {
      toast(msg.status_message);
      queryClient.invalidateQueries({ queryKey: [apiManager.deleteMovieRating.key] });
    },
  });

  return {
    deleteRatingMutation,
    ...mutationState,
  };
};

export default useDeleteMovieRatingMutation;
