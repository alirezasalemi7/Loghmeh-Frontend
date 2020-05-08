import React,{Component} from 'react'
import '../../css/login.css'
import {NavBar} from '../basics/Navbar'
import {InputField} from '../basics/Inputs'
import {SnackBarGlobalContext,SnackBarContext} from '../context/SnackBarContext'
import {CartContext} from '../context/CartContext'
import {SnackBar} from '../basics/SnackBar'
import {PageLoaderSpinner} from '../basics/PageLoadSpinner'
import * as $ from 'jquery'
import PropTypes, { func, string } from 'prop-types'
import Loader from 'react-loader-spinner'
import { isExpired } from '../basics/Utils'



class LoginPageUpperRow extends Component {

    render(){
        return(
            <div className="row" id="login-data-column-left">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <img alt="" src={require("../../assets/LOGO.png")} id="login-data-column-logo"></img>
                            <h2 dir="rtl" id="login-data-column-title">بزرگترین سایت سفارش غذا در دانشگاه تهران</h2>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6" id="login-data-column">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row login-data-column-info">
                                <div className="col-sm-12 text-center" dir="rtl">
                                    <h3 className="login-data-column-info-header">اینجا لقمس!</h3>
                                    <p className="login-data-column-info-text">میدونیم که میدونیا، ولی لقمه جاییه که اگه گشنت باشه، شک نکن سیر میشی!</p>
                                </div>
                            </div>
                            <div className="row" id="login-data-column-introduction">
                                <div className="col-sm-12 text-center login-data-column-info" dir="rtl">
                                    <p className="login-data-column-info-text">حالا چرا لقمه؟ چون هم خوشمزس هم با مشتریاش خوب تا میکنه! باورت نمیشه، بیا تو ببین چه خبره!</p>
                                    <p className="login-data-column-info-text">ما تو لقمه کلی رستوران باحال با غذا‌های خوشمزه و خفن داریم!!! از ایرانی بگیر تا  ووهانی!! حتی همون سوپ خفاش که تو ذهنته :)))</p>
                                    <p className="login-data-column-info-text">تازه ما فود پارتی هم داریم!!! تو فودپارتی‌هامون کلی تخفیف خفن داریم که باعث میشه شما عاشقمون بشید!!!</p>
                                    <p className="login-data-column-info-text">خلاصه از ما گفتن بود! اگه دوسداری وارد بشی برو پایین!!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class LoginPage extends Component {
    
    render(){
        return(
            <SnackBarContext>
                <CartContext>
                    <div>
                        <NavBar history={this.props.history} exit={false} account={false} cart={false} signup={true}></NavBar>
                        <div className="container-fluid" id="login-body-container">
                            <LoginPageUpperRow></LoginPageUpperRow>
                            <div className="row">
                                <div className="col-sm-12" id="login-col">
                                    <LoginCard history={this.props.history}></LoginCard>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SnackBar></SnackBar>
                    <PageLoaderSpinner id="loading-modal"></PageLoaderSpinner>
                </CartContext>
            </SnackBarContext>
        )
    }

    static propTypes = {
        history : PropTypes.object.isRequired
    }

    componentDidMount(){
        $("#loading-modal").modal('show')
        setTimeout(()=>{$("#loading-modal").modal('hide')},1500)
    }
}

class LoginCard extends Component {

    constructor(props){
        super(props)
        this.state = {
            spinner:false,
            username : "",
            username_err : false,
            username_empty : false,
            password : "",
            password_err : false,
            password_empty : false
        }
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.gotoSignupPage = this.gotoSignupPage.bind(this)
        this.gotoHomePage = this.gotoHomePage.bind(this)
        this.googleSignUp = this.googleSignUp.bind(this)
    }

    static propTypes = {
        history : PropTypes.object.isRequired
    }

    componentDidMount(){
        // window.gapi.signin2.render('g-signin2', {
        //     'scope': 'https://www.googleapis.com/auth/plus.login',
        //     'width': 240,
        //     'height': 50,
        //     'longtitle': true,
        //     'theme': 'light',
        //     'color': 'red',
        //     'onsuccess': this.googleSignUp,
        //     'onfailure':()=>{this.show('اتصال با گوگل دچار مشکلی شده:( لطفا دوباره تلاش کنید.')}
        // });
        let googleSignUp = this.googleSignUp
        window.gapi.load('auth2', function(){
            let auth2 = window.gapi.auth2.init({
                client_id: '374722365724-35cvu2uu7paad1851169lc1ni134drl3.apps.googleusercontent.com',
            });
            let element = document.getElementById('googleBtn')
            auth2.attachClickHandler(element, {},
                (e)=>googleSignUp(e), ()=>{this.show('an error occured')}
            );
        });
    }

    onUsernameChange(event){
        this.setState({
            username : event.target.value,
            username_empty : false,
            username_err : false
        })
    }

    onPasswordChange(event){
        this.setState({
            password : event.target.value,
            password_empty : false,
            password_err : false
        })
    }

