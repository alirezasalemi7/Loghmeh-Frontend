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
import {SignupPage} from './js/SignupPage'
import { LoginPage } from './js/LoginPage'

function App() {
  return (
    <div className="App">
      <div id="page-container">
        <LoginPage></LoginPage>
      </div>
      <Footer></Footer>
    </div>
  );
}


export default App;
