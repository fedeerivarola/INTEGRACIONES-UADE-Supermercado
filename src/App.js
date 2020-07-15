import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar, AdminLogin, Ventas, ProductoABM, Facturacion, EmpleadoABM } from './components';
import banner from './assets/kiwki2.jpg'



function App() {

  const [logok, setLogok] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);

  if (logok) {
    if (isAdmin) {
      return (
        <div className="App">
          <Router>
            <NavBar logout={() => setLogok(null)} admin={true} />
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
            <NavBar logout={() => setLogok(null)} admin={false} />
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
        <AdminLogin login={() => setLogok('ok')} />
      </div>
    )
  }
}

export default App;
