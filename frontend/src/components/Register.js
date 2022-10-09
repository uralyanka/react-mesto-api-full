import AuthForm from "./AuthForm";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function signup(e) {
    e.preventDefault();

    handleRegister({ email, password });

    setEmail("");
    setPassword("");
  }

  return (
    <main className="content content_type_auth">
      <AuthForm
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={signup}
      >
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
          className="auth-form__input"
        />

        <input
          type="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="40"
          required
          value={password}
          onChange={handlePasswordChange}
          className="auth-form__input"
        />
      </AuthForm>
      <Link to="/sign-in" className="auth-form__link">
        Уже зарегистрированы? Войти
      </Link>
    </main>
  );
}
