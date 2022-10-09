import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  //деструктуризировала props
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      cardName,
      cardLink,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      type="add-mesto"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="mesto-name"
        name="mesto-name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        type="text"
        value={cardName}
        onChange={handleChangeCardName}
        className="popup__input popup__input_type_mesto-name"
      />
      <span
        id="error-mesto-name"
        className="popup__input-error mesto-name-input-error"
      ></span>

      <input
        id="mesto-link"
        name="mesto-link"
        placeholder="Ссылка на картинку"
        required
        type="url"
        value={cardLink}
        onChange={handleChangeCardLink}
        className="popup__input popup__input_type_mesto-link"
      />
      <span
        id="error-mesto-link"
        className="popup__input-error mesto-link-input-error"
      ></span>
    </PopupWithForm>
  );
}
