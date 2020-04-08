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
                                        {console.log(this.state.minutes + " " + this.state.seconds)}
                                        <Timer runAtTimesup={()=>this.getFoods()}></Timer>
                                    </div>
                                    <div className="swiper-container row d-flex flex-nowrap flex-row mt-2 mb-4 py-2 px-3 border">
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
        this.getRemainigTime = this.getRemainigTime.bind(this)
    }

    getRemainigTime() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let timeInfo = JSON.parse(req.response)
                    this.setState({
                        minutes: timeInfo.minutes,
                        seconds: timeInfo.seconds
                    })
                } else {
                    console.log("server is not responding")
                }
            }
        }.bind(this)
        req.onerror = function () {
            console.log("server is not responding")
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/foodParty", true)
        req.send()
    }

    componentDidMount() {
        this.getRemainigTime()
        this.myInterval = setInterval(() => {
            if (this.state.seconds > 0) {
                this.setState(() => ({
                    seconds: this.state.seconds - 1
                }))
            }
            if (this.state.seconds === 0) {
                if (this.state.minutes === 0) {
                    console.log("NOW ITS HERE")
                    this.props.runAtTimesup()
                    console.log("NOW ITS HERE1")
                    this.getRemainigTime()
                    console.log("NOW ITS HERE2")
                    clearInterval(this.myInterval)
                    console.log("NOW ITS HERE3")
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

    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
        this.updateCount = this.updateCount.bind(this)
    }

    updateCount() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200 && this.mount) {
                    let res = JSON.parse(req.response)
                    this.setState({
                        count: res.count
                    })
                } else {
                    clearInterval(this.updateInterval)
                }
            }
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/foodParty/" + this.props.food.name)
        req.send()
    }

    componentDidMount() {
        this.updateInterval = setInterval(this.updateCount, 1000)
        this.mount = true
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval)
        this.mount = false
    }

    openModal() {
        $("#modal-"+this.props.id).modal('show')
    }

    render() {
        let buttonClasses = "mx-1 flex-fill rounded-lg count-box border-0 " + ((this.state.count === 0) ? "btn-gray disabled" : "med-torq") + " text-white"
        let btnOnClick = ((this.state.count === 0) ? null : (e)=>this.openModal())
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
                            موجودی: {translateEnglishToPersianNumbers(this.state.count)}
                        </div>
                    </div>
                </div>
                <p className="text-center mx-0 mb-0" dir="rtl">{this.props.food.restaurantName}</p>
                <FoodCardModal id={"modal-"+this.props.id} food={this.props.food} restaurant={this.props.restaurantName} restaurantId={this.props.food.restaurantId} special={true}></FoodCardModal>
            </div>
        )
    }
}