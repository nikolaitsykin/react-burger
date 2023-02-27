import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";
import { useForm } from "../../../hooks/useForm";
import { ILocationState } from "../../../models/models";
import { RootState } from "../../../store";
import {
  useGetUserQuery,
  useLoginMutation,
  useRefreshTokenMutation,
} from "../../../store/api";
import {
  _FORGOT_PASSWORD_PATH,
  _REGISTER_PATH,
  _ROOT_PATH,
} from "../../../utils/constants";
import { getCookie, setCookie } from "../../../utils/cookie";
import classes from "./login.module.css";

export default function LoginPage() {
  const location = useLocation<ILocationState>();
  const { isAuth } = useAppSelector((state: RootState) => state.auth);

  const [login] = useLoginMutation();
  const { setUser, loginSuccess, refreshUser } = useActions();
  const token = document.cookie ? getCookie("token") : "";
  const refreshToken = document.cookie ? getCookie("refreshToken") : "";
  const {
    isSuccess: isGetUserSuccess,
    isError: isGetUserError,
    data: userData,
  } = useGetUserQuery(token);
  const [
    refreshTokenPost,
    {
      isLoading: isRefreshLoading,
      isSuccess: isRefreshSuccess,
      data: refreshData,
    },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    isGetUserSuccess && loginSuccess();
    isGetUserSuccess && refreshUser(userData);
    if (!isRefreshLoading && isGetUserError && refreshToken) {
      refreshTokenPost(refreshToken);
      if (isRefreshSuccess && refreshData) {
        let authToken;
        if (refreshData.accessToken) {
          authToken = refreshData.accessToken.split("Bearer ")[1];
        }
        if (authToken) {
          setCookie("token", authToken);
          setCookie("refreshToken", refreshData.refreshToken);
        }
      }
    }
  });

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login(values)
      .unwrap()
      .then((res) => {
        if (res) {
          let accessToken;
          if (res.accessToken) {
            if (res.accessToken.indexOf("Bearer") === 0)
              accessToken = res.accessToken.split("Bearer ")[1];
            else accessToken = res.accessToken;
          }
          setUser({ ...res.user, password: values.password });
          setCookie("refreshToken", res.refreshToken);
          setCookie("token", accessToken);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!isAuth) {
    return (
      <form className={classes.login_container} onSubmit={handleLogin}>
        <p className="text text_type_main-medium mb-6">Log In</p>
        <EmailInput
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
          extraClass="mb-6"
          autoComplete="username"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password || ""}
          placeholder="Password"
          name={"password"}
          extraClass="mb-6"
          autoComplete="current-password"
        />
        <Button type="primary" htmlType="submit" extraClass="mb-20">
          Enter
        </Button>
        <p className="text text_type_main-default mb-4">
          Don't have an account? <Link to={_REGISTER_PATH}>Sign Up</Link>
        </p>
        <p className="text text_type_main-default">
          Forgot you password?{" "}
          <Link to={_FORGOT_PASSWORD_PATH}>Recover password</Link>
        </p>
      </form>
    );
  } else return <Redirect to={location?.state?.from.pathname || _ROOT_PATH} />;
}
