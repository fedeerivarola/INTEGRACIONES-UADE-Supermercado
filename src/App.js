import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar, AdminMain, AdminLogin, Ventas, ProductoABM, Facturacion } from './components';
import banner from './assets/kiwki2.jpg'



function App() {

  useEffect(() => {
    async function getProductos() {

      let h = new Headers();
      h.append('Accept', 'application/json');

      let response = await fetch('https://master-market.azurewebsites.net/api/Product/GetAll', {
        method: 'GET',
        mode: 'cors',
        headers: h,
        cache: 'default'
      });
      let data = await response.json();

      console.log(data)

      return data;
    }

    getProductos().then(
      (items) => {
        setProductos(items.productos);
      }
    )
  }, []);

  const [logok, setLogok] = useState(null);
  const [productos, setProductos] = useState(null);

  if (logok) {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/cashier" render={() => <Ventas productos={productos} />} />
            <Route exact path="/admin" render={() => <AdminMain />} />
            <Route exact path="/finanzas" render={() => <Facturacion />} />
            <Route exact path="/products" render={() => <ProductoABM />} />
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
