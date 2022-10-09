//изменила название файла + шаблонные строки
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._headers = headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(this._userUrl, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  getCards() {
    return fetch(this._cardsUrl, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  setUserData(name, about) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkRes(res));
  }

  addCard(cardData) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.cardName,
        link: cardData.cardLink,
      }),
    }).then((res) => this._checkRes(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  likeSwitcher(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._checkRes(res));
    } else {
      return fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._checkRes(res));
    }
  }

  updateAvatar(avatar) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._checkRes(res));
  }
}

export default new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "552f6cf5-9624-4487-82c3-a3748eda88d5",
    "Content-Type": "application/json",
  },
});
