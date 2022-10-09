import AuthForm from './AuthForm';
import { useState } from "react";

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSignin(e) {
    e.preventDefault();

    handleLogin({email, password});

    setEmail('');
    setPassword('');
  }

  return (
    <main className="content content_type_auth">
      <AuthForm
        title="Вход"
        buttonText="Войти"
        onSubmit={handleSignin}
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
    </main>
  );
}