import React, { createContext } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Riview from './components/Riview/Riview';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import LogIn from './components/LogIn/LogIn';
import { AuthContextProvider, PrivateRoute } from './components/LogIn/useAuth';
import Shipping from './components/Shipping/Shipping';

// export const UserContext = createContext();

function App() {
  const user = {name: 'PutuMia',email:'putumia@kodu.com'}
  return (
    <div>
      <AuthContextProvider>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/review">
          <Riview></Riview>
          </Route>
          <Route path="/inventory">
          <Inventory></Inventory>
          </Route>
          <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
          <ProductDetails></ProductDetails>
          </Route>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/shipping">
              <Shipping></Shipping>
          </PrivateRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
