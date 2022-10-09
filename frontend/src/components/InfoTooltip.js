import success from "../images/success.svg";
import fail from "../images/fail.svg";

export default function InfoTooltip({ isOk, onClose, isOpen }) {
  const successAlert = "Вы успешно зарегистрировались!";
  const failAlert = "Что-то пошло не так!\n Попробуйте ещё раз.";

  return (
    <div className={`popup popup_type_info ${isOpen && "popup_opened"}`} onClick={onClose}>
      <figure className="popup__figure-info">
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="button popup__close-btn"
        ></button>
        <img
          src={isOk ? success : fail}
          alt={isOk ? successAlert : failAlert}
          className="popup__figure-info_image"
        />
        <figcaption className="popup__figure-info_text">
          {isOk ? successAlert : failAlert}
        </figcaption>
      </figure>
    </div>
  );
}
