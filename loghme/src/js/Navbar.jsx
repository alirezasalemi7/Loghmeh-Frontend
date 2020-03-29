import React,{Component} from 'react'
import '../css/navbar.css'
import { CartGlobalContext } from './context/CartContext'
import {tarnslateEnglishToPersianNumbers} from './Utils'
import {CartModal} from './Cart'
import * as $ from 'jquery'

export class NavBar extends Component {
    
    constructor(props){
        super(props)
        this.openCart = this.openCart.bind(this)
    }

    static defaultProps = {
        exit : true,
        exit_func : ()=>{},
        account : true,
        account_func : ()=>{},
        cart : true,
        login : false,
        login_func : ()=>{}
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
                                    {this.props.exit && <a className="nav-item btn my-auto exit-btn" onClick={this.props.exit_func}>خروج</a>}
                                    {this.props.account && <a className="nav-item btn text-dark my-auto" onClick={this.props.account_func}>حساب کاربری</a>}
                                    {this.props.login && <a className="nav-item btn text-dark my-auto" onClick={this.props.login_func}>ورود</a>}
                                    {this.props.cart && <a className="nav-item btn my-auto" onClick={this.openCart}>
                                        <i className="flaticon-smart-cart">
                                            <span className="badge badge-pill med-torq text-light" id="navbar-cart-badge">{tarnslateEnglishToPersianNumbers(data.orders.reduce((a,b)=>(a+Number(b.count)),0))}</span>
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