import React, { Component } from "react";
import "../../css/home.css"

export class HomeHeader extends Component {

    render() {
        return (
            <div className="backgruond-image text-center text-white">
                <div className="header-cover h-100">
                    <img src={require("../../assets/LOGO.png")} className="mt-4 logo-image" alt="logo"/>
                    <p className="my-4 mb-2 text-white home-top-text">اولین و بزرگ‌ترین وب‌سایت سفارش آنلاین غذا در دانشگاه تهران</p>
                </div>
            </div>
        )
    }
}