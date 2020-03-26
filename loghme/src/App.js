import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './css/flaticon.css'
import {Cart} from './js/Cart'

function App() {
  return (
    <div className="App">
      <Cart></Cart>
    </div>
  );
}

export default App;
