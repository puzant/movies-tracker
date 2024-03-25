import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rateMovie } from "@/api";
import { IRatingPayload } from "@/interfaces";

const useRateMovieMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: rateMovieMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IRatingPayload) => rateMovie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  return {
    rateMovieMutation,
    ...mutationState,
  };
};

export default useRateMovieMutation;
