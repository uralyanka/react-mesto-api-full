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

  getUserData(token) {
    return fetch(this._userUrl, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._checkRes(res));
  }

  getCards(token) {
    return fetch(this._cardsUrl, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._checkRes(res));
  }

  setUserData(formData, token) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: formData.name,
        about: formData.about,
      }),
    }).then((res) => this._checkRes(res));
  }

  addCard(formData, token) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: formData.name,
        link: formData.link,
      }),
    }).then((res) => this._checkRes(res));
  }

  deleteCard(cardId, token) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._checkRes(res));
  }

  likeSwitcher(cardId, isLiked, token) {
    if (isLiked) {
      return fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: "DELETE",
        headers: { ...this._headers, authorization: `Bearer ${token}` },
      }).then((res) => this._checkRes(res));
    } else {
      return fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: "PUT",
        headers: { ...this._headers, authorization: `Bearer ${token}` },
      }).then((res) => this._checkRes(res));
    }
  }

  updateAvatar(formData, token) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        avatar: formData.avatar,
      }),
    }).then((res) => this._checkRes(res));
  }
}

export default new Api({
  baseUrl: "api.uralyanka.mesto.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});
