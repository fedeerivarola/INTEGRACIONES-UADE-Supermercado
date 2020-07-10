import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar, Cart, AdminMain, AdminLogin, Ventas, ProductoABM} from './components';
import banner from './assets/kiwki2.jpg'



function App() {

  const [logok, setLogok] = useState(null);

  if (logok) {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/cashier" render={() => <Ventas />} />
            <Route exact path="/admin" render={() => <AdminMain />} />
            <Route exact path="/finanzas" render={() => <h2>CONTROL DE FINANZAS DIARIAS</h2>} />
            <Route exact path="/products" render={() =><ProductoABM />} />
          </Switch>
        </Router>
      </div>
    );
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
