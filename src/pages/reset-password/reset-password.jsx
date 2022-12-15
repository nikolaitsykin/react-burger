import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import classes from "./reset-password.module.css";
import { getCookie, setNewPasswordPost } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../services/actions/auth";
import { _FORGOT_PASSWORD_PATH, _LOGIN_PATH, _PASSWORD_RESET_URL } from "../../utils/constants";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = document.cookie ? getCookie("token") : "";
  const { isAuth } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, token]);

  const [state, setState] = React.useState({ password: "", token: "" });
  
  const onChange = (e) => {
    const { target } = e;
    const value = target.value;
    const { name } = target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const inputRef = useRef();

  const newPasswordSet = (e) => {
    e.preventDefault();
    setNewPasswordPost(_PASSWORD_RESET_URL, state.password, state.token).catch(
      (err) => (err)
    );
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
          ref={inputRef}
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
    <Redirect to={location?.state?.from.pathname || _FORGOT_PASSWORD_PATH} />;
  }
};

export default ResetPasswordPage;
