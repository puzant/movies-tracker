import { AxiosError } from "axios";
import { Formik, Form, ErrorMessage } from "formik";

import useLogin from "@/hooks/useLogin";
import { Input, Button } from "@/components/atoms";
import { CircularProgress } from "@mui/material";
import { IApiFunction } from "@/interfaces";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = ({ apiFunctions }: { apiFunctions: IApiFunction }) => {
  const { loginLoading, error, loginSchema, t, handleLogin, accentColor } = useLogin(apiFunctions);

  return (
    <div className="px-12 mt-10 w-full md:w-[90%] lg:w-[70%] m-auto">
      <h1 className="text-2xl">{t("login_to_account")}</h1>
      <p className="mt-1">{t("app_disclaimer")}</p>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values: LoginFormValues) => {
          handleLogin(values);
        }}
      >
        {() => (
          <Form>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <p>{t("username")}</p>
                <Input name="username" />

                <ErrorMessage
                  name="username"
                  component="div"
                  render={(msg) => <div className="text-red-500 font-semibold">{msg}</div>}
                />
              </div>

              <div className="flex flex-col gap-2">
                <p>{t("password")}</p>
                <Input name="password" type="password" />

                <ErrorMessage
                  name="password"
                  component="div"
                  render={(msg) => <div className="text-red-500 font-semibold">{msg}</div>}
                />
              </div>
            </div>

            <Button style={{ background: accentColor }}>
              {loginLoading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : t("login")}
            </Button>

            {error && (
              <div className="text-red-500 mt-4">
                {error instanceof AxiosError && error.response?.data.status_message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
