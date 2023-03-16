import { useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useActions } from "../../../../hooks/actions";
import { useAppSelector } from "../../../../hooks/redux";
import {
  useGetUserQuery,
  useRefreshTokenMutation,
} from "../../../../services/store/api";
import { ILocationState } from "../../../../services/types/locationTypes";
import { _LOGIN_PATH } from "../../../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../../../utils/cookie";

export const ProtectedRoute = ({
  component: Comp,
  path,
  ...rest
}: RouteProps) => {
  const location = useLocation<ILocationState>();
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
    if (isGetUserSuccess) {
      loginSuccess();
    }
    if (isGetUserSuccess) {
      refreshUser(userData);
    }
    if (
      !isRefreshError &&
      !isRefreshLoading &&
      isGetUserError &&
      refreshToken
    ) {
      refreshTokenPost(refreshToken)
        .unwrap()
        .then((res) => {
          if (res) {
            const authToken = res.accessToken?.split("Bearer ")[1];
            if (authToken) {
              deleteCookie("token", getCookie("token"));
              deleteCookie("refreshToken", getCookie("refreshToken"));
              setCookie("token", authToken);
              setCookie("refreshToken", res.refreshToken);
            }
            refreshUser(res);
          }
        });
    }
  });

  if (!isAuth)
    return (
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
  else return <Route path={path} {...rest} component={Comp} />;
};
