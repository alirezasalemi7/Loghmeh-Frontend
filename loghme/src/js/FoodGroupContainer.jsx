import React,{Component} from 'react'
import '../css/RestaurantPage.css'
import {FoodCardSmall} from './FoodCard'

class FoodRowSize3 extends Component {
    
    render(){
        let foods = this.props.foods
        return(
            <div className="row food-card-row">
                
                <div className="col-sm-4 text-center">
                    {foods.length >= 3 && 
                        <FoodCardSmall food={foods[2]}></FoodCardSmall>
                    }
                </div>
                <div className="col-sm-4 text-center">
                    {foods.length >= 2 && 
                        <FoodCardSmall food={foods[1]}></FoodCardSmall>
                    }
                </div>
                <div className="col-sm-4 text-center">
                    {foods.length >= 1 && 
                        <FoodCardSmall food={foods[0]}></FoodCardSmall>
                    }
                </div>
            </div>
        )
    }
}

Object.defineProperty(Array.prototype, 'chunk', {
    value: function(chunkSize) {
      var R = [];
      for (var i = 0; i < this.length; i += chunkSize)
        R.push(this.slice(i, i + chunkSize));
      return R;
    }
});

export class Menu extends Component {

    render(){
        let foods = this.props.allFoods.map((element)=>{
            element.restaurant = this.props.restaurant
            return element
        }).chunk(3)
        return(
            <div>
                <div className="col-sm-12">
                    <h5 className="component-title">منوی غذا</h5>
                </div>
                {this.props.allFoods.length==0 &&
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 dir="rtl">این رستوران هیچ غذایی نداره!</h3>
                        </div>
                    </div>
                }
                {this.props.allFoods.length!=0 &&
                    foods.map((element,i)=>(<FoodRowSize3 key={i} foods={element}></FoodRowSize3>))
                }
            </div>
        )
    }
}