import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import { NavBar } from './components'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => <p>Wellcome</p>} />
            <Route exact path="/admin" render={() => <p>Admin</p>} />
            <Route exact path="/cashier" render={() => <p>Vendedor</p>} />
            <Route exact path="/cart"><ProductRegister/></Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
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
