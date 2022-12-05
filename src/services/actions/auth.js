import { _LOGIN_URL, _LOGOUT_URL } from "../../utils/constants";
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

export const LOGIN_SUCCESS = "LOGIN";
export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const REFRESH_USER = "REFRESH_USER";
export const RESET_USER = "RESET_USER";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const login = (postData, history) => {
  return function (dispatch) {
    loginPost(_LOGIN_URL, postData)
      .then((res) => {
        let accessToken;
        if (res.accessToken.indexOf("Bearer") === 0)
          accessToken = res.accessToken.split("Bearer ")[1];
        else accessToken = res.accessToken;
        dispatch({
          type: SET_USER,
          user: { ...res.user, password: postData.password },
          isAuth: true,
        });
        setCookie("refreshToken", res.refreshToken);
        setCookie("token", accessToken);
      })
      .then(() => history.replace({ pathname: "/login" }))
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
        history.replace("/login");
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

export const refreshUserData = (token) => {
  const refreshData = {
    token: token,
  };
  return function (dispatch) {
    return refreshTokenRequest(refreshData).then((res) => {
      let accessToken = null;
      deleteCookie("refreshToken", token);
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
      setCookie("refreshToken", res.refreshToken);
      return accessToken;
    });
  };
};

export const patchUserData = (userData, token) => {
  return function (dispatch) {
    return userDataPatch(userData, token).then((res) => {
      setCookie("token", res.accessToken);
      dispatch({
        type: REFRESH_USER,
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
      .catch(() => {
        refreshUserData(token);
      });
  };
};