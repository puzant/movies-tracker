import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IRatingPayload } from "@/interfaces";
import apiManager from "@/apiManager";

const useRateMovieMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: rateMovieMutation, ...mutationState } = useMutation({
    mutationFn: (payload: IRatingPayload) => apiManager.rateMovie.func(payload),
    onSuccess: (msg) => {
      toast(msg.status_message);
      queryClient.invalidateQueries({ queryKey: [apiManager.rateMovie.key] });
    },
  });

  return {
    rateMovieMutation,
    ...mutationState,
  };
};

export default useRateMovieMutation;
