import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import classes from "./login.module.css";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { checkUser, login } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/api";
import { useForm} from "../../hooks/useForm";

const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const token = document.cookie ? getCookie("token") : "";

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, isAuth, token]);

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(values, history));
  };

  if (!isAuth) {
    return (
      <form
        className={classes.login_container}
        onSubmit={(e) => handleLogin(e)}
      >
        <p className="text text_type_main-medium mb-6">Log In</p>
        <EmailInput
          onChange={(e) => handleChange(e)}
          value={values.email || ""}
          name={"email"}
          extraClass="mb-6"
          autoComplete="username"
        />
        <PasswordInput
          onChange={(e) => handleChange(e)}
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
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        <p className="text text_type_main-default">
          Forgot you password?
          <Link to="/forgot-password">Recover password</Link>
        </p>
      </form>
    );
  } else {
    return <Redirect to={location?.state?.from.pathname || "/"} />;
  }
};

export default LoginPage;
