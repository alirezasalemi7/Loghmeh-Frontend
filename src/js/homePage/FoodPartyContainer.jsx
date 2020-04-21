import "../../css/home.css"
import React, { Component } from "react";
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext";
import { SnackBar } from "../basics/SnackBar";
import { translateEnglishToPersianNumbers } from "../basics/Utils";
import * as $ from "jquery"
import { FoodCardModal } from "../restaurant/FoodCard";
import PropTypes from 'prop-types';

export class FoodPartyContainer extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            foods: [],
            minutes: 0,
            seconds: 0
        }
        this.getFoods = this.getFoods.bind(this)
        this.getRemainingTime = this.getRemainingTime.bind(this)
    }

    getFoods() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if(!this.mount){
                return
            }
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let foodInfo = JSON.parse(req.response)
                    this.setState({
                        foods: foodInfo
                    })
                }
            }
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/foodParty")
        req.send()
    }

    getRemainingTime() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if(!this.mount){
                return
            }
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let timeInfo = JSON.parse(req.response)
                    this.setState({
                        minutes: timeInfo.minutes,
                        seconds: timeInfo.seconds
                    })
                }
            }
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/foodParty/time")
        req.send()
    }

    componentDidMount() {
        this.getFoods()
        this.getRemainingTime()
        this.mount = true
        this.interval = setInterval(this.getFoods,1000)
        this.intervalTime = setInterval(this.getRemainingTime,1000)
    }

    componentWillUnmount(){
        this.mount = false
        clearInterval(this.intervalTime)
        clearInterval(this.interval)
    }

    render() {
        let foodCards = this.state.foods.map((element, i)=><FoodPartyFoodCard key={i} id={"special"+i} food={element}></FoodPartyFoodCard>)
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
                                        <Timer minutes={this.state.minutes} seconds={this.state.seconds} runAtTimesup={this.getFoods}></Timer>
                                    </div>
                                    <div className="swiper-container row d-flex flex-nowrap flex-row mt-2 justify-content-end mb-4 py-2 px-3 border">
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

    static propTypes = {
        minutes: PropTypes.number.isRequired,
        seconds: PropTypes.number.isRequired,
        runAtTimesup: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            minutes: props.minutes,
            seconds: props.seconds,
        }
        this.update = this.update.bind(this)
    }

    update(){
        if(!this.mount){
            return
        }
        if (this.state.seconds > 0) {
            this.setState(() => ({
                seconds: this.state.seconds - 1
            }))
            setTimeout(this.update,1000)
        }
        else if (this.state.seconds === 0) {
            if (this.state.minutes === 0) {
                this.props.runAtTimesup()
            } else {
                this.setState(() => ({
                    minutes: this.state.minutes - 1,
                    seconds: 59
                }))
            }
            setTimeout(this.update,1000)
        }
    }

    componentDidMount() {
        this.mount = true
        setTimeout(this.update, 1000)
    }

    componentWillUnmount() {
        this.mount = false
    }

    render() {
        if(this.state.minutes===0 && this.state.seconds===0){
            this.state.minutes = this.props.minutes
            this.state.seconds = this.props.seconds
        }
        let minutes = this.state.minutes
        let seconds = this.state.seconds    
        return (
            <div className="food-party-time py-1 mx-auto" dir="rtl">زمان باقی‌مانده: {translateEnglishToPersianNumbers(minutes)}:{translateEnglishToPersianNumbers((seconds < 10) ? `0${seconds}` : seconds)}</div>
        )
    }
}

class FoodPartyFoodCard extends Component {

    static propTypes = {
        id: PropTypes.oneOf([PropTypes.number.isRequired, PropTypes.string.isRequired]),
        food: PropTypes.object.isRequired
    }

    componentWillUnmount() {
        $("#modal-"+this.props.id).modal('hide')
    }

    openModal() {
        $("#modal-"+this.props.id).modal('show')
    }

    render() {
        let buttonClasses = "mx-1 flex-fill rounded-lg count-box border-0 " + ((this.props.food.count === 0) ? "btn-gray disabled" : "med-torq") + " text-white"
        let btnOnClick = ((this.props.food.count === 0) ? ()=>{} : (e)=>this.openModal())
        return (
            <div className="card d-flex flex-column mx-2 flex-wrap align-self-stretch rounded text-center food-party-card">
                <div className="mx-0 px-2 py-2 dashed-border d-flex flex-grow-1 flex-column">
                    <div className="d-flex flex-row flex-grow-1">
                        <div className="px-2 flex-grow-1 flex-column mx-auto">
                            <div className="special-food-name text-right" dir="rtl">{this.props.food.name}</div>
                            <div className="flaticon-star food-card-star text-right" dir="rtl"> {translateEnglishToPersianNumbers(this.props.food.popularity)}</div>
                        </div>
                        <img className="special-food-card-image" src={this.props.food.logo} alt="food image"/>
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
                <FoodCardModal id={"modal-"+this.props.id} food={this.props.food} restaurant={this.props.food.restaurantName} restaurantId={this.props.food.restaurantId} special={true}></FoodCardModal>
            </div>
        )
    }
}