import React from "react";
import { Link } from 'react-router-dom'
import Nav from "./Nav.js";
import logo from '../assets/logo.png';


export default function Header(props) {
  return (
    <header className="header">
      <Link to="/"><img className='logo' src={logo} /></Link>
      <Nav />
    </header>
  );
}