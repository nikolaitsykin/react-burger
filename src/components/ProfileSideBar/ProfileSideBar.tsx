import { NavLink, Redirect, useHistory, useLocation } from "react-router-dom";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { useLogoutMutation } from "../../services/store/api";
import { ILocationState } from "../../services/types/locationTypes";
import {
  _LOGIN_PATH,
  _ORDERS_PATH,
  _PROFILE_PATH,
  _ROOT_PATH
} from "../../utils/constants";
import { deleteCookie, getCookie } from "../../utils/cookie";
import classes from "./ProfileSideBar.module.css";

export const ProfileSideBar = () => {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const token: string | undefined = document.cookie
    ? getCookie("refreshToken")
    : undefined;
  const { isAuth } = useAppSelector((state) => state.auth);
  const [logoutRequest] = useLogoutMutation();
  const { logout } = useActions();

  const handleLogout = () => {
    logoutRequest(token)
      .then(() => {
        const oldTokenCookie: string | undefined = getCookie("refreshToken");
        const oldAccessTokenCookie: string | undefined = getCookie("token");
        deleteCookie("refreshToken", oldTokenCookie);
        deleteCookie("token", oldAccessTokenCookie);
      })
      .then(() => {
        history.replace(_LOGIN_PATH);
      })
      .then(() => {
        logout();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isAuth) {
    return (
      <div className={classes.nav_container}>
        <NavLink to={_PROFILE_PATH} className={classes.nav_item}>
          <p
            className={`${
              location.pathname === _PROFILE_PATH ? "" : "text_color_inactive"
            } text text_type_main-medium pt-4 pr-4 pb-4`}
          >
            Profile
          </p>
        </NavLink>
        <NavLink to={_ORDERS_PATH} className={classes.nav_item}>
          <p
            className={`${
              location.pathname === _ORDERS_PATH ? "" : "text_color_inactive"
            } text text_type_main-medium pt-4 pr-4 pb-4`}
          >
            Order history
          </p>
        </NavLink>
        <button className={classes.logout_button} onClick={handleLogout}>
          <p className="text text_type_main-medium pt-4 pr-4 pb-4 text_color_inactive">
            Exit
          </p>
        </button>
        <p className={`${classes.nav_description} text text_type_main-small`}>
          In this section you can change your personal data
        </p>
      </div>
    );
  } else {
    return <Redirect to={location?.state?.from || _ROOT_PATH} />;
  }
};
