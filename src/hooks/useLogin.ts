import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useRequestTokenQuery from "@/queries/useRequestTokenQuery";
import useLoginMutation from "@/mutations/useLoginMutation";
import useCreateSessionMutation from "@/mutations/useCreateSessionMutation";

import useUserStore from "@/store/useUserStore";

interface ILoginPayload {
  username: string;
  password: string;
  requestToken: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("Username field is required"),
  password: yup.string().required("Password field is required"),
});

const useLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { accentColor } = useUserStore();
  const { data: requestToken } = useRequestTokenQuery();

  const { mutateAsync: loginMutation, isPending: loginLoading, error } = useLoginMutation();
  const { mutateAsync: createSessionMutation } = useCreateSessionMutation();

  const handleLogin = async (payload: ILoginPayload) => {
    try {
      const loginResponse = await loginMutation({
        username: payload.username,
        password: payload.password,
        requestToken: requestToken?.request_token,
      });

      console.log(loginResponse);

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
