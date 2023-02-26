import { useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useActions } from "../../../../hooks/actions";
import { useAppSelector } from "../../../../hooks/redux";
import { ILocationState } from "../../../../models/models";
import { RootState } from "../../../../store";
import {
  useGetUserQuery,
  useRefreshTokenMutation
} from "../../../../store/api";
import { _LOGIN_PATH } from "../../../../utils/constants";
import { getCookie, setCookie } from "../../../../utils/cookie";

const ProtectedRoute = ({ component: Comp, path, ...rest }: RouteProps) => {
  const location = useLocation<ILocationState>();
  const { isAuth } = useAppSelector((state: RootState) => state.auth);
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

  return <Route path={path} {...rest} component={Comp} />;
};

export default ProtectedRoute;
