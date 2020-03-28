import React,{Component} from 'react'
import {tarnslateEnglishToPersianNumbers} from './Utils'
import '../css/cart.css'
import '../css/navbar.css'
import Loader from 'react-loader-spinner'
import {CartGlobalContext} from './context/CartContext'

export class Cart extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders : [],
            total : "0",
            spinner : true
        }
    }

    static defaultProps = {
        global : false
    }

    render(){
        return (
            <CartGlobalContext.Consumer>
                {
                    (data)=>(
                        <div className={!this.props.global?"card text-center cart":"modal-content card text-center cart"}> 
                            <div className="card-body text-center cart-body">
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <h4 className={this.props.global?"cart-title-globl":"cart-title"}>سبد خرید</h4>
                                    </div>
                                </div>
                                <div className="cart-list">
                                    {data.orders.length == 0 &&
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                                <p className="cart-total" dir="rtl">هنوز هیچی نخریدی!</p>
                                            </div>
                                        </div>
                                    }
                                    {data.orders.length != 0 &&
                                        data.orders.map((element,i) => <CartItem item={element} increase = {data.increase} decrease = {data.decrease} key={i} ></CartItem>)
                                    }
                                </div>
                                <div className="row mx-auto ">
                                    <div className="col-sm-12">
                                        <p dir="rtl" className="text-center cart-total">جمع کل: <b>{tarnslateEnglishToPersianNumbers(data.total)} تومان</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 text-center"><button className={"btn btn-sm"} disabled={data.orders.length==0} onClick={()=>{data.finalize()}} id="btn-finalize">تایید نهایی</button></div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Loader type="BallTriangle" color="#FF6B6B" visible={data.spinner} height={50} width={50}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </CartGlobalContext.Consumer>
        )
    }
}

class CartItem extends Component {
    
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="btn-group">
                                <span className="flaticon-minus btn cart-item-dec-btn" onClick={()=>{this.props.decrease(this.props.item)}}></span>
                                <span className="text-center btn disabled cart-item-count">{tarnslateEnglishToPersianNumbers(this.props.item.count)}</span>
                                <span className="flaticon-plus btn cart-item-inc-btn" onClick={()=>{this.props.increase(this.props.item)}}></span>
                            </div>
                        </div>
                        <div className="col-sm-8 text-center my-auto">
                            <div dir="rtl" className="cart-item-text">{this.props.item.food}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 text-center">
                            <div dir="rtl" className="cart-item-price">{tarnslateEnglishToPersianNumbers(this.props.item.cost)} تومان</div>
                        </div>
                    </div>
                    <hr></hr>
                </div>
            </div>
        )
    }
}

export class CartModal extends Component {

    render(){
        return(
            <div className="modal fade in" id={this.props.id} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-body">
                        <Cart global={true}></Cart>
                    </div>
                </div>
            </div>
        )
    }
}

