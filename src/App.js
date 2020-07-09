import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar, Cart, AdminMain } from './components'

function App() {
  return (
    <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => <p>Wellcome</p>} />
            <Route exact path="/admin" render={() => <AdminMain />} />
            <Route exact path="/cashier" render={() => <p>Vendedor</p>} />
            <Route exact path="/cart" render={() => <Cart />} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
