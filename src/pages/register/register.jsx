import React, { useEffect, useRef } from "react";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { getCookie, registerPost } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../services/actions/auth";
import { _REGISTER_URL } from "../../utils/constants";
import classes from "./register.module.css";

const RegisterPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const token = document.cookie ? getCookie("token") : "";

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, isAuth, token]);

  const [state, setState] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const onChange = (e) => {
    const { target } = e;
    const value = target.value;
    const { name } = target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const register = (e) => {
    e.preventDefault();
    registerPost(_REGISTER_URL, state.email, state.password, state.name)
      .then(() => history.replace("/"))
      .catch((res) => console.log(res));
  };

  const inputRef = useRef();

  if (!isAuth) {
    return (
      <form className={classes.register_container} onSubmit={(e) => register(e)}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <Input
          type={"text"}
          placeholder={"Name"}
          onChange={(e) => onChange(e)}
          value={state.name}
          name={"name"}
          error={false}
          ref={inputRef}
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
          Already registred? <Link to="/login">Log In</Link>
        </p>
      </form>
    );
  } else {
    return <Redirect to={location?.state?.from.pathname || "/"} />;
  }
};

export default RegisterPage;
