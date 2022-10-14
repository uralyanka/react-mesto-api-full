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
      сredentials: "include",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  getCards() {
    return fetch(this._cardsUrl, {
      method: "GET",
      сredentials: "include",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  setUserData(name, about) {
    return fetch(this._userUrl, {
      method: "PATCH",
      сredentials: "include",
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
      сredentials: "include",
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
      сredentials: "include",
    }).then((res) => this._checkRes(res));
  }

  likeSwitcher(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: "DELETE",
        сredentials: "include",
        headers: this._headers,
      }).then((res) => this._checkRes(res));
    } else {
      return fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: "PUT",
        сredentials: "include",
        headers: this._headers,
      }).then((res) => this._checkRes(res));
    }
  }

  updateAvatar(avatar) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      сredentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._checkRes(res));
  }
}

export default new Api({
  baseUrl: "https://api.uralyanka.mesto.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});