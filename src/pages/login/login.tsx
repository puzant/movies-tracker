import { AxiosError } from "axios";
import { Formik, Form, ErrorMessage } from "formik";

import useLogin from "@/hooks/useLogin";
import { Input, Button } from "@/components/atoms";
import { CircularProgress } from "@mui/material";

export const Login = () => {
  const { loginLoading, error, loginSchema, t, handleLogin } = useLogin();

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
                <Input name="username" />

                <ErrorMessage
                  name="username"
                  component="div"
                  render={(msg) => <div className="text-red-500 font-semibold">{msg}</div>}
                />
              </div>

              <div>
                <span>{t("password")}</span>
                <Input name="password" type="password" />

                <ErrorMessage
                  name="password"
                  component="div"
                  render={(msg) => <div className="text-red-500 font-semibold">{msg}</div>}
                />
              </div>
            </div>

            <Button>
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
