import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar, AdminMain, AdminLogin, Ventas, ProductoABM, Facturacion } from './components';
import banner from './assets/kiwki2.jpg'



function App() {

  const [logok, setLogok] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [productos, setProductos] = useState(null);

  if (logok) {
    if (isAdmin) {
      return (
        <div className="App">
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/cashier" render={() => <Ventas />} />
              <Route exact path="/admin" render={() => <AdminMain />} />
              <Route exact path="/finanzas" render={() => <Facturacion />} />
              <Route exact path="/products" render={() => <ProductoABM />} />
            </Switch>
          </Router>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/cashier" render={() => <Ventas productos={productos} />} />
              <Route exact path="/finanzas" render={() => <Facturacion />} />
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
        <AdminLogin login={() => setLogok('ok')} />
      </div>
    )
  }
}

export default App;
