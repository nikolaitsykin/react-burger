import React from "react";
import classes from "./AppHeader.module.css";
import AppHeaderNav from "../AppHeaderNav/AppHeaderNav";
import AppHeaderLogin from "../AppHeaderLogin/AppHeaderLogin";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
  return (
    <header className={classes.container}>
      <AppHeaderNav />
      <div className={classes.logo}>
        <Logo className={classes.logo} />
      </div>
      <AppHeaderLogin />
    </header>
  );
};

export default AppHeader;
