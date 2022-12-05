import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderLogin from "../AppHeaderLogin/AppHeaderLogin";
import AppHeaderNav from "../AppHeaderNav/AppHeaderNav";
import classes from "./AppHeader.module.css";

export const AppHeader = () => {
  return (
    <header className={classes.container}>
      <AppHeaderNav />
      <div className={classes.logo}>
        <Logo />
      </div>
      <AppHeaderLogin />
    </header>
  );
};

export default AppHeader;
