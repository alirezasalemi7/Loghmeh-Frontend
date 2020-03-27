import React,{Component} from 'react'
import {tarnslateEnglishToPersianNumbers} from './Utils'
import {CartGlobalContext} from './context/CartContext'
import '../css/food-card.css'

export class FoodCardSmall extends Component {

    constructor(props){
        super(props)
        this.increase = () => {}
    }

    render(){
        return(
            <div className="card food-card">
                <div className="card-body d-flex flex-column food-card-body">
                    <div className="row text-center">
                        <div className="col-sm-12 mx-auto">
                            <img className="food-card-pic" src={this.props.food.image} ></img>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <span className="flaticon-star food-card-star"></span>
                            <span className="food-card-star-text">{tarnslateEnglishToPersianNumbers(this.props.food.popularity)}</span>
                            <span dir="rtl" className="food-card-name">{this.props.food.name}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <span className="food-card-price" dir="rtl">{tarnslateEnglishToPersianNumbers(this.props.food.price)} تومان</span>
                        </div>
                    </div>
                    <div className="row mt-auto">
                        <div className="col-sm-12 text-center">
                            <CartGlobalContext.Consumer>
                                {
                                    (data) => {
                                        this.increase = data.increase
                                        return(<button className="btn food-card-btn text-center" onClick={()=>{this.increase(this.foodInfo())}} type="button">افزودن به سبد خرید</button>)
                                    }
                                }
                            </CartGlobalContext.Consumer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    foodInfo(){
        let json = {
            food : this.props.name,
            restaurant : this.props.restaurant,
            special : false
        }
        return json
    }
}

export class FoodCardLarge extends Component {
    
}

export class FoodCardModal extends Component {

}