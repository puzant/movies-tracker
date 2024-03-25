import { useMutation } from "@tanstack/react-query";
import { deleteSession } from "@/api";

import useUserStore from "@/store/useUserStore";
import useMovieStore from "@/store/useMovieStore";

const useDeleteSessionMutation = () => {
  const { resetMovieStatus } = useMovieStore();
  const { resetState } = useUserStore();

  const { mutateAsync: deleteSessionMutation } = useMutation({
    mutationFn: (payload: string) => deleteSession(payload),
    onSuccess: () => {
      resetState();
      resetMovieStatus();
      localStorage.clear();
    },
  });

  return { deleteSessionMutation };
};

export default useDeleteSessionMutation;
