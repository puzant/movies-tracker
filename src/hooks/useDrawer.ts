import { useTranslation } from "react-i18next";
import useUserStore from "@/store/useUserStore";
import useMovieStore from "@/store/useMovieStore";
import useDeleteSessionMutation from "@/mutations/useDeleteSessionMutation";

const useDrawer = () => {
  const { i18n, t } = useTranslation();
  const { resetMovieStatus } = useMovieStore();
  const { resetState, isAuthenticated, sessionId } = useUserStore();
  const { deleteSessionMutation } = useDeleteSessionMutation();

  return {
    i18n,
    t,
    resetMovieStatus,
    resetState,
    isAuthenticated,
    sessionId,
    deleteSessionMutation,
  };
};

export default useDrawer;
