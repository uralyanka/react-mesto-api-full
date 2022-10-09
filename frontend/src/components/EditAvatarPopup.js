import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  //деструктуризировала props
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  useEffect(() => {
    if (!isOpen) {
      inputRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      type="update-avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field form__field_last">
        <input
          id="avatar-link"
          name="avatar-link"
          ref={inputRef}
          placeholder="Ссылка на картинку"
          required
          type="url"
          className="popup__input popup__input_type_avatar-link"
        />
        <span className="popup__input-error avatar-link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
