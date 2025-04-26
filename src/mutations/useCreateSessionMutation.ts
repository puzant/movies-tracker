import { createSession } from "@/api";
import { useMutation } from "@tanstack/react-query";

const useCreateSessionMutation = () => {
  const { mutateAsync, ...mutationState } = useMutation({
    mutationFn: (payload: { requestToken: string }) => createSession(payload),
  });

  return {
    mutateAsync,
    ...mutationState,
  };
};

export default useCreateSessionMutation;
