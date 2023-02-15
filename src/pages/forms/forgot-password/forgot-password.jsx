import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";
import { useAuth } from "../../../hooks/useAuth";
import {
  useForgotPasswordMutation,
  useLazyGetUserQuery,
} from "../../../store/api";
import { getCookie } from "../../../utils/cookie";
import {
  _LOGIN_PATH,
  _ROOT_PATH,
  _RESET_PASSWORD_PATH,
} from "../../../utils/constants";
import classes from "./forgot-password.module.css";

const ForgotPasswordPage = () => {
  const history = useHistory();
  const location = useLocation();
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

  const { values, handleChange, errors, isValid } = useAuth({});
  const [remindPassword] = useForgotPasswordMutation();

  const email = values.email;

  const submitForm = (e, email) => {
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
        onSubmit={(e) => submitForm(e, email)}
      >
        <p className="text text_type_main-medium mb-6">Password Recovery</p>
        <p className={`${classes.content} text text_type_main-default`}>
          Enter your email address that you used to register. We'll send you an
          email with a link to reset your password.
        </p>
        <EmailInput
          size={"default"}
          onChange={(e) => handleChange(e)}
          value={values.email || ""}
          error={isValid === false}
          errorText={errors.email || ""}
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
  }
  return <Redirect to={location?.state?.from.pathname || _ROOT_PATH} />;
};

export default ForgotPasswordPage;
