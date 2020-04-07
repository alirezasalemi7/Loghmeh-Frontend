import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './css/flaticon.css'
import {Footer} from './js/Footer'
import { LoginPage } from './js/LoginPage'
import {ProfilePage} from './js/profile/ProfilePage'
import {SignupPage} from './js/SignupPage'
import { Home } from './js/homePage/Home'
import { RestaurantPage } from './js/RestaurantPage'
import {Route,Switch,Redirect,Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'

var history = createBrowserHistory()

function App() {
  return (
    <div className="App">
      <Router history={history}>
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
    return(<Redirect to="\home"></Redirect>)
  }
  else{
    return (<LoginPage history={history}></LoginPage>)
  }
}

function SignupRender(){
  if(localStorage.getItem('auth')){
    return(<Redirect to="\home"></Redirect>)
  }
  else{
    return (<SignupPage history={history}></SignupPage>)
  }
}

function ProfileRender(){
  if(!localStorage.getItem('auth')){
    return(<Redirect to="\login"></Redirect>)
  }
  else{
    return (<ProfilePage history={history}></ProfilePage>)
  }
}

function HomeRender(){
  if(!localStorage.getItem('auth')){
    return(<Redirect to="\login"></Redirect>)
  }
  else{
    return (<Home history={history}></Home>)
  }
}

function RestaurantRender(id){
  if(!localStorage.getItem('auth')){
    return(<Redirect to="\login"></Redirect>)
  }
  else{ 
    return (<RestaurantPage history={history} id={id}></RestaurantPage>)
  }
}

export default App;
