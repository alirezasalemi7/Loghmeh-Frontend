import React, { Component } from "react"
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext"
import { SnackBar } from "../SnackBar"
import { PageRouter } from "../router/PageRouter"


export class RestaurantsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurants: []
        }
        this.getRestaurants = this.getRestaurants.bind(this)
    }

    componentDidMount() {
        this.getRestaurants()
    }

    getRestaurants() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    this.setState({
                        restaurants: JSON.parse(req.response)
                    })
                } else {
                    this.show('لطفا پس از مدتی دوباره تلاش کنید.')
                }
            }
        }.bind(this)
        req.onerror = function() {
            this.show('سرور فعلا مشکل داره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/restaurants", true)
        req.send()
    }

    render() {
        let restaurants = this.state.restaurants.map((element)=><RestaurantCart name={element.name} imageSrc={element.img} id={element.id}></RestaurantCart>)
        return (
            <SnackBarContext>
                <SnackBarGlobalContext.Consumer>
                    {
                        (data) => {
                            this.show = data.showSnackbar
                            return (
                                <div class="row mx-auto mb-5 restaurant-container" dir="rtl">
                                    {restaurants}
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

class RestaurantCart extends Component {

    gotoRestaurantPage(id) {
        let router = new PageRouter()
        router.gotoRestaurantPage(id)
    }

    render() {
        return (
            <div class="card align-items-center p-1 restaurant-card border">
                <img class="restaurant-image rounded-circle mb-1 mt-2" src={this.props.imageSrc} alt="Restaurant Image"/>
                <div class="card-body text-center p-0">
                    <p class="restaurant-name-text mb-2">{this.props.name}</p>
                    <button type="submit" class="border maize px-2 menu-button" onClick={(e)=>this.gotoRestaurantPage(this.props.id)}>نمایش منو</button>
                </div>
            </div>
        )
    }
}