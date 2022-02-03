import React from "react";
import { Link } from 'react-router-dom'
import Nav from "./Nav.js";



export default function Header(props) {
  return (
    <header className="header">
      <Link to="/"><img className='logo' src={process.env.PUBLIC_URL+"assets/logo.png"} width='270px' height='390px'/></Link>
      <Nav />
    </header>
  );
}