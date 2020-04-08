import React, { Component } from "react";
import "../../css/profilePage.css"
import "../../css/flaticon.css"
import * as $ from "jquery"
import { translateEnglishToPersianNumbers,isReal } from "../Utils";
import {SnackBarGlobalContext} from '../context/SnackBarContext'
import Loader from 'react-loader-spinner'
export class MainTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            innerContent : "Orders",
            changePage: this.changePage.bind(this)
        }
        this.changePage = this.changePage.bind(this)
    }

    changePage(e, pageName) {
        e.preventDefault();
        this.setState({
            innerContent: pageName
        })
    }

    render() {
        return (
            <div>
                <SelectorButtons activeButton={this.state.innerContent} changePage={this.state.changePage}></SelectorButtons>
                {(!this.state.innerContent.localeCompare("Orders")) ? <OrderList></OrderList> : <CreditPart getUserInfo={this.props.getUserInfo} increase={(amount)=>{this.props.increase(amount)}}></CreditPart>}
            </div>
        )
    }
}

class CreditPart extends Component {

    constructor(props){
        super(props)
        this.state = {
            spinner:false
        }
        this.increase = this.increase.bind(this)
    }

    clickButton(e) {
        e.preventDefault()
        let amount = $("#increase-credit-input").val()
        this.increase(amount)
    }

    increase(amount) {
        if (!isReal(amount)) {
            this.show('مقدار ورودی باید یک عدد باشد')
            return
        } 
        let amountValue = Number(amount) 
        if (amountValue <= 0) {
            this.show('عدد وارد شده باید مثبت باشد')
            return
        }
        let req = new XMLHttpRequest()
        this.setState({spinner:true})
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                this.setState({spinner:false})
                if (req.status === 200) {
                    this.show('با موفقیت انجام شد:)')
                    this.props.getUserInfo()
                } else if (req.status === 400) {
                    this.show('درخواست اشتباه. دوباره تلاش کنید.')
                }
            }
        }.bind(this)
        req.onerror = function() {
            this.show('سرورمون فعلا مشکل داره:(')
            this.setState({spinner:false})
        }.bind(this)
        req.open("PUT", "http://127.0.0.1:8080/users/1/profile", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({ "credit": amountValue}));
    }

    render() {
        return (
            <div className="border mx-auto p-4 pt-5 bg-white order-container">
                <SnackBarGlobalContext.Consumer>
                    {(data)=>{
                        this.show = data.showSnackbar
                    }}
                </SnackBarGlobalContext.Consumer>
                <div className="container my-3 mx-auto text-center credit-box">
                    <button className="col-4 border-0 mr-2 h-100 med-torq text-white credit-button" onClick={(e)=>{this.clickButton(e)}}>افزایش</button>
                    <input type="text" id="increase-credit-input" className="col-8 border h-100 credit-input" placeholder="میزان افزایش اعتبار"/>
                </div>
                <Loader type="BallTriangle" color="#FF6B6B" visible={this.state.spinner} height={50} width={50}/>
            </div>
        )
    }
}

class SelectorButtons extends Component {
    render() {
        let activeButtonClasses = "border-0 col-6 h-100 pastel-red text-white text-center rounded-right header-button"
        let inactiveButtonClasses = "border col-6 h-100 text-dark bg-white text-center rounded-left header-button"
        return (
            <div className="d-flex mx-auto rounded align-items-center head-button button-shadow">
                <button type="submit" className={(!this.props.activeButton.localeCompare("Credit")) ? activeButtonClasses : inactiveButtonClasses} onClick={(e) => this.props.changePage(e, "Credit")}>افزایش اعتبار</button>
                <button type="submit" className={(!this.props.activeButton.localeCompare("Orders")) ? activeButtonClasses : inactiveButtonClasses} onClick={(e) => this.props.changePage(e, "Orders")}>سفارش‌ها</button>
            </div>
        )
    }
}

