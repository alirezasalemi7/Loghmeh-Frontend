import React,{Component} from 'react'
import '../css/login.css'
import {NavBar} from './Navbar'
import {InputField} from './basics/Inputs'
import {SnackBarGlobalContext,SnackBarContext} from './context/SnackBarContext'
import {CartContext} from './context/CartContext'
import {SnackBar} from './SnackBar'
import {PageLoaderSpinner} from './PageLoadSpinner'
import {PageRouter} from './router/PageRouter'
import * as $ from 'jquery'

class LoginPageUpperRow extends Component {

    render(){
        return(
            <div className="row" id="data-column-left">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <img src={require("../assets/LOGO.png")} id="data-column-logo"></img>
                            <h2 dir="rtl" id="data-column-title">بزرگترین سایت سفارش غذا در دانشگاه تهران</h2>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6" id="data-column">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row data-column-info">
                                <div className="col-sm-12 text-center" dir="rtl">
                                    <h3 className="data-column-info-header">اینجا لقمس!</h3>
                                    <p className="data-column-info-text">میدونیم که میدونیا، ولی لقمه جاییه که اگه گشنت باشه، شک نکن سیر میشی!</p>
                                </div>
                            </div>
                            <div className="row" id="data-column-introduction">
                                <div className="col-sm-12 text-center data-column-info" dir="rtl">
                                    <p className="data-column-info-text">حالا چرا لقمه؟ چون هم خوشمزس هم با مشتریاش خوب تا میکنه! باورت نمیشه، بیا تو ببین چه خبره!</p>
                                    <p className="data-column-info-text">ما تو لقمه کلی رستوران باحال با غذا‌های خوشمزه و خفن داریم!!! از ایرانی بگیر تا  ووهانی!! حتی همون سوپ خفاش که تو ذهنته :)))</p>
                                    <p className="data-column-info-text">تازه ما فود پارتی هم داریم!!! تو فودپارتی‌هامون کلی تخفیف خفن داریم که باعث میشه شما عاشقمون بشید!!!</p>
                                    <p className="data-column-info-text">خلاصه از ما گفتن بود! اگه دوسداری وارد بشی برو پایین!!</p>
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
                        <NavBar exit={false} account={false} cart={false} signup={true}></NavBar>
                        <div className="container-fluid" id="body-container">
                            <LoginPageUpperRow></LoginPageUpperRow>
                            <div className="row">
                                <div className="col-sm-12" id="login-col">
                                    <LoginCard></LoginCard>
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

    componentDidMount(){
        $("#loading-modal").modal('show')
        setTimeout(()=>{$("#loading-modal").modal('hide')},1500)
    }
}

class LoginCard extends Component {

    constructor(props){
        super(props)
        this.state = {
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
        if(this.state.username=="" || this.state.username==undefined || this.state.username==null){
            validation.username_empty = true
            empty = true
        }
        if(this.state.password=="" || this.state.password==undefined || this.state.password==null){
            validation.password_empty = true
            empty = true
        }
        if(empty){
            this.setState(validation)
            this.show('زرد رنگارو پر کن')
        }
        else{
            //connect server
            if(true){ //login ok
                this.gotoHomePage()
            }
        }
    }

    gotoHomePage() {
        let router = new PageRouter()
        router.gotoHomePage()
    }

    gotoSignupPage(){
        let router = new PageRouter()
        router.gotoSignupPage()
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
                            <img id="login-card-logo" src={require("../assets/LOGO.png")}></img>
                            <p className="data-column-info-text" dir="rtl"> میخوای بیای تو؟ باشه اول وارد شو بعدش کلی خوراکی منتظرته ;)</p>
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
                                    <p dir="rtl" className="data-column-info-text">
                                        هنوز لقمه‌ای نیستی؟ عیب نداره!
                                        <a onClick={this.gotoSignupPage}>بیا لقمه‌ای شو!</a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
