export const fetchRequest = (url, cb) => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => cb(data.data))
        .catch((err) => console.log(err));
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

const checkPromise = (promise) => {
    return promise.then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
    });
};