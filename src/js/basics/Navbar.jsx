import React,{Component} from 'react'
import '../../css/navbar.css'
import { CartGlobalContext } from '../context/CartContext'
import {translateEnglishToPersianNumbers, isExpired} from './Utils'
import {CartModal} from './Cart'
import * as $ from 'jquery'
import PropTypes from 'prop-types'

export class NavBar extends Component {
    
    constructor(props){
        super(props)
        this.openCart = this.openCart.bind(this)
        this.exit = this.exit.bind(this)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.profile = this.profile.bind(this)
        this.homePage = this.homePage.bind(this)
        this.history = this.props.history
    }

    static defaultProps = {
        exit : true,
        account : true,
        cart : true,
        login : false,
        signup : false
    }

    static propTypes = {
        exit : PropTypes.bool,
        account : PropTypes.bool,
        cart : PropTypes.bool,
        login : PropTypes.bool,
        signup : PropTypes.bool,
        history : PropTypes.object.isRequired
    }

    exit(){
        localStorage.removeItem('auth')
        if(window.gapi){
            const auth2 = window.gapi.auth2.getAuthInstance()
            if(auth2!=null){
                auth2.signOut().then(auth2.disconnect())
            }
        }
        this.props.history.push('/')
    }

    login(){
        this.props.history.push('/')
    }

    profile() {
        let auth = !isExpired(localStorage.getItem('id_token'))
        localStorage.setItem('auth', auth)
        if (auth)
            this.props.history.push('/profile')
        else
            this.props.history.push('/login')
    }

    signup(){
        this.props.history.push('/signup')
    }

    homePage() {
        let auth = !isExpired(localStorage.getItem('id_token'))
        localStorage.setItem('auth', auth)
        if (auth)
            this.props.history.push('/home')
        else
            this.props.history.push('/login')
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
                                    <img className="img-responsive" id="loghmeh-logo"  src={require("../../assets/LOGO.png")} onClick={this.homePage}></img>
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