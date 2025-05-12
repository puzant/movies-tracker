import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";

import useUserStore from "@/store/useUserStore";
import { IApiFunction } from "@/interfaces";

interface ILoginPayload {
  username: string;
  password: string;
  requestToken?: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("Username field is required"),
  password: yup.string().required("Password field is required"),
});

const useLogin = (apiFunctions: IApiFunction) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { accentColor } = useUserStore();

  const { data: requestToken } = useQuery({
    queryKey: [apiFunctions.getRequestToken.key],
    queryFn: () => apiFunctions.getRequestToken.func(),
  });

  const {
    mutateAsync: loginMutation,
    isPending: loginLoading,
    error,
  } = useMutation({
    mutationFn: (payload: ILoginPayload) => apiFunctions.login.func(payload),
  });

  const { mutateAsync: createSessionMutation } = useMutation({
    mutationFn: (payload: { requestToken: string }) => apiFunctions.createSession.func(payload),
  });

  const handleLogin = async (payload: ILoginPayload) => {
    try {
      const loginResponse = await loginMutation({
        username: payload.username,
        password: payload.password,
        requestToken: requestToken?.request_token ?? "",
      });

      if (!loginResponse.success) return;

      const createSessionResponse = await createSessionMutation({
        requestToken: loginResponse.request_token,
      });

      useUserStore.setState({
        sessionId: createSessionResponse.session_id,
      });

      useUserStore.setState({ isAuthenticated: true });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return {
    loginLoading,
    error,
    createSessionMutation,
    loginSchema,
    t,
    navigate,
    handleLogin,
    accentColor,
  };
};

export default useLogin;
