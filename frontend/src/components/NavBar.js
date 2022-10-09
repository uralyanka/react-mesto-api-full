import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar({ logOut, userData }) {
  //исправила клик по Выйти, из-за которого зацикливалась аутентификация при повторном входе
  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(userData.email);
  },[userData]);

  return (
    <nav className='header__nav'>
      <h2 className='header__nav-email'>{email}</h2>
      <Link to='/sign-in' onClick={logOut} className='header__nav-link header__nav-logout-link'>Выйти</Link>
    </nav>
  );
}