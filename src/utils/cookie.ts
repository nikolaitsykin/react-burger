export const getCookie = (cookieName: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        cookieName.replace(/([.$?*|{}()\]\\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string | undefined) => {
  document.cookie = `${name}=${value}`;
};

export const deleteCookie = (name: string, value: string | undefined) => {
  document.cookie = `${name}=${value}; max-age=-1`;
};
