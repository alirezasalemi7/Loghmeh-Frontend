import React,{Component} from 'react'
import {tarnslateEnglishToPersianNumbers} from './Utils'
import '../css/cart.css'
import '../css/navbar.css'
import Loader from 'react-loader-spinner'
import {SnackBar} from './SnackBar'

export class Cart extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders : [],
            total : "0",
            spinner : true,
            snackbar : false,
            snackbar_text : ""
        }
        this.removeSnackbar = this.removeSnackbar.bind(this)
        this.updateState = this.updateState.bind(this)
        this.finalize = this.finalize.bind(this)
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)
        this.updateState()
    }

    static defaultProps = {
        global : false
    }

    updateState(){
        let req = new XMLHttpRequest()
        req.responseType = 'json'
        req.onreadystatechange = function() {
            if(req.readyState == 4 && req.status == 200) {
                this.state.orders = []
                this.setState((state,props)=>({
                    orders : req.response.orders,
                    total : req.response.cost,
                    spinner : false
                }))
            }
            else if(req.readyState == 4 && req.status == 500){
                this.setState((state,props)=>({
                    spinner : false,
                    snackbar : true,
                    snackbar_text : "سرورمون فعلا مشکل داره :("
                }))
                setTimeout(this.removeSnackbar,2000)
            }
            else {
                this.setState({spinner:true})
            }
        }.bind(this)
        req.onerror = function(){
            this.setState((state,props)=>({
                spinner : false,
                snackbar : true,
                snackbar_text : "سرورمون فعلا مشکل داره :("
            }))
            setTimeout(this.removeSnackbar,2000)
        }.bind(this)
        req.open('GET','http://127.0.0.1:8080/users/1/cart/view',true)
        req.send()
    }

    removeSnackbar(){
        this.setState({snackbar:false});
    }

    finalize(){
        let req = XMLHttpRequest()
        req.onerror = function(){
            this.setState((state,props)=>({
                spinner : false,
                snackbar : true,
                snackbar_text : "سرورمون فعلا مشکل داره :("
            }))
            setTimeout(this.removeSnackbar,2000)
        }.bind(this)
        req.onreadystatechange = function() {
            if(req.readyState == 4 && req.status == 200) {
                this.setState((state,props)=>({
                    orders : [],
                    total : 0,
                    spinner : false,
                    snackbar : true,
                    snackbar_text : "ثبتش کردم :D"
                }))
                setTimeout(this.removeFinalize_ok,2000)
            }
            else if(req.readyState == 4 && req.status == 500){
                this.setState((state,props)=>({
                    spinner : false,
                    snackbar : true,
                    snackbar_text : "سرورمون فعلا مشکل داره :("
                }))
                setTimeout(this.removeSnackbar,2000)
            }
            else if(req.readyState == 4 && req.status == 400){
                this.setState((state,props)=>{
                    let ans = {
                        spinner : false,
                        snackbar : true
                    }
                    if(state.orders.length == 0){
                        ans.snackbar_text = "نمیتونی با سبد خالی سفارش بدی!"
                    }
                    else{
                        ans.snackbar_text = "اعتبار حسابت کمه :("
                    }
                    return ans
                })
                setTimeout(this.removeSnackbar,2000)
            }
            else {
                this.setState({spinner:true})
            }
        }.bind(this)
        req.responseType = 'json'
        req.open('POST','http://127.0.0.1:8080/users/1/cart/finalize',true)
        req.send()
    }

    increase(item){
        let req = XMLHttpRequest()
        req.responseType = 'json'
        req.onerror = function(){
            this.setState((state,props)=>({
                spinner : false,
                snackbar : true,
                snackbar_text : "سرورمون فعلا مشکل داره :("
            }))
            setTimeout(this.removeSnackbar,2000)
        }.bind(this)
        // onreadystatechanges
        req.setRequestHeader("Content-Type", "application/json")
        req.open('POST','http://127.0.0.1:8080/users/1/cart/add',true)
        req.send(JSON.stringify(item))
    }

    decrease(item){
        let req = XMLHttpRequest()
        req.responseType = 'json'
        req.onerror = function(){
            this.setState((state,props)=>({
                spinner : false,
                snackbar : true,
                snackbar_text : "سرورمون فعلا مشکل داره :("
            }))
            setTimeout(this.removeSnackbar,2000)
        }.bind(this)
        // onreadystatechanges
        req.setRequestHeader("Content-Type", "application/json")
        req.open('DELETE','http://127.0.0.1:8080/users/1/cart/remove',true)
        req.send(JSON.stringify(item))
    }

    render(){
        return (
            <div className="card text-center cart"> 
                <div className="card-body text-center cart-body">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h4 className={this.props.global?"cart-title-globl":"cart-title"}>سبد خرید</h4>
                        </div>
                    </div>
                    <div className="cart-list">
                        {this.state.orders.length == 0 &&
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <h3 dir="rtl">هنوز هیچی نخریدی!</h3>
                                </div>
                            </div>
                        }
                        {this.state.orders.length != 0 &&
                            this.state.orders.map((element,i) => <CartItem item={element} increase = {} decrease = {} key={i} ></CartItem>)
                        }
                    </div>
                    <div className="row mx-auto ">
                        <div className="col-sm-12">
                            <p dir="rtl" className="text-center cart-total">جمع کل: <b>{tarnslateEnglishToPersianNumbers(this.state.total)} تومان</b></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center"><button className={"btn btn-sm"} onClick={this.finalize} id="btn-finalize">تایید نهایی</button></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Loader type="BallTriangle" color="#FF6B6B" visible={this.state.spinner} height={50} width={50}/>
                        </div>
                    </div>
                    <div>
                        <SnackBar message = {this.state.snackbar_text} show={this.state.snackbar}></SnackBar>
                    </div>
                </div>
            </div>
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

