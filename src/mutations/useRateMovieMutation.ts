import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { rateMovie } from "@/api";
import { IRatingPayload } from "@/interfaces";

const useRateMovieMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: rateMovieMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IRatingPayload) => rateMovie(payload),
    onSuccess: (msg) => {
      toast(msg.status_message);
      queryClient.invalidateQueries({ queryKey: ["movieDetails"] });
    },
  });

  return {
    rateMovieMutation,
    ...mutationState,
  };
};

export default useRateMovieMutation;
