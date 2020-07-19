import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { NavBar, AdminLogin, Ventas, ProductoABM, Facturacion, EmpleadoABM } from './components';
import banner from './assets/kiwki2.jpg'



function App() {

  let active = localStorage.getItem('userId') ? true : null;

  const [logok, setLogok] = useState(active);
  const [isAdmin, setIsAdmin] = useState(false);

  function handleLogin(user) {
    console.log(user);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('fullname', user.fullName);
    setLogok(true);
    setIsAdmin(user.isAdmin);
  }

  function handleLogout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('fullname');
    setLogok(null);
  }

  if (logok) {
    if (isAdmin) {
      return (
        <div className="App">
          <Router>
            <Redirect from="/" to="/cashier" />
            <NavBar logout={() => handleLogout()} admin={true} />
            <Switch>
              <Route exact path="/cashier" render={() => <Ventas />} />
              <Route exact path="/employees" render={() => <EmpleadoABM />} />
              <Route exact path="/finances" render={() => <Facturacion />} />
              <Route exact path="/products" render={() => <ProductoABM />} />
            </Switch>
          </Router>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Router>
            <Redirect from="/" to="/cashier" />
            <NavBar logout={() => handleLogout()} admin={false} />
            <Switch>
              <Route exact path="/cashier" render={() => <Ventas />} />
              <Route exact path="/finances" render={() => <Facturacion />} />
            </Switch>
          </Router>
        </div>
      );
    }

  } else {
    return (
      <div className="login">
        <div className="banner">
          <img src={banner} alt='banner' />
        </div>
        <AdminLogin login={(e) => handleLogin(e)} />
      </div>
    )
  }
}

export default App;
