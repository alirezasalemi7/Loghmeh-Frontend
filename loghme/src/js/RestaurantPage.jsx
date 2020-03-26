import React,{Component} from 'react'
import '../css/RestaurantPage.css'
import {Cart} from './Cart'
import {SquareFoodGroup} from './FoodGroupContainer'

class RestaurantInfoBar extends Component{

    render(){
        return(
            <div className="row" id="upper-row">
                <div className="col-sm-12">
                    <div className="row">
                        <img src={this.props.imgSrc} id="restaurant-logo" className="img-thumbnail"></img>
                    </div>
                    <div className="row my-auto">
                        <div className="col-sm-12">
                            <p className="font-weight-bold text-center" id="restaurant-name">{this.props.restaurantName}</p>    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class RestaurantPage extends Component {

    
    render(){
        return(
            <div className="container-fluid" id="body-container">
                <RestaurantInfoBar restaurantName="رستوران خامس" imgSrc={"https://static.snapp-food.com/media/cache/vendor_logo/uploads/images/vendors/logos/769_635723249295034061_s.jpg"}></RestaurantInfoBar>
                <div className="row" id="middle-row">
                    <div className="col-sm-8 text-center">
                        <div className="col-sm-12">
                            <h5 className="component-title">منوی غذا</h5>
                        </div>
                        <SquareFoodGroup></SquareFoodGroup>
                    </div>
                    <div className="col-sm-4 text-center" id="cart-col">
                        <Cart></Cart>
                    </div>
                </div>
            </div>
        )
    }
}