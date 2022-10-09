import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  function handleImageClick() {
    onCardClick(card.link, card.name);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <li className="elements__item">
      <div className="elements__item-box">
        <img
          src={card.link}
          className="elements__item-image"
          alt={card.name}
          onClick={handleImageClick}
        />
        {isOwn && (
          <button
            className="button elements__trash-btn"
            type="button"
            onClick={handleCardDelete}
          ></button>
        )}
      </div>
      <div className="elements__item-options">
        <h2 className="elements__item-name">{card.name}</h2>
        <div className="elements__like">
          <button
            className={`button elements__like-btn ${
              isLiked ? "elements__like-btn_active" : ""
            }`}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
