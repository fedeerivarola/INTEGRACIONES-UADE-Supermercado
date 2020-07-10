import React from "react";
import './NavBar.css'
import { Link } from "react-router-dom";

const NavBar = (user = '') => {

  return (
    <div className="Navbar">
      <p><Link to="/cashier">Ventas</Link></p>
      <p><Link to="/admin">ABM Empleado</Link></p>
      <p><Link to="/finanzas">Finanzas</Link></p>
      <p><Link to="/products">ABM Producto</Link></p>
    </div>
  );
};

export default NavBar;