    onSubmit(){
        let empty = false
        let validation = {}
        if(this.state.username==="" || this.state.username===undefined || this.state.username===null){
            validation.username_empty = true
            empty = true
        }
        if(this.state.password==="" || this.state.password===undefined || this.state.password===null){
            validation.password_empty = true
            empty = true
        }
        if(empty){
            this.setState(validation)
            this.show('زرد رنگارو پر کن')
        }
        else{
            //connect server
            this.setState({spinner:true})
            let req = new XMLHttpRequest()
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        this.setState({spinner:false})
                        let res = JSON.parse(req.response)
                        localStorage.setItem('auth','true')
                        localStorage.setItem('id_token', res.jwt)
                        this.props.history.push('/home')
                    } else if (req.status === 403) {
                        this.setState({spinner:false})
                        this.show('نام کاربری یا رمز عبور رو اشتباه وارد کردی')
                        return
                    } else if (req.status === 400) {
                        this.setState({spinner:false})
                        this.show('لطفا دوباره تلاش کنید.')
                        return
                    } else {
                        this.setState({spinner:false})
                        this.show('سرور فعلا مشکل داره:(')
                        return
                    }
                }
            }.bind(this)
            req.onerror = function() {
                this.setState({spinner:false})
                this.show('سرور فعلا مشکل داره:(')
            }.bind(this)
            req.open("POST", "http://127.0.0.1:8080/login", true)
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.send(JSON.stringify({"email": this.state.username, "password":this.state.password}))
        }
    }

    gotoHomePage() {
        let auth = !isExpired(localStorage.getItem('id_token'))
        localStorage.setItem('auth', auth)
        if (auth)
            this.props.history.push('/home')
        else
            this.props.history.push('/login')
    }

    gotoSignupPage(){
        this.props.history.push('/signup')
    }

    gotoFullSignupPage(state){
        this.props.history.push({
            pathname:"/signup",
            state:state
        })
    }

    async googleSignUp(googleUser) {
        let id_token = googleUser.getAuthResponse().id_token
        console.log("S")
        console.log(googleUser.getAuthResponse())
        console.log("E")
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 400) {
                    this.show('لطفا پس از مدتی دوباره تلاش کنید.')
                    return
                } else if (req.status === 403) {
                    this.show('اطلاعاتتو وارد کن تا ثبت نام کنیم اولش')
                    setTimeout(()=>{this.gotoFullSignupPage(req.response)},3000)
                } else if (req.status === 200) {
                    let res = req.response
                    localStorage.setItem('auth', true)
                    localStorage.setItem('id_token', res.jwt)
                    this.gotoHomePage()
                } else {
                    this.show('سرور فعلا مشکل داره:(')
                    return
                }
            }
        }.bind(this)
        req.onerror = function () {
            this.show('سرور فعلا مشکل داره:(')
        }.bind(this)
        req.responseType = 'json'
        req.open("POST", "http://127.0.0.1:8080/login/google");
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send('token=' + id_token);
    }

    render(){
        return(
            <div>
                <SnackBarGlobalContext.Consumer>
                    {
                        (data)=>{
                            this.show = data.showSnackbar
                            return(<div></div>)
                        }
                    }
                </SnackBarGlobalContext.Consumer>
                <div className="card" id="login-card">
                    <div className="card-header">
                        <div className="col-sm-12 text-center">
                            <img alt="" id="login-card-logo" src={require("../../assets/LOGO.png")}></img>
                            <p className="login-data-column-info-text" dir="rtl"> میخوای بیای تو؟ باشه اول وارد شو بعدش کلی خوراکی منتظرته ;)</p>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row  text-center">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="form-group">
                                        <InputField dir="ltr" value={this.state.username} err={this.state.username_err} onChange={this.onUsernameChange} empty={this.state.username_empty} type="email" id="user-inp" placeholder="ایمیل"></InputField>
                                    </div>
                                    <div className="form-group">
                                        <InputField dir="ltr" value={this.state.password} err={this.state.password_err} onChange={this.onPasswordChange} empty={this.state.password_empty} type="password" id="pass-inp" placeholder="گذر واژه"></InputField>
                                    </div>
                                    <button dir="rtl" className="btn" onClick={this.onSubmit} id="login-card-btn">بریم تو!</button>
                                    <div id="googleBtn" className="row google-login-button justify-content-center py-1 mx-auto mt-2 border">
                                        <img className="google-logo" src={require("../../assets/login/Google Logo.png")} alt="گوگل"/>
                                        <p className="google-login-text ml-2 my-auto">ورود با </p>
                                    </div>
                                    {/* <div className="row justify-content-center py-1 mx-auto mt-2">
                                        <div id="g-signin2"></div>
                                    </div> */}
                                    <p dir="rtl" className="login-data-column-info-text">
                                        هنوز لقمه‌ای نیستی؟!
                                        <a className="link-color" onClick={this.gotoSignupPage}>بیا لقمه‌ای شو!</a>
                                    </p>
                                </div>
                                <div className="col-sm-12">
                                    <Loader type="BallTriangle" color="#FF6B6B" visible={this.state.spinner} height={50} width={50}/>
                                </div>
                            </div>
                            
                            <div className="col-sm-3"></div>
                            <div className="row">
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





{/* <html>
<head>
  <script src="https://apis.google.com/js/api:client.js"></script>
  <script>
  var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
      });
      attachSignin(document.getElementById('customBtn'));
    });
  };

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          document.getElementById('name').innerText = "Signed in: " +
              googleUser.getBasicProfile().getName();
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
  </script> */}
  {/* </head>
  <body>
  <!-- In the callback, you would hide the gSignInWrapper element on a
  successful sign in -->
  <div id="gSignInWrapper">
    <div id="customBtn">
        Google
    </div>
  </div>
  <div id="name"></div>
  <script>startApp();</script>
</body>
</html> */}