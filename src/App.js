import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
            <Route exact path="/cart" render={() => <p>Carrito</p>} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
