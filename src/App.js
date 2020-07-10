import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar, Cart, AdminMain, AdminLogin, Ventas } from './components';
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
            <Route exact path="/products"><ProductRegister /></Route>
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

function ProductRegister() {

  return (
    <form>
      <h2>Registro de producto</h2>
      <div>
        <label>
          Código del producto:
        <input type="text" name="code" />
        </label>
      </div>
      <div>
        <label>
          Nombre del producto:
          <input type="text" name="name" />
        </label>
      </div>
      <div>
        <label>
          Cantidad de producto:
          <input type="number" min="0" name="cant" />
        </label>
      </div>
      <div>
        <label>
          Precio x unidad:
          <input type="number" min="0" name="price" />
        </label>
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}

export default App;
