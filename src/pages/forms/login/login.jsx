import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";
import { useForm } from "../../../hooks/useForm";
import {
  useGetUserQuery,
  useLoginMutation,
  useRefreshTokenMutation,
} from "../../../store/api";
import { getCookie, setCookie } from "../../../utils/cookie";
import {
  _FORGOT_PASSWORD_PATH,
  _REGISTER_PATH,
  _ROOT_PATH,
} from "../../../utils/constants";
import classes from "./login.module.css";

const LoginPage = () => {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);

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
    { isError: isRefreshError, isLoading: isRefreshLoading },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    isGetUserSuccess && loginSuccess();
    isGetUserSuccess && refreshUser(userData);
    if (!isRefreshError && !isRefreshLoading && isGetUserError) {
      refreshTokenPost(refreshToken)
        .then((res) => {
          const authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
            setCookie("refreshToken", res.refreshToken);
          }
          refreshUser(res);
        })
        .catch(() => {});
    }
  });

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login(values)
      .unwrap()
      .then((res) => {
        let accessToken;
        if (res.accessToken.indexOf("Bearer") === 0)
          accessToken = res.accessToken.split("Bearer ")[1];
        else accessToken = res.accessToken;
        setUser({ ...res.user, password: values.password });
        setCookie("refreshToken", res.refreshToken);
        setCookie("token", accessToken);
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
  }
  return <Redirect to={location?.state?.from.pathname || _ROOT_PATH} />;
};

export default LoginPage;
