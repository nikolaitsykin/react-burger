import { _USER_URL, _TOKEN_URL } from "./constants";

function request(url, options) {
  return fetch(url, options).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res}`);
  });
}

export const fetchGet = (url) => {
  return request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
  });
};

export const fetchPost = (url, orderData) => {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: orderData }),
  });
};

export const resetPasswordPost = (url, email) => {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const setNewPasswordPost = (url, password, token) => {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
};

export const registerPost = (url, email, password, userName) => {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: userName,
    }),
  });
};

export const loginPost = (url, postData) => {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: postData.email,
      password: postData.password,
    }),
  });
};

export const logoutPost = (url, token) => {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
};

export const getUserRequest = (token) => {
  return request(_USER_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const userDataPatch = (userData, token) => {
  return request(_USER_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      name: userData.name,
    }),
  });
};

export const refreshTokenRequest = (tokenData) => {
  return request(_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenData),
  });
};

export const getCookie = (cookieName) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        cookieName.replace(/([.$?*|{}()\]\\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

export const deleteCookie = (name, value) => {
  document.cookie = `${name}=${value}; max-age=-1`;
};