import {
  BurgerIcon,
  ListIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { _ROOT_PATH } from "../../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import classes from "./AppHeaderNav.module.css";

const AppHeaderNav = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className={classes.nav_container}>
        <li className={classes.list}>
          <Link to={_ROOT_PATH} className={classes.nav_item}>
            <BurgerIcon
              type={location.pathname === _ROOT_PATH ? "primary" : "secondary"}
              className={"mr-2"}
            />
            <p
              className={`text text_type_main-default ml-2 ${
                location.pathname === _ROOT_PATH ? "" : "text_color_inactive"
              }`}
            >
              Constructor
            </p>
          </Link>
        </li>
        <li className={classes.list}>
          <Link to={_ROOT_PATH} className={classes.nav_item}>
            <ListIcon type={"secondary"} className={"mr-2"} />
            <p className="text text_type_main-default ml-2 text_color_inactive">
              Order ribbon
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppHeaderNav;
