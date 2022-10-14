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
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkRes(res));
}

export function signin({ email, password }) {
  return fetch(`${baseAuthUrl}/signin`, {
    method: "POST",
    сredentials: "include",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkRes(res));
}

export function getContent() {
  return fetch(`${baseAuthUrl}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => checkRes(res))
}

export function signout() {
  return fetch(`${baseAuthUrl}/signout`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => checkRes(res))
};