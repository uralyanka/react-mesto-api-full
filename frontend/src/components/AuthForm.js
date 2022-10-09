export default function AuthForm({ title, buttonText, onSubmit, children }) {
  return (
    <div className="auth-form">
      <h2 className="auth-form__title">{title}</h2>
      <form className={`auth-form__form`} onSubmit={onSubmit}>
        <fieldset className="auth-form__input-container">{children}</fieldset>
        <button
          type="submit"
          aria-label="Отправить данные"
          className="button auth-form__submit-btn"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
