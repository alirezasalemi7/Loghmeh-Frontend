import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './css/flaticon.css'
import {SnackBar} from './js/SnackBar'
import {SnackBarContext} from './js/context/SnackBarContext'
import { CartContext } from './js/context/CartContext'
import {Footer} from './js/Footer'
import {RestaurantPage} from './js/RestaurantPage'


function App() {
  return (
    <SnackBarContext>
      <CartContext>
        <div className="App">
          <RestaurantPage id ="5e4fcf14af68ed25d5900f0e"></RestaurantPage>
          <SnackBar></SnackBar>
          <Footer></Footer>
        </div>
      </CartContext>
    </SnackBarContext>
  );
}

export default App;
