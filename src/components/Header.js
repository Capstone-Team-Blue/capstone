import React from "react";
import { Link } from 'react-router-dom'
import Nav from "./Nav.js";

export default function Header(props) {
  
  const { setIsLoggedIn, setLoginToken, setUsername, setPassword, isLoggedIn } = props

  return (
    <header className="header">
      <Link to="/"><img className='logo' src={process.env.PUBLIC_URL+"assets/logo.png"} alt='logo' /></Link>
      <Nav setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setUsername={setUsername} setPassword={setPassword} isLoggedIn={isLoggedIn} />
    </header>
  );
}