import { createSession } from "@/api";
import { useMutation } from "@tanstack/react-query";

const useCreateSessionMutation = () => {
  const { mutateAsync, ...mutationState } = useMutation({
    mutationFn: (payload: any) => createSession(payload),
  });

  return {
    mutateAsync,
    ...mutationState,
  };
};

export default useCreateSessionMutation;
