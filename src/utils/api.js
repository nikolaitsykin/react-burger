import { _USER_URL, _TOKEN_URL } from "./constants";

export const request = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  } else return res.json();
};

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

export const loginPost = (url, values) => {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
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

export const userDataPatch = (values, token) => {
  return request(_USER_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
      name: values.name,
    }),
  });
};

export const refreshTokenRequest = (refreshData) => {
  return request(_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refreshData),
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
