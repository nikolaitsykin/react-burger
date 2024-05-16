import {
  BurgerIcon,
  ListIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import { ILocationState } from "../../../../services/types/locationTypes";
import { _FEED_PATH, _ROOT_PATH } from "../../../../utils/constants";
import classes from "./AppHeaderNav.module.css";

export const AppHeaderNav = () => {
  const location = useLocation<ILocationState>();

  return (
    <nav>
      <ul className={classes.nav_container}>
        <li className={classes.list}>
          <NavLink to={_ROOT_PATH} className={classes.nav_item}>
            <BurgerIcon
              type={location.pathname === _ROOT_PATH ? "primary" : "secondary"}
            />
            <p
              className={`text text_type_main-default ml-2 ${
                location.pathname === _ROOT_PATH ? "" : "text_color_inactive"
              }`}
            >
              Constructor
            </p>
          </NavLink>
        </li>
        <li className={classes.list}>
          <NavLink
            to={_FEED_PATH}
            className={classes.nav_item}
            activeClassName={classes.active}
          >
            <ListIcon
              type={location.pathname === _FEED_PATH ? "primary" : "secondary"}
            />
            <p
              className={`text text_type_main-default ml-2 ${
                location.pathname === _FEED_PATH ? "" : "text_color_inactive"
              }`}
            >
              Orders feed
            </p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
