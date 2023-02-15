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
