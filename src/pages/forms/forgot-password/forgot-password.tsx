import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useEffect } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";
import { useAuth } from "../../../hooks/useAuth";
import { ILocationState } from "../../../models/models";
import { useForgotPasswordMutation, useGetUserQuery } from "../../../store/api";
import {
  _LOGIN_PATH,
  _RESET_PASSWORD_PATH,
  _ROOT_PATH,
} from "../../../utils/constants";
import { getCookie } from "../../../utils/cookie";
import classes from "./forgot-password.module.css";

export default function ForgotPasswordPage() {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { loginSuccess, refreshUser } = useActions();
  const token: string | undefined = document.cookie
    ? getCookie("token")
    : undefined;
  const { isSuccess: isGetUserSuccess, data: userData } =
    useGetUserQuery(token);

  useEffect(() => {
    isGetUserSuccess && loginSuccess();
    isGetUserSuccess && refreshUser(userData);
  }, [isGetUserSuccess, loginSuccess, refreshUser, userData]);

  const { values, handleChange, errors, isValid } = useAuth({
    email: "",
  });
  const [remindPassword] = useForgotPasswordMutation();

  const email = values.email;

  const submitForm = (
    e: FormEvent<HTMLFormElement>,
    email: string | undefined
  ) => {
    e.preventDefault();
    remindPassword(email)
      .unwrap()
      .then(() => {
        history.replace({
          pathname: _RESET_PASSWORD_PATH,
          state: {
            from: location,
          },
        });
      });
  };

  if (!isAuth) {
    return (
      <form
        className={classes.forgot_password_container}
        onSubmit={(e: FormEvent<HTMLFormElement>) => submitForm(e, email)}
      >
        <p className="text text_type_main-medium mb-6">Password Recovery</p>
        <p className={`${classes.content} text text_type_main-default`}>
          Enter your email address that you used to register. We'll send you an
          email with a link to reset your password.
        </p>
        <Input
          size={"default"}
          onChange={(e) => handleChange(e)}
          value={values.email || ""}
          error={!isValid}
          errorText={errors!.email || ""}
          name={"email"}
          placeholder={"Enter email"}
          extraClass={"mb-6 m0-a"}
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass="mb-20"
        >
          Send
        </Button>
        <p className="text text_type_main-default mb-4">
          Remembered password? <Link to={_LOGIN_PATH}>Sign In</Link>
        </p>
      </form>
    );
  } else return <Redirect to={location?.state?.from.pathname || _ROOT_PATH} />;
}
