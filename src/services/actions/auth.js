import {
  deleteCookie,
  getCookie,
  getUserRequest,
  loginPost,
  logoutPost,
  refreshTokenRequest,
  setCookie,
  userDataPatch,
} from "../../utils/api";
import { _LOGIN_PATH, _LOGIN_URL, _LOGOUT_URL } from "../../utils/constants";

export const LOGIN_SUCCESS = "LOGIN";
export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const REFRESH_USER = "REFRESH_USER";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const RESET_USER = "RESET_USER";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const login = (values, history) => {
  return function (dispatch) {
    loginPost(_LOGIN_URL, values)
      .then((res) => {
        let accessToken;
        if (res.accessToken.indexOf("Bearer") === 0)
          accessToken = res.accessToken.split("Bearer ")[1];
        else accessToken = res.accessToken;
        sessionStorage.setItem("token", res.refreshToken);
        dispatch({
          type: SET_USER,
          user: { ...res.user, password: values.password },
          isAuth: true,
          token: accessToken,
        });
        setCookie("token", accessToken);
      })
      .then(() => history.replace({ pathname: _LOGIN_PATH }))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logout = (token, history) => {
  return function (dispatch) {
    logoutPost(_LOGOUT_URL, token)
      .then(() => {
        const oldTokenCookie = getCookie("refreshToken");
        const oldAccessTokenCookie = getCookie("token");
        deleteCookie("refreshToken", oldTokenCookie);
        deleteCookie("token", oldAccessTokenCookie);
      })
      .then(() => {
        history.replace(_LOGIN_PATH);
      })
      .then(() => {
        dispatch({ type: RESET_USER });
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((res) => {
        console.log(res);
      });
  };
};

export const refreshUserData = (refToken) => {
  const refreshData = {
    token: refToken,
  };
  return function (dispatch) {
    return refreshTokenRequest(refreshData).then((res) => {
      let accessToken = null;
      sessionStorage.removeItem("token");

      if (res.accessToken.indexOf("Bearer") === 0) {
        accessToken = res.accessToken.split("Bearer ")[1];
      } else {
        accessToken = res.accessToken;
      }
      dispatch({
        type: REFRESH_USER,
        token: accessToken,
        user: res.user,
        isAuth: true,
      });
      setCookie(localStorage.getItem("refreshToken"), res.refreshToken);
      return accessToken;
    });
  };
};

export const patchUserData = (values, token) => {
  return function (dispatch) {
    return userDataPatch(values, token).then((res) => {
      dispatch({
        type: REFRESH_USER,
        token: token,
        user: res.user,
      });
    });
  };
};

export const checkUser = (token) => {
  return function (dispatch) {
    return getUserRequest(token)
      .then(() => {
        dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          const refData = { token: sessionStorage.getItem("token") };
          return refreshTokenRequest(refData).then((res) => {
            let accessToken;
            if (res.accessToken.indexOf("Bearer") === 0) {
              accessToken = res.accessToken.split("Bearer ")[1];
            } else {
              accessToken = res.accessToken;
            }
            console.log(res);
            console.log(accessToken);
            dispatch({
              type: REFRESH_TOKEN,
              token: accessToken,
            });
            setCookie("token", accessToken);
            setCookie(localStorage.getItem("refreshToken"), res.refreshToken);
            getUserRequest(accessToken).then((res) => {
              dispatch({
                type: REFRESH_USER,
                token: accessToken,
                user: res.user,
              });
            });
            return "Token has beed updated";
          });
        }
      });
  };
};
