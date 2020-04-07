import "../../css/home.css"
import React, { Component } from "react";
import { HomeHeader } from "./HomeHeader";
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext";
import { CartContext } from "../context/CartContext";
import { NavBar } from "../Navbar";
import { SnackBar } from "../SnackBar";
import { RestaurantsContainer } from "./Restaurants";
import { FoodPartyContainer } from "./FoodPartyContainer";
import {PageLoaderSpinner} from '../PageLoadSpinner'
import * as $ from 'jquery'

export class Home extends Component {

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
                                        <NavBar history={this.props.history}></NavBar>
                                        <HomeHeader></HomeHeader>
                                        <FoodPartyContainer></FoodPartyContainer>
                                        <RestaurantsContainer history={this.props.history}></RestaurantsContainer>
                                    </div>
                                )
                            }
                        }
                    </SnackBarGlobalContext.Consumer>
                    <PageLoaderSpinner id="loading-modal"></PageLoaderSpinner>
                    <SnackBar></SnackBar>
                </CartContext>
            </SnackBarContext>
        )
    }

    componentDidMount(){
        $("#loading-modal").modal('show')
    }
}