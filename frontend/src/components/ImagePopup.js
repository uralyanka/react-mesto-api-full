export default function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_view-mesto ${card.isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <figure className="popup__figure">
        <button
          className="button popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__figure-image" />
        <figcaption className="popup__figure-caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}
