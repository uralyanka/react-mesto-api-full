const baseAuthUrl = "https://api.uralyanka.mesto.nomoredomains.icu";

function checkRes(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register({ email, password }) {
  return fetch(`${baseAuthUrl}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkRes(res));
}

export function signin({ email, password }) {
  return fetch(`${baseAuthUrl}/signin`, {
    method: "POST",
    redentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkRes(res));
}

export function getContent() {
  return fetch(`${baseAuthUrl}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkRes(res))
}