import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import logo from "../images/mesto-header__logo.svg";
import NavBar from './NavBar';

export default function Header({ handleLogOut, userData }) {
  return (
    <header className="header">
      <Link to="/" className="header__link">
      <img alt="Лого сайта" className="header__logo" src={logo} />
      </Link>

      <Routes>
        <Route path='/' element={<NavBar userData={userData} logOut={handleLogOut}/>}/>
        <Route path='/sign-up' element={<Link to='/sign-in' className="header__nav-link">Войти</Link>}/>
        <Route path='/sign-in' element={<Link to='/sign-up' className="header__nav-link">Регистрация</Link>}/>
      </Routes>
    </header>
  );
}