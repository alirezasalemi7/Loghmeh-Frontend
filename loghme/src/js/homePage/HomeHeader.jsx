import React, { Component } from "react";
import "../../css/home.css"

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
    render() {
        return (
            <div className="row justify-content-center bg-white border-0 search-box py-2 px-1 mx-auto">
                <button type="submit" className="col-3 search-box-margin text-center border maize search-box-radius">جست‌و‌جو</button>
                <input type="text" className="col-4 border search-box-input" dir="rtl" placeholder="نام رستوران" />
                <input type="text" className="col-4 border search-box-input" dir="rtl" placeholder="نام غذا" />
            </div>
        )
    }
}