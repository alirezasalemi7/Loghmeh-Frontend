import "../../css/home.css"
import React, { Component } from "react";
import { HomeHeader } from "./HomeHeader";
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext";
import { CartContext } from "../context/CartContext";
import { NavBar } from "../Navbar";
import { Footer } from "../Footer";
import { SnackBar } from "../SnackBar";
import { RestaurantsContainer } from "./Restaurants";
import { FoodPartyContainer } from "./FoodPartyContainer";


export class Home extends Component {

    constructor(props) {
        super(props)
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
                                        <HomeHeader></HomeHeader>
                                        <FoodPartyContainer></FoodPartyContainer>
                                        <RestaurantsContainer></RestaurantsContainer>
                                    </div>
                                )
                            }
                        }
                    </SnackBarGlobalContext.Consumer>
                    <SnackBar></SnackBar>
                </CartContext>
            </SnackBarContext>
        )
    }
}