class OrderList extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            orders:[],
            spinner : true
        }
        this.getOrders = this.getOrders.bind(this)
    }

    componentDidMount(){
        this.getOrders()
        this.interval = setInterval(this.getOrders,5000)
        this.mount = true
    }

    componentWillUnmount(){
        this.mount = false
        clearInterval(this.interval)
    }

    getOrders() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState === 4 && this.mount) {
                if (req.status === 200) {
                    this.setState({
                        orders: JSON.parse(req.response),
                        spinner : false
                    })
                }
            }
        }.bind(this)
        req.onerror = function() {
            this.setState({spinner : false})
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/users/1/orders", true)
        req.send()
    }

    render() {
        // TODO: add go to restaurant page in else of orderList
        return ( 
            <div className="border mx-auto p-4 pt-5 bg-white order-container">
                <SnackBarGlobalContext.Consumer>
                    {(data)=>{
                        this.show = data.showSnackbar
                    }}
                </SnackBarGlobalContext.Consumer>
                {(this.state.orders.length) ?
                this.state.orders.map((element, i) => <OrderItem key={i} status={element.orderStatus} restaurantName={element.restaurantName} itemNumber={i + 1} orderId={element.id} orderDetails={element.details}></OrderItem>) : (this.state.spinner==false)?
                <p>سفارش ثبت‌شده‌ای ندارید. برای ثبت سفارش به صفحات رستوران‌ها مراجعه کنید</p>:""}
                <Loader type="BallTriangle" color="#FF6B6B" visible={this.state.spinner} height={50} width={50}/>
            </div>
        )
    }
}

class OrderItem extends Component {

    constructor(props) {
        super(props)
        this.showOrderDetails = this.showOrderDetails.bind(this)
    }

    showOrderDetails() {
        $("#order-detail-" + this.props.orderId).modal('show')
    }

    render() {
        return (
            <div className={"row m-3 mint-cream align-items-center order-list-item border text-center"}>
                <span className="col-5">
                    {
                        ((!this.props.status.localeCompare("Delivered")) ?  
                            <button className={"rounded border-0 mx-auto px-1 delivered py-1 my-2 order-status-font"} onClick={this.showOrderDetails}>
                                مشاهده فاکتور
                            </button> : 
                        (!this.props.status.localeCompare("InRoad")) ?
                            <div className={"rounded border-0 mx-auto px-1 delivering py-1 my-2 order-status-font"}>
                                پیک در مسیر
                            </div> : 
                        (!this.props.status.localeCompare("DeliveryManFinding")) ?
                            <div className={"rounded border-0 mx-auto px-1 finding-delivery py-1 my-2 order-status-font"}>
                                در جست‌وجوی پیک
                            </div> : null)
                    }
                </span>
                <span className="col-6 border-right border-left h-100">
                    <div className="m-2 restaurant-name" dir="rtl">{this.props.restaurantName}</div>
                </span>
                <span className="col-1" dir="rtl">{translateEnglishToPersianNumbers(this.props.itemNumber)}</span>
                <OrderDetail id={"order-detail-" + this.props.orderId} details={this.props.orderDetails}>{this.props.restaurantName}</OrderDetail>
            </div>
        )
    }
}

class OrderDetail extends Component {
    render() {
        let foodLists = this.props.details.order.map((element, i)=><tr key={i}><td className="border px-1">{translateEnglishToPersianNumbers(i + 1)}</td><td className="border px-1">{element.name}</td><td className="border px-2">{translateEnglishToPersianNumbers(element.count)}</td><td className="border px-2">{translateEnglishToPersianNumbers(element.cost)}</td></tr>)
        return (
            <div className="modal fade in" id={this.props.id}>
                <div className="modal-dialog modal-dialog-shape">
                    <div className="modal-body mx-auto px-0">
                        <div className="modal-content modal-shape mx-auto px-2">
                            <p className="modal-header pb-1 align-self-center">{this.props.children}</p>
                            <div className="px-5">
                                <table dir="rtl" className="table-style">
                                    <thead className="table-heaader">
                                        <tr>
                                            <td className="border px-1">ردیف</td>
                                            <td className="border px-1">نام غذا</td>
                                            <td className="border px-2">تعداد</td>
                                            <td className="border px-2">قیمت</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foodLists}
                                    </tbody>
                                </table>
                            </div>
                            <b dir="rtl" className="text-left px-5 pt-1 pb-4">جمع کل: {translateEnglishToPersianNumbers(this.props.details.totalCost)} تومان</b>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}