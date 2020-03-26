import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './css/flaticon.css'
import {Cart} from './js/Cart'
import {SnackBar} from './js/SnackBar'
import {SnackBarContext} from './js/context/SnackBarContext'
import { CartContext } from './js/context/CartContext'

function App() {
  return (
    <SnackBarContext>
      <CartContext>
        <div className="App">
          <SnackBar></SnackBar>
          <Cart></Cart>
        </div>
      </CartContext>
    </SnackBarContext>
  );
}

export default App;
