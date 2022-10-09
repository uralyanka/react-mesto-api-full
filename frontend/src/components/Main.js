import { useContext, } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img
            src={`${currentUser?.avatar}`}
            alt="Аватар пользователя"
            className="profile__avatar-image"
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>

          <button
            className="button profile__user-edit-button"
            type="button"
            aria-label="Редактировать информацию пользователя"
            onClick={onEditProfile}
          ></button>

          <p className="profile__user-bio">{currentUser.about}</p>
        </div>

        <button
          className="button profile__add-button"
          type="button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        ></button>
      </div>

      <div className="elements">
        <ul className="elements__items">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
}
