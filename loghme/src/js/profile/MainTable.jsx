import React, { Component } from "react";
import "../../css/profilePage.css"
import "../../css/flaticon.css"
import * as $ from "jquery"
import { translateEnglishToPersianNumbers } from "../Utils";


export class MainTable extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.orders)
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
                {(!this.state.innerContent.localeCompare("Orders")) ? <OrderList orders={this.props.orders}></OrderList> : <CreditPart increase={(amount)=>{this.props.increase(amount)}}></CreditPart>}
            </div>
        )
    }
}

class CreditPart extends Component {

    clickButton(e) {
        e.preventDefault()
        let amount = $("#increase-credit-input").val()
        this.props.increase(amount)
    }

    render() {
        return (
            <div className="border mx-auto p-4 pt-5 bg-white order-container">
                <div className="container my-3 mx-auto text-center credit-box">
                    <button className="col-4 border-0 mr-2 h-100 med-torq text-white credit-button" onClick={(e)=>{this.clickButton(e)}}>افزایش</button>
                    <input type="text" id="increase-credit-input" className="col-8 border h-100 credit-input" placeholder="میزان افزایش اعتبار"/>
                </div>
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
    render() {
        // TODO: add go to restaurant page in else of orderList
        return ( 
            <div className="border mx-auto p-4 pt-5 bg-white order-container">
                {(this.props.orders.length) ?
                this.props.orders.map((element, i) => <OrderItem key={i} status={element.orderStatus} restaurantName={element.restaurantName} itemNumber={i + 1} orderId={element.id} orderDetails={element.details}></OrderItem>) : 
                <p>سفارش ثبت‌شده‌ای ندارید. برای ثبت سفارش به صفحات رستوران‌ها مراجعه کنید</p>}
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
                            <button className={"rounded border-0 mx-auto px-1 delivered order-status-font"} onClick={this.showOrderDetails}>
                                مشاهده فاکتور
                            </button> : 
                        (!this.props.status.localeCompare("InRoad")) ?
                            <div className={"rounded border-0 mx-auto px-1 delivering order-status-font"}>
                                پیک در مسیر
                            </div> : 
                        (!this.props.status.localeCompare("DeliveryManFinding")) ?
                            <div className={"rounded border-0 mx-auto px-1 finding-delivery order-status-font"}>
                                در جست‌وجوی پیک
                            </div> : null)
                    }
                </span>
                <span className="col-6 border-right border-left h-100">
                    <div className="m-2 restaurant-name">{this.props.restaurantName}</div>
                </span>
                <span className="col-1">{translateEnglishToPersianNumbers(this.props.itemNumber)}</span>
                {console.log("HSY" + this.props.orderDetails)}
                <OrderDetail id={"order-detail-" + this.props.orderId} details={this.props.orderDetails}>{this.props.restaurantName}</OrderDetail>
            </div>
        )
    }
}

class OrderDetail extends Component {
    render() {
        // console.log("HAY" + this.props.details.order)
        let foodLists = this.props.details.order.map((element, i)=><tr><td>{i}</td><td>{element.name}</td><td>{element.count}</td><td>{element.cost}</td></tr>)
        return (
            <div className="modal fade in"  id={this.props.id}>
                <div className="modal-body">
                <div className="modal-content card mx-auto">
                    <h1>{this.props.children}</h1>
                        <table>
                            <thead>
                                <tr>ردیف</tr>
                                <tr>نام غذا</tr>
                                <tr>تعداد</tr>
                                <tr>قیمت</tr>
                            </thead>
                            <tbody>
                                {foodLists}
                            </tbody>
                        </table>
                        <p dir="rtl">جمع کل: {this.props.details.totalCost} تومان</p>
                    </div>
                </div>
            </div>
        )
    }
}