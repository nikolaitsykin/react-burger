export const fetchRequest = (url, cb) => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => cb(data.data))
        .catch((err) => console.log(err));
}