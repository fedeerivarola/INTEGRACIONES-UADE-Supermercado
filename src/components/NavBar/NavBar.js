import React from "react";
import './NavBar.css'
import { Link } from "react-router-dom";

const NavBar = (user = '') => {

  return (
    <div className="Navbar">
      <p><Link to="/">Home</Link></p>
      <p><Link to="/admin">Admin</Link></p>
      <p><Link to="/cashier">Empleado</Link></p>
      <p><Link to="/cart">Registro producto</Link></p>
    </div>
  );
};

export default NavBar;
