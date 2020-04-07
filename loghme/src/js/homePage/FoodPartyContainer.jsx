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
            minutes: 0,
            seconds: 0
        }
        this.getFoods = this.getFoods.bind(this)
    }

    getFoods() {
        this.setState({
            foods: [],
            minutes: 1,
            seconds: 0
        })
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    console.log(JSON.parse(req.response))
                    let completeInfo = JSON.parse(req.response)
                    this.setState({
                        foods: completeInfo.foods,
                        minutes: completeInfo.minutes,
                        seconds: completeInfo.seconds
                    })
                } else {
                    this.show('لطفا دوباره تلاش کنید')
                }
            }
        }.bind(this)
        req.onerror = function () {
            this.show('سرور فعلا مشکل داره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/foodParty")
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
                            return (foodCards.length === 0) ? null : (
                                <div>
                                    <div className="text-center">
                                        <p className="part-title mx-auto mb-2" dir="rtl">جشن غذا!</p>
                                        <Timer minutes={this.state.minutes} seconds={this.state.seconds} runAtTimesup={()=>this.getFoods()}></Timer>
                                    </div>
                                    <div className="swiper-container row d-flex flex-nowrap flex-row mt-2 mb-4 py-2 border">
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

class Timer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            minutes: 3,
            seconds: 0,
        }
    }

    componentDidMount() {
        this.setState({
            minutes: this.props.minutes,
            seconds: this.props.seconds
        })
        this.myInterval = setInterval(() => {
            if (this.state.seconds >= 0) {
                this.setState(() => ({
                    seconds: this.state.seconds - 1
                }))
            }
            if (this.state.seconds === -1) {
                if (this.state.minutes === 0) {
                    this.props.runAtTimesup()
                    clearInterval(this.myInterval)
                } else {
                    this.setState(() => ({
                        minutes: this.state.minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div className="food-party-time py-1 mx-auto" dir="rtl">زمان باقی‌مانده: {translateEnglishToPersianNumbers(minutes)}:{translateEnglishToPersianNumbers((seconds < 10) ? `0${seconds}` : seconds)}</div>
        )
    }
}

class FoodPartyFoodCard extends Component {

    openModal() {
        $("#modal-"+this.props.id).modal('show')
    }

    render() {
        let buttonClasses = "mx-1 flex-fill rounded-lg count-box border-0 " + ((this.props.food.count === 0) ? "btn-gray disabled" : "med-torq") + " text-white"
        let btnOnClick = ((this.props.food.count === 0) ? null : (e)=>this.openModal())
        return (
            <div className="card d-flex flex-column mx-2 flex-wrap align-self-stretch rounded text-center food-party-card">
                <div className="mx-0 px-2 py-2 dashed-border d-flex flex-column">
                    <div className="d-flex flex-row flex-grow-1">
                        <div className="px-2 flex-grow-1 flex-column mx-auto">
                            <div className="special-food-name text-right" dir="rtl">{this.props.food.name}</div>
                            <div className="flaticon-star food-card-star text-right" dir="rtl"> {translateEnglishToPersianNumbers(this.props.food.popularity)}</div>
                        </div>
                        <img className="special-food-card-image" src={this.props.food.image} alt="restaurant image"/>
                    </div>
                    <div className="d-flex flex-row my-1">
                        <div className="flex-fill px-1 cost-font text-center">
                            {translateEnglishToPersianNumbers(this.props.food.price)}
                        </div>
                        <div className="flex-fill px-1 cost-font text-center old-cost">
                            {translateEnglishToPersianNumbers(this.props.food.oldPrice)}
                        </div>
                    </div>
                    <div className="d-flex flex-row mx-0 justify-content-between">
                        <button type="submit" className={buttonClasses} onClick={()=>btnOnClick()}>
                            خرید
                        </button>
                        <div className="mx-1 flex-fill rounded-lg border count-box count-box-color">
                            موجودی: {translateEnglishToPersianNumbers(this.props.food.count)}
                        </div>
                    </div>
                </div>
                <p className="text-center mx-0 mb-0" dir="rtl">{this.props.food.restaurantName}</p>
                <FoodCardModal id={"modal-"+this.props.id} food={this.props.food} restaurant={this.props.restaurantName} restaurantId={this.props.food.restaurantId} special={true}></FoodCardModal>
            </div>
        )
    }
}