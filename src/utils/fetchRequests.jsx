const checkPromise = (promise) => {
  return promise.then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  });
};

export const fetchGet = (url) => {
  const promise = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
  });
  return checkPromise(promise);
};

export const fetchPost = (url, data) => {
  const promise = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  return checkPromise(promise);
};
