import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { _PROFILE_PATH } from "../../../../utils/constants";
import classes from "./AppHeaderLogin.module.css";
import { ILocationState } from "../../../../models/models";

const AppHeaderLogin = () => {
  const location = useLocation<ILocationState>();
  const isActive = location.pathname.includes(_PROFILE_PATH);

  return (
    <div className={classes.nav_container}>
      <Link to={_PROFILE_PATH} className={classes.nav_item}>
        <ProfileIcon type={isActive ? "primary" : "secondary"} />
        <p
          className={`text text_type_main-default ml-2 text_color_inactive ${
            isActive ? "" : "text_color_inactive"
          }`}
        >
          Account
        </p>
      </Link>
    </div>
  );
};

export default AppHeaderLogin;
