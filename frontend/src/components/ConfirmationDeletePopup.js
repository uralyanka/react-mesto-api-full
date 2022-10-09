import PopupWithForm from "./PopupWithForm";

export default function ConfirmationDeletePopup({ onConfirmClick, isOpen, onClose }) {
  function handleConfirm(e) {
    e.preventDefault();
    onConfirmClick();
  }

  return (
    <PopupWithForm
      name="submit"
      type="confirmation"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirm}
    />
  );
}
