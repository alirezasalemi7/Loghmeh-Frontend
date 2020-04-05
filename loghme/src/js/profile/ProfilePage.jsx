import React, {Component} from "react"
import "../../css/profilePage.css"
import "../../css/flaticon.css"
import { UserInfoHeader } from "./UserInformation"
import { MainTable } from "./MainTable"
import { NavBar } from "../Navbar"
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext"
import { CartContext } from "../context/CartContext"


export class ProfilePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user : [],
            orders : [],
            increase: this.increase.bind(this),
            getUserInfo: this.getUserInfo.bind(this)
        }
        this.increase = this.increase.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.getOrders = this.getOrders.bind(this) 
    }

    render() {
        return (
            <SnackBarContext>
                <CartContext>
                    <SnackBarGlobalContext.Consumer>
                        {
                            (data) => {
                                this.show = data.showSnackbar
                                return (
                                    <div className="container-fluid" id="body-container">
                                        <NavBar></NavBar>
                                        <UserInfoHeader user={this.state.user}></UserInfoHeader>
                                        <MainTable increase={this.state.increase} orders={this.state.orders}></MainTable>
                                    </div>
                                )
                            }
                        }
                    </SnackBarGlobalContext.Consumer>
                </CartContext>
            </SnackBarContext>
        )
    }

    componentDidMount() {
        this.getUserInfo()
        this.getOrders()
    }

    increase(amount) {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                let response = JSON.parse(req.response) 
                console.log()
                console.log("status ->" + req.response)
                if (req.status == 200) {
                    this.show('با موفقیت انجام شد:)')
                    this.getUserInfo()
                } else if (response.status == 4001) {
                    this.show('عدد وارد شده باید مثبت باشد')
                } else if (response.status == 4002) {
                    this.show('مقدار ورودی باید یک عدد باشد')
                } else if (response.status == 4003) {
                    this.show('درخواست اشتباه. دوباره تلاش کنید.')
                }
            }
        }.bind(this)
        req.onerror = function() {
            this.show('سرورمون فعلا مشکل داره:(')
        }.bind(this)
        req.open("POST", "http://127.0.0.1:8080/users/1/profile/addCredit", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({ "credit": amount}));
    }

    getOrders() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    this.setState({
                        orders: JSON.parse(req.response)
                    })
                }
            }
        }.bind(this)
        req.onerror = function() {
            this.show('سرورمون فعلا مشکل داره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/users/1/orders/all", true)
        req.send()
    }

    getUserInfo() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    this.setState({
                        user: JSON.parse(req.response)
                    })
                }
            }
        }.bind(this)
        req.onerror = function() {
            this.show('سرورمون فعلا مشکل داره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/users/1/profile/view", true)
        req.send()
    }

}

