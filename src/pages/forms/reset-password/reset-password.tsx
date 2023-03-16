import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FormEvent } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { useResetPasswordMutation } from "../../../services/store/api";
import { ILocationState } from "../../../services/types/locationTypes";
import { _FORGOT_PASSWORD_PATH, _LOGIN_PATH } from "../../../utils/constants";
import classes from "./reset-password.module.css";

export const ResetPasswordPage = () => {
  const location = useLocation<ILocationState>();
  const history = useHistory();
  const { isAuth } = useAppSelector((state) => state.auth);

  const [state, setState] = React.useState({ password: "", token: "" });
  const [resetPassword] = useResetPasswordMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const value = target.value;
    const { name } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const newPasswordSet = (e: FormEvent) => {
    e.preventDefault();
    resetPassword(``)
      .unwrap()
      .then(() => {
        history.replace({
          pathname: _LOGIN_PATH,
          state: {
            from: location,
          },
        });
      });
  };

  if (!isAuth && location?.state?.from.pathname === _FORGOT_PASSWORD_PATH) {
    return (
      <form
        className={classes.reset_password_container}
        onSubmit={(e) => newPasswordSet(e)}
      >
        <p className="text text_type_main-medium mb-6">Password Recovery</p>

        <PasswordInput
          onChange={(e) => onChange(e)}
          value={state.password}
          name={"password"}
          placeholder={"Input new password"}
          extraClass={"mb-6"}
          autoComplete="current-password"
        />
        <Input
          type={"text"}
          placeholder={"Enter the code from the email"}
          onChange={(e) => onChange(e)}
          value={state.token}
          name={"token"}
          error={false}
          errorText={"Error"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass="mb-20"
        >
          Send
        </Button>
        <p className="text text_type_main-default mb-4 text_color_inactive">
          Remembered password? <Link to={_LOGIN_PATH}>Sign In</Link>
        </p>
      </form>
    );
  } else {
    return (
      <Redirect to={location?.state?.from.pathname || _FORGOT_PASSWORD_PATH} />
    );
  }
};
