import {Component} from 'react'
import '../css/navbar.css'

class NavBar extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            cart_count: 0
        }
        this.increaseCartBadge.bind(this)
        this.decreaseCartBadge.bind(this)
    }

    static defaultProps = {
        exit : true,
        exit_func : ()=>{},
        account : false,
        account_func : ()=>{},
        cart : true,
        cart_func : ()=>{}
    }

    increaseCartBadge(){
        this.setState(
            (state,props) => ({
                cart_count : state.cart_count + 1
            })
        )
    }

    decreaseCartBadge(){
        this.setState(
            (state,props) => ({
                cart_count : state.cart_count - 1
            })
        )
    }

    render(){
        return(
            <nav className="navbar navbar-expand-sm fixed-top">
                <div className="container-fluid">
                    <div className="nav navbar-nav">
                        {this.props.exit && <a className="nav-item btn my-auto exit-btn" onClick={this.props.exit_func}>خروج</a>}
                        {this.props.account && <a className="nav-item btn text-dark my-auto" onClick={this.props.account_func}>حساب کاربری</a>}
                        {this.props.cart && <a className="nav-item btn my-auto" onClick={this.props.cart_func}>
                            <i className="flaticon-smart-cart">
                                <span className="badge badge-pill med-torq text-light" id="navbar-cart-badge">{this.state.cart_count}</span>
                            </i>
                        </a>}
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <img className="img-responsive" id="loghmeh-logo"  src="../assets/LOGO.png"></img>
                    </div>
                </div>
            </nav>
        )
    }
}