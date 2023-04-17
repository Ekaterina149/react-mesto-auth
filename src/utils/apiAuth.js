import { baseUrlAuth, authDataHeaders } from "./utils";

//Метод возвращает промисс из ответа сервера
//в случае ошибки возвращает ее код и текст ошибки
const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`${res.status} ${res.statusText}`);
  }
};
//функция записывает данные пользователя на сервер
const register = (email, password) => {
  const href = baseUrlAuth + "/signup";
  return fetch(href, {
    method: "POST",
    headers: authDataHeaders,
    body: JSON.stringify({ email, password }),
  }).then(checkRes);
};

const authorize = (email, password) => {
  const href = baseUrlAuth + "/signin";
  return fetch(href, {
    method: "POST",
    headers: authDataHeaders,
    body: JSON.stringify({ email, password }),
  }).then(checkRes);
};

const checkToken = (token) => {
  const href = baseUrlAuth + "/users/me";
  return fetch(href, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};

export { register, authorize, checkToken };
