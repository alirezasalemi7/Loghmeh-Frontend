import React,{Component} from 'react'
import {translateEnglishToPersianNumbers} from '../basics/Utils'
import {CartGlobalContext} from '../context/CartContext'
import '../../css/food-card.css'
import '../../css/food-detail.css'
import * as $ from 'jquery'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'

export class FoodCardSmall extends Component {

    constructor(props){
        super(props)
        this.state = {
            special:false
        }
        this.increase = () => {}
        this.openModal = this.openModal.bind(this)
    }

    static propTypes = {
        food : PropTypes.object.isRequired,
        restaurant : PropTypes.string.isRequired
    }

    render(){
        return(
            <div className="card food-card">
                <div className="card-body d-flex flex-column food-card-body">
                    <div className="row text-center">
                        <div className="col-sm-12 mx-auto">
                            <img alt="" className="food-card-pic" src={this.props.food.logo} ></img>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <span className="flaticon-star food-card-star"></span>
                            <span className="food-card-star-text">{translateEnglishToPersianNumbers(this.props.food.popularity)}</span>
                            <span dir="rtl" className="food-card-name">{this.props.food.name}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <span className="food-card-price" dir="rtl">{translateEnglishToPersianNumbers(this.props.food.price)} تومان</span>
                        </div>
                    </div>
                    <div className="row mt-auto">
                        <div className="col-sm-12 text-center">
                            <button className="btn food-card-btn text-center" onClick={()=>{this.openModal()}} type="button">افزودن به سبد خرید</button>
                        </div>
                    </div>
                </div>
                <FoodCardModal id={"modal-"+this.props.food.key} food={this.props.food} restaurant={this.props.restaurant} restaurantId={this.props.food.restaurantId} special={this.state.special}></FoodCardModal>
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
            count : 1
        }
        this.increase = () => {}
        this.decrease = () => {}
        this.increaseCount = this.increaseCount.bind(this)
        this.decreaseCount = this.decreaseCount.bind(this)
        this.addToCart = this.addToCart.bind(this)
    }

    static defaultProps = {
        special : false
    }

    static propTypes = {
        food : PropTypes.object.isRequired,
        restaurant : PropTypes.string.isRequired,
        special : PropTypes.bool
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
                                        <span className="food-detail-star-text">{translateEnglishToPersianNumbers(this.props.food.popularity)}</span>
                                        <span className="flaticon-star food-detail-star"></span>
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
                                            {translateEnglishToPersianNumbers(this.props.food.oldPrice)}
                                        </div>
                                    </div>
                                }
                                <div className="row food-detail-price" dir="rtl">
                                    {translateEnglishToPersianNumbers(this.props.food.price)} تومان
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <img alt="" className="food-detail-img" src={this.props.food.logo}></img>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="row text-center d-flex">
                    <CartGlobalContext.Consumer>
                        {
                            (data)=>{
                                this.spinner = data.spinner
                                this.increase = data.increase
                                return(<button className="btn food-detail-btn text-center" disabled={this.state.count===0} onClick={this.addToCart} type="button" >اضافه کردن به سبد خرید</button>)
                            }
                        }
                    </CartGlobalContext.Consumer>
                    <span className="flaticon-minus btn food-detail-dec-btn" onClick={this.decreaseCount}></span>
                    <span className="text-center btn disabled food-detail-count">{translateEnglishToPersianNumbers(this.state.count)}</span>
                    <span className="flaticon-plus btn food-detail-inc-btn" onClick={this.increaseCount}></span> 
                    {
                        this.props.special &&
                        ((this.props.food === 0)?
                        (<div className="ml-auto food-detail-available-no" dir="rtl"> موجودی: {translateEnglishToPersianNumbers(this.props.food.count)}</div>):
                        (<div className="ml-auto food-detail-available" dir="rtl"> موجودی: {translateEnglishToPersianNumbers(this.props.food.count)}</div>))
                    }
                </div>
                {
                    this.props.special &&
                    <div className="row food-detail-spinner">
                        <div className="col-sm-12">
                            <Loader type="BallTriangle" color="#FF6B6B" visible={this.spinner} height={50} width={50}/>
                        </div>
                    </div>
                }
            </div>
        )
    }

    componentDidMount(){
        if(this.props.special){
            this.mount = true
        }
    }

    componentWillUnmount(){
        if(this.props.special){
            this.mount = false
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
        if(!this.props.special){
            $("#"+this.props.id).modal('hide')
        }
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


    static propTypes = {
        id : PropTypes.string.isRequired,
        special : PropTypes.bool.isRequired,
        food : PropTypes.object.isRequired,
        restaurant : PropTypes.string.isRequired,
        restaurantId : PropTypes.string.isRequired
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