import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import classes from "./AppHeaderLogin.module.css";

const AppHeaderLogin = () => {
  const location = useLocation();
  let isActive = location.pathname.includes("profile");

  return (
    <div className={classes.nav_container}>
      <Link to="/profile" className={classes.nav_item}>
        <ProfileIcon type={isActive ? "primary" : "secondary"} />
        <p className={`text text_type_main-default ml-2 text_color_inactive ${
          isActive ? "" : "text_color_inactive"
        }`}>
          Account
        </p>
      </Link>
    </div>
  );
};

export default AppHeaderLogin;
