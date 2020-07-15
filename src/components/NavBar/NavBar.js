import React from "react";
import './NavBar.css'
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const NavBar = (props) => {

  let isAdmin = props.admin;

  function setLogout() {
    props.logout()
  }

  if (isAdmin) {
    return (
      <div className="Navbar">
        <p><Link to="/cashier">Ventas</Link></p>
        <p><Link to="/finances">Finanzas</Link></p>
        <p><Link to="/employees">ABM Empleado</Link></p>
        <p><Link to="/products">ABM Producto</Link></p>
        <Button onClick={() => setLogout()}>Cerrar Sesion</Button>
      </div>
    );
  } else {
    return (
      <div className="Navbar">
        <p><Link to="/cashier">Ventas</Link></p>
        <p><Link to="/finances">Finanzas</Link></p>
        <Button onClick={() => setLogout()}>Cerrar Sesion</Button>
      </div >
    );

  }
};

export default NavBar;
