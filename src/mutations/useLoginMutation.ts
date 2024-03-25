import { login } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface ILoginPayload {
  username: string;
  password: string;
  requestToken: string;
}

const useLoginMutation = () => {
  const { mutateAsync, ...mutationState } = useMutation({
    mutationFn: (payload: ILoginPayload) => login(payload),
  });

  return {
    mutateAsync,
    ...mutationState,
  };
};

export default useLoginMutation;
