import React, { Component } from "react";
import "../../css/profilePage.css"
import "../../css/flaticon.css"
import * as $ from "jquery"
import { translateEnglishToPersianNumbers } from "../Utils";
import {OdresGlobalContext} from '../context/OrdersContext'

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
                {(!this.state.innerContent.localeCompare("Orders")) ? <OrderList></OrderList> : <CreditPart increase={(amount)=>{this.props.increase(amount)}}></CreditPart>}
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
            <OdresGlobalContext.Consumer>
                {
                    (data)=><div className="border mx-auto p-4 pt-5 bg-white order-container">
                        {(data.orders.length) ?
                        data.orders.map((element, i) => <OrderItem key={i} status={element.orderStatus} restaurantName={element.restaurantName} itemNumber={i + 1} orderId={element.id} orderDetails={element.details}></OrderItem>) : 
                        <p>سفارش ثبت‌شده‌ای ندارید. برای ثبت سفارش به صفحات رستوران‌ها مراجعه کنید</p>}
                    </div>
                }
            </OdresGlobalContext.Consumer>
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
                    <div className="m-2 restaurant-name" dir="rtl">{this.props.restaurantName}</div>
                </span>
                <span className="col-1" dir="rtl">{translateEnglishToPersianNumbers(this.props.itemNumber)}</span>
                {console.log("HSY" + this.props.orderDetails)}
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