import React, { Component } from "react"
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext"
import { SnackBar } from "../SnackBar"
import * as $ from 'jquery'

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
            if (req.readyState === 4) {
                if (req.status === 200) {
                    this.setState({
                        restaurants: JSON.parse(req.response)
                    })
                    setTimeout(()=>{ $("#loading-modal").modal('hide')},1000)
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
        let restaurants = this.state.restaurants.map((element, i)=><RestaurantCart history={this.props.history} key={i} name={element.name} imageSrc={element.img} id={element.id}></RestaurantCart>)
        return (
            <SnackBarContext>
                <SnackBarGlobalContext.Consumer>
                    {
                        (data) => {
                            this.show = data.showSnackbar
                            return (
                                <div className="text-center">
                                    <p className="part-title mx-auto mb-3">رستوران‌ها</p>
                                    <div className="row mx-auto mb-5 restaurant-container" dir="rtl">
                                        {restaurants}
                                    </div>
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
        this.props.history.push('/restaurant/'+id)
    }

    render() {
        return (
            <div className="card d-flex align-items-center p-1 restaurant-card border">
                <img className="restaurant-image rounded-circle mb-1 mt-2" src={this.props.imageSrc} alt="Restaurant Image"/>
                <p className="restaurant-name-text mb-2 flex-grow-1">{this.props.name}</p>
                <button type="submit" className="border maize px-2 menu-button" onClick={(e)=>this.gotoRestaurantPage(this.props.id)}>نمایش منو</button>
            </div>
        )
    }
}