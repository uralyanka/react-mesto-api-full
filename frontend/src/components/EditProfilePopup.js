import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");

  function handleChangeUserName(e) {
    setUserName(e.target.value);
  }

  function handleChangeUserBio(e) {
    setUserBio(e.target.value);
  }

  useEffect(() => {
    setUserName(currentUser?.name);
    setUserBio(currentUser?.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: userName,
      about: userBio,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      type="user-edit"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="user-name"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        type="text"
        value={userName}
        onChange={handleChangeUserName}
        className="popup__input popup__input_type_user-name"
      />
      <span
        id="error-user-name"
        className="popup__input-error user-name-input-error"
      ></span>

      <input
        id="user-bio"
        name="bio"
        placeholder="Коротко о себе"
        required
        minLength="2"
        maxLength="200"
        type="text"
        value={userBio}
        onChange={handleChangeUserBio}
        className="popup__input popup__input_type_user-bio"
      />
      <span
        id="error-user-bio"
        className="popup__input-error user-bio-input-error"
      ></span>
    </PopupWithForm>
  );
}
