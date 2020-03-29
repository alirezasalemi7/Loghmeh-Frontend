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
import {SignupPage} from './js/SignupPage'

function App() {
  return (
    <SnackBarContext>
      <CartContext>
        <div className="App">
          <SignupPage></SignupPage>
          <SnackBar></SnackBar>
          <Footer></Footer>
        </div>
      </CartContext>
    </SnackBarContext>
  );
}


export default App;
