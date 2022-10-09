const baseAuthUrl = "https://auth.nomoreparties.co";

function checkRes(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register({ email, password }) {
  return fetch(`${baseAuthUrl}/signup`, {
    method: "POST",
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
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkRes(res));
}

export function getContent(token) {
  return fetch(`${baseAuthUrl}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkRes(res))
}
//убрала лишний then + изменила форму входящих данных в getContent