import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { useAuth } from "../../hooks/useAuth";
import { usePatchUserDataMutation } from "../../store/api";
import { getCookie } from "../../utils/cookie";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const { name, email, password } = useAppSelector((store) => store.auth);

  const token = document.cookie ? getCookie("token") : "";

  const [isChanged, setChanged] = useState(false);

  const [patchUserData] = usePatchUserDataMutation();
  const { refreshUser } = useActions();

  const { values, handleChange, errors, isValid, resetForm } = useAuth({
    email: email,
    password: password,
    name: name,
  });

  useEffect(() => {
    if (
      email === values.email &&
      password === values.password &&
      name === values.name
    ) {
      setChanged(false);
    } else setChanged(true);
  }, [values, name, email, password, isChanged]);

  const submitForm = (event) => {
    event.preventDefault();
    const userData = {
      token,
      ...values,
    };
    patchUserData(userData)
      .then(() => {
        refreshUser(values);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className={classes.form_container}
      onSubmit={(event) => submitForm(event)}
    >
      <Input
        type={"text"}
        placeholder={"Name"}
        onChange={(e) => handleChange(e)}
        value={values.name || ""}
        name={"name"}
        error={isValid === false}
        errorText={errors.name || ""}
        extraClass="mb-6"
        autoComplete="username"
      />
      <Input
        type={"email"}
        placeholder={"Email"}
        onChange={(e) => handleChange(e)}
        value={values.email || ""}
        name={"email"}
        error={isValid === false}
        errorText={errors.email || ""}
        extraClass="mb-6"
        autoComplete="email"
      />
      <Input
        type={"password"}
        placeholder={"Password"}
        onChange={(e) => handleChange(e)}
        value={values.password || ""}
        name={"password"}
        error={isValid === false}
        errorText={errors.password || ""}
        extraClass={"mb-6"}
        autoComplete={"password"}
      />
      <div
        className={`${classes.button_container} ${
          !isChanged ? classes.hidden : ""
        }`}
      >
        <Button
          type="primary"
          htmlType="button"
          onClick={() => resetForm({ name, email, password })}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
