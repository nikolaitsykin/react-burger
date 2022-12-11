import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { checkUser } from "../../services/actions/auth";
import { getCookie, resetPasswordPost } from "../../utils/api";
import {
  _EMAIL_RESET_URL,
  _LOGIN_PATH,
  _RESET_PASSWORD_PATH,
  _ROOT_PATH,
} from "../../utils/constants";
import classes from "./forgot-password.module.css";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const token = document.cookie ? getCookie("token") : "";
  const { isAuth } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, isAuth, token]);

  const { values, handleChange, errors, isValid } = useAuth({});

  const submitForm = (e, email) => {
    e.preventDefault();
    resetPasswordPost(_EMAIL_RESET_URL, email).then(() => {
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
        onSubmit={(e) => submitForm(e, values.email)}
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
  } else {
    return <Redirect to={location?.state?.from.pathname || _ROOT_PATH} />;
  }
};

export default ForgotPasswordPage;
