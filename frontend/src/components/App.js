import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolip from "./InfoTooltip";
import * as auth from "../utils/auth";
import Content from "./Content";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    _id: "",
  });

  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);

  const navigate = useNavigate();

  function closeInfoPopup() {
    setIsInfoPopupOpen(false);
  }

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then((res) => {
        setUserData(res.data);
        navigate("/");
        setIsSuccessRegister(true);
        setIsInfoPopupOpen(true);
      })
      .catch((err) => {
        setIsSuccessRegister(false);
        setIsInfoPopupOpen(true);
        if (err === "Ошибка: 400")
          return console.log("некорректно заполнено одно из полей");
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .signin({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          setUserData({ email: email });
          navigate("/");
        }
      })
      .catch((err) => {
        setIsSuccessRegister(false);
        setIsInfoPopupOpen(true);
        if (err === "Ошибка: 400")
          return console.log("не передано одно из полей");
        if (err === "Ошибка: 401")
          return console.log("пользователь с email не найден");
        console.log(err);
      });
  }

  //реализовала аутентификацию при повторном входе
  function handleCheckToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setUserData(res.data);
          navigate("/");
        })
        .catch((err) => {
          if (err === "Ошибка: 400")
            return console.log("Токен не передан или передан не в том формате");
          if (err === "Ошибка: 401")
            return console.log("Переданный токен некорректен");
          console.log(err);
        });
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserData({});
    navigate("/sign-in");
  }

  return (
    <div className="root">
      <div className="page">
        <Header handleLogOut={handleLogOut} userData={userData} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Content}
              ></ProtectedRoute>
            }
          />

          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />

          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
        </Routes>
        <Footer />

        <InfoToolip
          isOk={isSuccessRegister}
          isOpen={isInfoPopupOpen}
          onClose={closeInfoPopup}
        />
      </div>
    </div>
  );
}
