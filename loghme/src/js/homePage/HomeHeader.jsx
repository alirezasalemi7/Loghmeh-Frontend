import React, { Component } from "react";
import "../../css/home.css"
import { InputField } from "../basics/Inputs";
import * as $ from 'jquery'
import { SnackBar } from "../basics/SnackBar";
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext";

export class HomeHeader extends Component {

    render() {
        return (
            <div className="backgruond-image text-center text-white mb-5">
                <div className="header-cover h-100">
                    <img src={require("../../assets/LOGO.png")} className="mt-4 logo-image" alt="logo"/>
                    <p className="my-4 text-white home-top-text">اولین و بزرگ‌ترین وب‌سایت سفارش آنلاین غذا در دانشگاه تهران</p>
                    <SearchBox></SearchBox>
                </div>
            </div>
        )
    }
}

class SearchBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rNameError: false,
            rNameEmpty: false,
            rNameValue: "",
            fNameError: false,
            fNameEmpty: false,
            fNameValue: ""
        }
        this.submit = this.submit.bind(this)
        this.rChange = this.rChange.bind(this)
        this.fChange = this.fChange.bind(this)
    }

    rChange(e) {
        this.setState({
            rNameError: false,
            rNameEmpty: false,
            rNameValue: e.target.value
        })
    }

    fChange(e) {
        this.setState({
            fNameError: false,
            fNameEmpty: false,
            fNameValue: e.target.value
        })
    }

    submit() {
        let restaurantName = $("#r-input").val()
        if (!restaurantName) {
            this.setState({
                rNameEmpty: true
            })
            this.show('نام رستوران رو پر کن')
        }
        let foodName = $("#f-input").val()
        if (!foodName) {
            this.setState({
                fNameEmpty: true
            })
            this.show('نام غذا رو پر کن')
        }
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
                                <div className="row justify-content-center bg-white border-0 search-box py-2 px-1 mx-auto">
                                    <button type="submit" className="col-3 search-box-margin text-center border maize search-box-radius" onClick={this.submit}>جست‌و‌جو</button>
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