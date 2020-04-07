import "../../css/home.css"
import React, { Component } from "react";
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext";
import { SnackBar } from "../SnackBar";
import { translateEnglishToPersianNumbers } from "../Utils";
import * as $ from "jquery"
import { FoodCardModal } from "../FoodCard";


export class FoodPartyContainer extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            foods: [],
            deadLine: 0
        }
        this.getFoods = this.getFoods.bind(this)
    }

    getFoods() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    this.setState({
                        foods: JSON.parse(req.response)
                    })
                } else {
                    this.show('لطفا دوباره تلاش کنید')
                }
            }
        }.bind(this)
        req.onerror = function () {
            this.show('سرور فعلا مشکل داره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/foodParty/all")
        req.send()
    }

    componentDidMount() {
        this.getFoods()
    }

    render() {
        let foodCards = this.state.foods.map((element, i)=><FoodPartyFoodCard key={i} id={i} food={element}></FoodPartyFoodCard>)
        return (
            <SnackBarContext>
                <SnackBarGlobalContext.Consumer>
                    {
                        (data)=> {
                            this.show = data.showSnackbar
                            return (foodCards.length == 0) ? null : (
                                <div>
                                    <div className="text-center">
                                        <p className="part-title mx-auto mb-2" dir="rtl">جشن غذا!</p>
                                        <div className="food-party-time py-1 mx-auto">زمان باقی‌مانده: ۱۲:۲۴</div>
                                    </div>
                                    <div className="swiper-container mt-2 mb-4 py-2 border justify-content-center">
                                        {foodCards}
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

class FoodPartyFoodCard extends Component {

    openModal() {
        $("#modal-"+this.props.id).modal('show')
    }

    render() {
        let buttonClasses = "mx-auto rounded-lg count-box border-0 " + ((this.props.food.count === 0) ? "btn-gray" : "med-torq") + " text-white"
        let btnOnClick = ((this.props.food.count === 0) ? null : (e)=>this.openModal())
        console.log(buttonClasses)
        return (
            <div className="border special-food-card mx-2 rounded text-center bg-white">
                <div className="px-2 py-2 dashed-border">
                    <div className="row special-food-image-row mx-0">
                        <div className="px-0 mx-auto">
                            <div className="special-food-name text-center" dir="rtl">{this.props.food.name}</div>
                            <div className="flaticon-star food-card-star px-1" dir="rtl"> {translateEnglishToPersianNumbers(this.props.food.popularity)}</div>
                        </div>
                        <img className="special-food-card-image" src={this.props.food.image}/>
                    </div>
                    <div className="row special-food-row mx-0 my-1">
                        <div className="col-6 px-2 cost-font text-right">
                            {translateEnglishToPersianNumbers(this.props.food.price)}
                        </div>
                        <div className="col-6 px-2 cost-font text-left old-cost">
                            {translateEnglishToPersianNumbers(this.props.food.oldPrice)}
                        </div>
                    </div>
                    <div className="row special-food-row mx-auto">
                        <button type="submit" className={buttonClasses} onClick={btnOnClick}>
                            خرید
                        </button>
                        <div className="mx-auto rounded-lg border count-box count-box-color">
                            موجودی: {translateEnglishToPersianNumbers(this.props.food.count)}
                        </div>
                    </div>
                </div>
                <p className="text-center footer-font-size mb-0">{this.props.food.restaurantName}</p>
                <FoodCardModal id={"modal-"+this.props.id} food={this.props.food} restaurant={this.props.restaurantName} restaurantId={this.props.food.restaurantId} special={true}></FoodCardModal>
            </div>
        )
    }
}