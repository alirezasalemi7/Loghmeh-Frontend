import React,{Component} from 'react'
import '../../css/RestaurantPage.css'
import {FoodCardSmall} from './FoodCard'

export class Menu extends Component {

    render(){
        let foods = this.props.allFoods.map((element,i)=>{
            element.restaurant = this.props.restaurantId
            element.key = i
            return element
        })
        return(
            <div>
                <div className="col-sm-12">
                    <h5 className="component-title">منوی غذا</h5>
                </div>
                {this.props.allFoods.length===0 &&
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 dir="rtl">این رستوران هیچ غذایی نداره!</h3>
                        </div>
                    </div>
                }
                {this.props.allFoods.length!==0 &&
                    <div className="row restaurant-food-card-row d-flex justify-content-end">
                        {foods.map((e,i)=><div className="col-sm-4 col-lg-3" key={i}><FoodCardSmall restaurant={this.props.restaurant} food={e}></FoodCardSmall></div>)}
                    </div>
                }
            </div>
        )
    }
}