import React,{Component} from 'react'
import {tarnslateEnglishToPersianNumbers} from './Utils'
import {CartGlobalContext} from './context/CartContext'
import '../css/food-card.css'
import '../css/food-detail.css'
import * as $ from 'jquery'

export class FoodCardSmall extends Component {

    constructor(props){
        super(props)
        this.state = {
            special:false
        }
        this.increase = () => {}
        this.openModal = this.openModal.bind(this)
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
                            <button className="btn food-card-btn text-center" onClick={()=>{this.openModal()}} type="button">افزودن به سبد خرید</button>
                        </div>
                    </div>
                </div>
                <FoodCardModal id={"modal-"+this.props.food.key} food={this.props.food} restaurant={this.props.restaurant} restaurantId={this.props.food.restaurant} special={this.state.special}></FoodCardModal>
            </div>
        )
    }

    openModal(){
        $("#modal-"+this.props.food.key).modal('show')
    }
}

export class FoodCardLarge extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            count : 1,
            available : "الان میگم",
            err:false
        }
        this.increase = () => {}
        this.decrease = () => {}
        this.increaseCount = this.increaseCount.bind(this)
        this.decreaseCount = this.decreaseCount.bind(this)
        this.getAvailableCount = this.getAvailableCount.bind(this)
        this.addToCart = this.addToCart.bind(this)
    }

    static defaultProps = {
        special : false
    }

    render(){
        return(
            <div className="modal-content card mx-auto food-detail">
                <div className="card-body food-detail-body">
                    <p className="text-center food-detail-restaurant" dir="rtl">{this.props.restaurant}</p>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <div className="row" dir="rtl">
                                        <p className="food-detail-name" dir="rtl">{this.props.food.name}</p>
                                        <span className="flaticon-star food-detail-star"></span>
                                        <span className="food-detail-star-text">{tarnslateEnglishToPersianNumbers(this.props.food.popularity)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row" dir="rtl">
                                <p dir="rtl" className="food-detail-description">{this.props.food.description}</p>
                            </div>
                            <div className="row" dir="rtl">
                                {
                                    this.props.special &&
                                    <div className="food-detail-red-line">
                                        <div className="row food-detail-price-old" dir="rtl">
                                            {tarnslateEnglishToPersianNumbers(this.props.food.oldPrice)}
                                        </div>
                                    </div>
                                }
                                <div className="row food-detail-price" dir="rtl">
                                    {tarnslateEnglishToPersianNumbers(this.props.food.price)} تومان
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <img className="food-detail-img" src={this.props.food.image}></img>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="row text-center d-flex">
                    <CartGlobalContext.Consumer>
                        {
                            (data)=>{
                                this.increase = data.increase
                                return(<button className="btn food-detail-btn text-center" disabled={this.state.count==0} onClick={this.addToCart} type="button" >اضافه کردن به سبد خرید</button>)
                            }
                        }
                    </CartGlobalContext.Consumer>
                    <span className="flaticon-minus btn food-detail-dec-btn" onClick={this.decreaseCount}></span>
                    <span className="text-center btn disabled food-detail-count">{tarnslateEnglishToPersianNumbers(this.state.count)}</span>
                    <span className="flaticon-plus btn food-detail-inc-btn" onClick={this.increaseCount}></span> 
                    {
                        this.props.special &&
                        ((this.state.available == 0)?
                        (<div className="ml-auto food-detail-available-no" dir="rtl"> موجودی: {tarnslateEnglishToPersianNumbers(this.state.available)}</div>):
                        (this.state.err!=true)?
                        (<div className="ml-auto food-detail-available" dir="rtl"> موجودی: {tarnslateEnglishToPersianNumbers(this.state.available)}</div>):
                        (<div className="ml-auto food-detail-available-err" dir="rtl">{this.state.available}</div>))
                    }
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(this.props.special){
            this.getAvailableCount()
            setInterval(this.getAvailableCount,500)
        }
    }

    addToCart(){
        let json = {}
        json.food = this.props.food.name
        json.restaurant = this.props.restaurantId
        json.food_count = this.state.count
        if(this.props.special){
            json.special = true
        }
        else{
            json.special = false
        }
        this.increase(json)
        this.setState({count:0})
        $("#"+this.props.id).modal('hide')
    }

    getAvailableCount(){
        let req = new XMLHttpRequest()
        req.responseType = 'json'
        req.onreadystatechange = function() {
            if(req.readyState == 4 && req.status == 200){
                this.setState((state,props)=>({
                    available : req.response.count,
                    err : false
                }))
            }
            else if(req.readyState == 4 && req.status == 403){
                this.setState((state,props)=>({
                    available : "اجازه دسترسی نداری",
                    err : true
                }))
            }
            else if(req.readyState == 4 && req.status == 404){
                this.setState((state,props)=>({
                    available : "پیدا نشد",
                    err : true
                }))
            }
            else if(req.readyState == 4 && req.status == 500){
                this.setState((state,props)=>({
                    available : "سرور مشکل داره :(",
                    err : true
                }))
            }
        }.bind(this)
        req.onerror = function(){
            if(req.readyState == 4){
                this.setState((state,props)=>({
                    available : "سرور دسترس نیست :(",
                    err : true
                }))
            }
        }.bind(this)
        req.open('GET','http://127.0.0.1:8080/restaurants/'+this.props.restaurantId+'/'+this.props.food.name,true)
        req.send()
    }

    increaseCount(){
        this.setState((state,props)=>({
            count : state.count+1
        }))
    }

    decreaseCount(){
        this.setState((state,props)=>({
            count : (state.count>0)? state.count-1 : 0
        }))
    }
}

export class FoodCardModal extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="modal fade in" id={this.props.id} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-body">
                        <FoodCardLarge special={this.props.special} id={this.props.id} food={this.props.food} restaurant={this.props.restaurant} restaurantId={this.props.restaurantId}></FoodCardLarge>
                    </div>
                </div>
            </div>
        )
    }

}