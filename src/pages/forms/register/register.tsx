import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";
import { ILocationState } from "../../../models/models";
import { useLazyGetUserQuery, useRegisterMutation } from "../../../store/api";
import { _LOGIN_PATH, _ROOT_PATH } from "../../../utils/constants";
import { getCookie } from "../../../utils/cookie";
import classes from "./register.module.css";

export default function RegisterPage() {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { loginSuccess, refreshUser } = useActions();
  const token = document.cookie ? getCookie("token") : "";
  const [
    getUser,
    { isSuccess: isGetUserSuccess, isError: isGetUserError, data: userData },
  ] = useLazyGetUserQuery();

  useEffect(() => {
    if (!isGetUserError) {
      getUser(token);
      if (isGetUserSuccess) {
        loginSuccess();
        refreshUser(userData);
      }
    }
  }, [
    getUser,
    isGetUserSuccess,
    isGetUserError,
    loginSuccess,
    refreshUser,
    token,
    userData,
  ]);

  const [registerPost] = useRegisterMutation();

  const [state, setState] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const value = target.value;
    const { name } = target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const register = (e: FormEvent) => {
    e.preventDefault();
    registerPost(state)
      .then(() => history.replace(_LOGIN_PATH))
      .catch((res) => console.log(res));
  };

  if (!isAuth) {
    return (
      <form
        className={classes.register_container}
        onSubmit={(e) => register(e)}
      >
        <p className="text text_type_main-medium mb-6">Register</p>
        <Input
          type={"text"}
          placeholder={"Name"}
          onChange={(e) => onChange(e)}
          value={state.name}
          name={"name"}
          error={false}
          errorText={"Error"}
          size={"default"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={(e) => onChange(e)}
          value={state.email}
          name={"email"}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => onChange(e)}
          value={state.password}
          placeholder={"Password"}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass="mb-20"
        >
          Sign Up
        </Button>
        <p className="text text_type_main-default mb-4">
          Already registred? <Link to={_LOGIN_PATH}>Log In</Link>
        </p>
      </form>
    );
  } else return <Redirect to={location?.state?.from.pathname || _ROOT_PATH} />;
}
