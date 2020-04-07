import React,{Component} from 'react'
import '../css/navbar.css'
import { CartGlobalContext } from './context/CartContext'
import {translateEnglishToPersianNumbers} from './Utils'
import {CartModal} from './Cart'
import * as $ from 'jquery'
import {PageRouter} from './router/PageRouter'

export class NavBar extends Component {
    
    constructor(props){
        super(props)
        this.openCart = this.openCart.bind(this)
        this.exit = this.exit.bind(this)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.profile = this.profile.bind(this)
        this.router = new PageRouter()
    }

    static defaultProps = {
        exit : true,
        account : true,
        account_func : ()=>{},
        cart : true,
        login : false,
        signup : false,
    }

    exit(){
        this.router.gotoLoginPage()
    }

    login(){
        this.router.gotoLoginPage()
    }

    profile() {
        this.router.gotoProfilePage()
    }

    signup(){
        this.router.gotoSignupPage()
    }

    openCart(){
        $('#global-cart').modal('show')
    }

    render(){
        return(
            <CartGlobalContext.Consumer>
                {
                    (data) => (
                    <div>
                        <nav className="navbar navbar-expand-sm fixed-top">
                            <div className="container-fluid">
                                <div className="nav navbar-nav">
                                    {this.props.exit && <a className="nav-item btn my-auto exit-btn" onClick={this.exit}>خروج</a>}
                                    {this.props.account && <a className="nav-item btn text-dark my-auto" onClick={this.profile}>حساب کاربری</a>}
                                    {this.props.login && <a className="nav-item btn text-dark my-auto" onClick={this.login}>ورود</a>}
                                    {this.props.signup && <a className="nav-item btn text-dark my-auto" onClick={this.signup}>ثبت‌نام</a>}
                                    {this.props.cart && <a className="nav-item btn my-auto" onClick={this.openCart}>
                                        <i className="flaticon-smart-cart">
                                            <span className="badge badge-pill med-torq text-light" id="navbar-cart-badge">{translateEnglishToPersianNumbers(data.orders.reduce((a,b)=>(a+Number(b.count)),0))}</span>
                                        </i>
                                    </a>}
                                </div>
                                <div className="nav navbar-nav navbar-right">
                                    <img className="img-responsive" id="loghmeh-logo"  src={require("../assets/LOGO.png")}></img>
                                </div>
                            </div>
                        </nav>
                        <CartModal id="global-cart"></CartModal>
                    </div>
                    )
                }
            </CartGlobalContext.Consumer>
        )
    }
}