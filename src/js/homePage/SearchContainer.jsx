import React, { Component } from "react";
import "../../css/home.css"
import { InputField } from "../basics/Inputs";
import * as $ from 'jquery'
import { RestaurantCart } from "../homePage/Restaurants"
import { SnackBar } from "../basics/SnackBar";
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext";
import PropTypes from 'prop-types';
import { FoodCardSmall } from "../restaurant/FoodCard";

export class SearchContainer extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            foods: [],
            visible: false,
            isFoodSearch: true,
            pageNumber: 0,
            pageCount: 0
        }
        this.getSearchResult = this.getSearchResult.bind(this)
        this.getPageCount = this.getPageCount.bind(this)
        this.updatePageNumber = this.updatePageNumber.bind(this)
    }

    getPageCount(foodName, restaurantName, pageSize) {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let count = JSON.parse(req.response).count
                    return Math.floor(count / pageSize)
                } else return 0
            }
        }.bind(this)
        req.onerror = function() {
            this.show('امکان ارسال درخواست به سرور وجود نداره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/search/count?food_name=" + foodName + "&restaurant_name=" + restaurantName)
        req.send()
    }

    updatePageNumber(number) {
        this.setState({
            pageNumber: number
        })
    }

    getSearchResult(foodName, restaurantName) {
        let pageSize = 24
        let req = new XMLHttpRequest()
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let responseBody = JSON.parse(req.response)
                    let count = this.getPageCount(foodName, restaurantName, pageSize)
                    this.setState({
                        restaurants: responseBody.restaurants,
                        foods: responseBody.foods,
                        visible: true,
                        isFoodSearch: (responseBody.foods.length > 0),
                        pageCount: count
                    })
                } else if (req.status === 500) {
                    this.show('سرور مشکل داره:(')
                } else if (req.status === 404) {
                    this.show('کاربر در سامانه ثبت نشده است')
                }
            }
        }.bind(this)
        req.onerror = function() {
            this.show('امکان ارسال درخواست به سرور وجود نداره:(')
        }.bind(this)
        if (foodName) {
            if (restaurantName) {
                req.open("GET", "http://127.0.0.1:8080/search/restaurants?user_id=1&restaurant_name="+restaurantName+"&page_number="+this.state.pageNumber+"&page_size="+pageSize)
            } else {
                req.open("GET", "http://127.0.0.1:8080/search/foods?user_id=1&food_name="+foodName+"&page_number="+this.state.pageNumber+"&page_size="+pageSize)
            }
        } else if (restaurantName) {
            req.open("GET", "http://127.0.0.1:8080/search/foods_and_restaurants?user_id=1&food_name="+foodName+"&restaurant_name="+restaurantName+"&page_number="+this.state.pageNumber+"&page_size="+pageSize)
        } else {
            this.show('برای جست‌وجو باید حداقل یکی از فیلدها پر شود.')
            return
        }
        req.send()
    }

    render() {
        let foodList = this.state.foods.map((e, i)=><div className="col-sm-4 col-lg-3" key={i}><FoodCardSmall restaurant={e.restaurantName} food={e}></FoodCardSmall></div>)
        let restaurantList = this.state.restaurants.map((element, i)=><RestaurantCart history={this.props.history} key={i} name={element.name} imageSrc={element.logoAddress} id={element.id}></RestaurantCart>)
        return (
            <SnackBarContext>
                <SnackBarGlobalContext.Consumer>
                    {
                        (data) => {
                            this.show = data.showSnackbar
                            return (
                                <div className="text-center mb-5">
                                    <SearchBox search={this.getSearchResult}></SearchBox>
                                    {
                                        this.state.visible && 
                                        <div className="text-center mb-5">
                                            <p className="part-title mx-auto mt-3">نتایج جست‌وجو</p>
                                            <div className="row mx-auto mb-1 search-container" dir="rtl">
                                                {
                                                    this.state.isFoodSearch && foodList.length > 0 && foodList
                                                } {
                                                    this.state.isFoodSearch && foodList.length === 0 && <div className="col-sm-12 text-center"><p dir="rtl">موردی یافت نشد:(</p></div>
                                                } {
                                                    !this.state.isFoodSearch && restaurantList.length > 0 && restaurantList
                                                } {
                                                    !this.state.isFoodSearch && restaurantList.length === 0 && <div className="col-sm-12 text-center"><p dir="rtl">موردی یافت نشد:(</p></div>
                                                }
                                            </div>
                                            {/* Pagination part */}
                                            {/* NOTE: 1. pass a function that changes pageNumber in state of SearchContainer(pass updatePageNumber)
                                                      2. pageNumbers are zero based in server but one based for user. */}
                                        </div>
                                    }
                                </div>
                            )
                        }
                    }
                </SnackBarGlobalContext.Consumer>
                <SnackBar></SnackBar>
            </SnackBarContext>
        )
    }
}

class SearchBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rNameValue: "",
            fNameValue: ""
        }
        this.submit = this.submit.bind(this)
        this.rChange = this.rChange.bind(this)
        this.fChange = this.fChange.bind(this)
    }

    rChange(e) {
        this.setState({
            rNameValue: e.target.value
        })
    }

    fChange(e) {
        this.setState({
            fNameValue: e.target.value
        })
    }

    submit() {
        let foodName = $("#f-input").val()
        let restaurantName = $("#r-input").val()
        if (!foodName) {
            if (!restaurantName) {
                this.show(' برای جست‌وجو باید یکی از فیلدها رو پر کنی')
                this.setState({
                    rNameValue: "",
                    fNameValue: ""
                })
                return;
            }
        }
        this.props.search(foodName, restaurantName)
        this.setState({
            rNameValue: "",
            fNameValue: ""
        })
    }

    render() {
        return (
            <SnackBarContext>
                <SnackBarGlobalContext.Consumer>
                    {
                        (data) => {
                            this.show = data.showSnackbar
                            return (
                                <div className="row justify-content-center bg-white border-0 search-box py-2 px-1 mx-auto rounded">
                                    <button type="submit" className="col-3 search-box-margin text-center border maize rounded" onClick={this.submit}>جست‌و‌جو</button>
                                    <InputField dir="rtl" className="col-4 border search-box-input" value={this.state.rNameValue} err={this.state.rNameError} empty={this.state.rNameEmpty} type="text" onChange={this.rChange} id="r-input" placeholder="نام رستوران"></InputField>
                                    <InputField dir="rtl" className="col-4 border search-box-input" value={this.state.fNameValue} err={this.state.fNameError} empty={this.state.fNameEmpty} type="text" onChange={this.fChange} id="f-input" placeholder="نام غذا"></InputField>
                                </div>
                            )
                        }
                    }
                </SnackBarGlobalContext.Consumer>
                <SnackBar></SnackBar>
            </SnackBarContext>
        )
    }
}