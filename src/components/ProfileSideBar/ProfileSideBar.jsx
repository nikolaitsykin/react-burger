import React, { useEffect } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import classes from "./ProfileSideBar.module.css";
import { checkUser, logout } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/api";

const ProfileSideBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const token = document.cookie ? getCookie("refreshToken") : "";
  const { isAuth } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, isAuth, token]);

  const handleLogout = () => {
    dispatch(logout(token, history));
  };

  if (isAuth) {
    return (
      <div className={classes.nav_container}>
        <Link to="/profile" className={classes.nav_item}>
          <p
            className={`${
              location.pathname === "/profile" ? "" : "text_color_inactive"
            } text text_type_main-medium pt-4 pr-4 pb-4`}
          >
            Profile
          </p>
        </Link>
        <Link to="/profile/orders" className={classes.nav_item}>
          <p
            className={`${
              location.pathname === "/profile/orders"
                ? ""
                : "text_color_inactive"
            } text text_type_main-medium pt-4 pr-4 pb-4`}
          >
            Order history
          </p>
        </Link>
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
    return <Redirect to={location?.state?.from || "/"} />;
  }
};

export default ProfileSideBar;
