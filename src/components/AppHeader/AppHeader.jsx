import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderLogin from "../AppHeaderLogin/AppHeaderLogin";
import AppHeaderNav from "../AppHeaderNav/AppHeaderNav";
import classes from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import { _ROOT_PATH } from "../../utils/constants";

export const AppHeader = () => {
  return (
    <header className={classes.container}>
      <AppHeaderNav />
      <Link to={_ROOT_PATH} className={classes.logo}>
        <Logo />
      </Link>
      <AppHeaderLogin />
    </header>
  );
};

export default AppHeader;
