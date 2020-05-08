import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './css/flaticon.css'
import {Footer} from './js/basics/Footer'
import { LoginPage } from './js/login/LoginPage'
import {ProfilePage} from './js/profile/ProfilePage'
import {SignupPage} from './js/signup/SignupPage'
import { Home } from './js/homePage/Home'
import { RestaurantPage } from './js/restaurant/RestaurantPage'
import {Route,Switch,Redirect,Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'

var myHistory = createBrowserHistory()

window.myHistory = myHistory

function App() {
  return (
    <div className="App container-fluid">
      <Router history={myHistory}>
        <Switch>
          <Route exact path="/" component={LoginRender}></Route>
          <Route exact path='/login' component={LoginRender}></Route>
          <Route exact path='/profile' component={ProfileRender}></Route>
          <Route exact path='/signup' component={SignupRender}></Route>
          <Route exact path='/home' component={HomeRender}></Route>
          <Route exact path='/restaurant/:id' render={(props)=>RestaurantRender(props.match.params.id)}></Route>
        </Switch>
      </Router>
      <Footer></Footer>
    </div>
  );
}

function LoginRender(){
  if(localStorage.getItem('auth')){
    return(<Redirect to="/home"></Redirect>)
  }
  else{
    return (<LoginPage history={myHistory}></LoginPage>)
  }
}

function SignupRender(props){
  if(localStorage.getItem('auth')){
    return(<Redirect to="/home"></Redirect>)
  }
  else{
    return (<SignupPage googleDetails={props.location.state} history={myHistory}></SignupPage>)
  }
}

function ProfileRender(){
  if(!localStorage.getItem('auth')){
    return(<Redirect to="/login"></Redirect>)
  }
  else{
    return (<ProfilePage history={myHistory}></ProfilePage>)
  }
}

function HomeRender(){
  if(!localStorage.getItem('auth')){
    return(<Redirect to="/login"></Redirect>)
  }
  else{
    return (<Home history={myHistory}></Home>)
  }
}

function RestaurantRender(id){
  if(!localStorage.getItem('auth')){
    return(<Redirect to="/login"></Redirect>)
  }
  else{ 
    return (<RestaurantPage history={myHistory} id={id}></RestaurantPage>)
  }
}

export default App;
