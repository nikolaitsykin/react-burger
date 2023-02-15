import { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useActions } from "../../../../hooks/actions";
import { useAppSelector } from "../../../../hooks/redux";
import { useGetUserQuery, useRefreshTokenMutation } from "../../../../store/api";
import { getCookie, setCookie } from "../../../../utils/cookie";
import { _LOGIN_PATH } from "../../../../utils/constants";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { loginSuccess, refreshUser } = useActions();
  const token = document.cookie ? getCookie("token") : "";
  const refreshToken = document.cookie ? getCookie("refreshToken") : "";
  const {
    isSuccess: isGetUserSuccess,
    isError: isGetUserError,
    data: userData,
  } = useGetUserQuery(token);

  const [
    refreshTokenPost,
    { isError: isRefreshError, isLoading: isRefreshLoading },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    isGetUserSuccess && loginSuccess();
    isGetUserSuccess && refreshUser(userData);

    if (!isRefreshError && !isRefreshLoading && isGetUserError) {
      refreshTokenPost(refreshToken)
        .unwrap()
        .then((res) => {
          const authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
            setCookie("refreshToken", res.refreshToken);
          }
          refreshUser(res);
        })
        .catch(() => {});
    }
  });

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
              pathname: _LOGIN_PATH,
              state: {
                from: location,
                error: "Please login first!",
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
