import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import useUserStore from "@/store/useUserStore";
import { getRequestToken, login, createSession } from "@/api";

import { CircularProgress } from "@mui/material";

interface ILoginPayload {
  username: string;
  password: string;
  requestToken: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("Username field is required"),
  password: yup.string().required("Password field is required"),
});

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: requestToken } = useQuery({
    queryKey: ["requestQuery"],
    queryFn: getRequestToken,
  });

  const {
    mutateAsync: loginMutation,
    isPending: loginLoading,
    error,
  } = useMutation({
    mutationFn: (payload: ILoginPayload) => login(payload),
  });

  const { mutateAsync: createSessionMutation } = useMutation({
    mutationFn: (payload: any) => createSession(payload),
  });

  const handleLogin = async (payload: ILoginPayload) => {
    try {
      const loginResponse = await loginMutation({
        username: payload.username,
        password: payload.password,
        requestToken: requestToken?.data.request_token,
      });

      if (!loginResponse.data.success) return;

      const createSessionResponse = await createSessionMutation({
        requestToken: loginResponse.data.request_token,
      });

      useUserStore.setState({
        sessionId: createSessionResponse.data.session_id,
      });

      useUserStore.setState({ isAuthenticated: true });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="px-12 mt-10 w-full md:w-[90%] lg:w-[70%] m-auto">
      <div className="text-2xl">{t("login_to_account")}</div>
      <div className="mt-1">{t("app_disclaimer")}</div>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values: any) => {
          handleLogin(values);
        }}
      >
        {() => (
          <Form>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <span>{t("username")}</span>
                <Field
                  name="username"
                  className="border border-gray-400 w-full p-2 rounded-md focus:outline-none"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  render={(msg) => (
                    <div className="text-red-500 font-semibold">{msg}</div>
                  )}
                />
              </div>

              <div>
                <span>{t("password")}</span>
                <Field
                  name="password"
                  type="password"
                  className="border border-gray-400 w-full p-2 rounded-md focus:outline-none"
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                render={(msg) => (
                  <div className="text-red-500 font-semibold">{msg}</div>
                )}
              />
            </div>

            <button
              type="submit"
              className="rounded-md px-4 py-2 mt-4 bg-blue-400 text-white w-fit"
            >
              {loginLoading ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                t("login")
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
