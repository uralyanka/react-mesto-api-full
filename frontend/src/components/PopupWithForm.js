export default function PopupWithForm({
  type,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
}) {
  
  return (
    <div className={`popup popup_type_${type} ${isOpen && "popup_opened"}`}>
      <div className={`popup__container popup__container_type_${type}`}>
        <button
          className="button popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>

        <h2 className={`popup__title popup__title_type_${type}`}>{title}</h2>

        <form className={`popup__form popup_type_${type}`} onSubmit={onSubmit}>
          <fieldset className="popup__input-container">{children}</fieldset>

          <button className="button popup__submit-btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
