import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { _ROOT_PATH } from "../../../utils/constants";
import classes from "./AppHeader.module.css";
import { AppHeaderLogin } from "./AppHeaderLogin/AppHeaderLogin";
import { AppHeaderNav } from "./AppHeaderNav/AppHeaderNav";

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
