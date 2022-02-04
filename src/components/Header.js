import React from "react";
import { Link } from 'react-router-dom'
import Nav from "./Nav.js";



export default function Header(props) {
  return (
    <header className="header">
      <Link to="/">
        <div>
        <h3 className="logo-1">Grace</h3>
        <h3 className="logo-2">$hopper</h3>
        </div>
      </Link>
      <Nav />
    </header>
  );
}