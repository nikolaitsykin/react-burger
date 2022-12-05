import React, { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../services/actions/auth";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = document.cookie ? getCookie("token") : "";
  const { isAuth } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, isAuth, token]);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isAuth ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
