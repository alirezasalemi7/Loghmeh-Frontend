import React,{Component} from 'react'
import {SnackBarGlobalContext} from './SnackBarContext'

export const CartGlobalContext = React.createContext()

export class CartContext extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders : [],
            total : "0",
            spinner : false,
            update : this.updateState.bind(this),
            finalize : this.finalize.bind(this),
            increase : this.increase.bind(this),
            decrease : this.decrease.bind(this)
        }
        this.updateState = this.updateState.bind(this)
        this.finalize = this.finalize.bind(this)
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)
    }

    render(){
        return(
                <SnackBarGlobalContext.Consumer>
                    {
                        (data)=>{
                            this.show = data.showSnackbar
                            return(
                                    <CartGlobalContext.Provider value = {this.state}>
                                        {this.props.children}
                                    </CartGlobalContext.Provider>
                            )
                        }
                    }
                </SnackBarGlobalContext.Consumer>
        );
    }

    componentDidMount(){
        this.updateState()
    }

    updateState(){
        let req = new XMLHttpRequest()
        req.responseType = 'json'
        req.onreadystatechange = function() {
            if(req.readyState === 4 && req.status === 200) {
                this.state.orders = []
                this.setState((state,props)=>({
                    orders : req.response.orders,
                    total : req.response.cost,
                    spinner : false
                }))
            }
            else if(req.readyState === 4 && req.status === 500){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 4040001){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این یوزر تو سرور ثبت نیست")
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 4040001){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این یوزر تو سرور ثبت نیست")
            }
            else if(req.readyState === 4 && req.status === 500 && req.response.status === 500){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else {
                this.setState({spinner:true})
            }
        }.bind(this)
        req.onerror = function(){
            this.setState((state,props)=>({
                spinner : false
            }))
            this.show("سرورمون فعلا مشکل داره :(")
        }.bind(this)
        req.open('GET','http://127.0.0.1:8080/users/1/cart',true)
        req.send()
    }

    finalize(){
        let req = new XMLHttpRequest()
        req.onerror = function(){
            this.setState((state,props)=>({
                spinner : false,
            }))
            this.show("سرورمون فعلا مشکل داره :(")
        }.bind(this)
        req.onreadystatechange = function() {
            if(req.readyState === 4 && req.status === 200) {
                this.setState((state,props)=>({
                    orders : [],
                    total : 0,
                    spinner : false
                }))
                this.show("ثبتش کردم :)")
                this.updateState()
            }
            else if(req.readyState === 4 && req.status === 500){
                this.setState((state,props)=>({
                    spinner : false
                }))
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else if(req.readyState === 4 && req.status === 400){
                this.setState((state,props)=>{
                    let ans = {
                        spinner : false
                    }
                    if(req.response.status === 40001){
                        this.show("نمیتونی با سبد خالی سفارش بدی!")
                    }
                    else{
                        this.show("اعتبار حسابت کمه :(")
                    }
                    return ans
                })
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 4040001){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این یوزر تو سرور ثبت نیست")
            }
            else if(req.readyState === 4 && req.status === 500 && req.response.status === 500){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else {
                this.setState({spinner:true})
            }
        }.bind(this)
        req.responseType = 'json'
        req.open('POST','http://127.0.0.1:8080/users/1/cart',true)
        req.send()
    }

    increase(item){
        let req = new XMLHttpRequest()
        req.responseType = 'json'
        req.onerror = function(){
            this.setState((state,props)=>({
                spinner : false
            }))
            this.show("سرورمون فعلا مشکل داره :(")
        }.bind(this)
        // onreadystatechanges
        req.onreadystatechange = function() {
            if(req.readyState === 4 && req.status === 200) {
                this.setState((state,props)=>({
                    spinner : false
                }))
                this.updateState()
            }
            else if(req.readyState === 4 && req.status === 500){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 40401){
                if(item.special) {
                    item.special = false
                    this.increase(item)
                    return
                }
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این غذا وجود نداره :(")
            }
            else if(req.readyState === 4 && req.status === 403){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("اجازه دسترسی به این رستورانو نداری :(")
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 40402){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این رستوران وجود نداره :(")
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 40401){
                if(item.special == true) {
                    item.special = false
                    this.increase(item)
                    return
                }
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این غذا وجود نداره :(")
            }
            else if(req.readyState === 4 && req.status === 400 && req.response.status === 40001){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("غذا اینقدر موجودی نداره :(")
            }
            else if(req.readyState === 4 && req.status === 400 && req.response.status === 40002){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("درخواستت بده :(")
            }
            else if(req.readyState === 4 && req.status === 400 && req.response.status === 40004){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("تکلیف سفارش قبلی چیه؟")
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 4040001){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این یوزر تو سرور ثبت نیست")
            }
            else if(req.readyState === 4 && req.status === 500 && req.response.status === 500){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else {
                this.setState({spinner:true})
            }
        }.bind(this)
        req.onerror = function(){
            this.setState((state,props)=>({
                spinner : false
            }))
            this.show("سرورمون فعلا مشکل داره :(")
        }.bind(this)
        req.open('PUT','http://127.0.0.1:8080/users/1/cart',true)
        req.setRequestHeader("Content-Type", "application/json")
        req.send(JSON.stringify(item))
    }

    decrease(item){
        let req = new XMLHttpRequest()
        req.responseType = 'json'
        req.onerror = function(){
            this.setState((state,props)=>({
                spinner : false
            }))
            this.show("سرورمون فعلا مشکل داره :(")
        }.bind(this)
        // onreadystatechanges
        req.onreadystatechange = function() {
            if(req.readyState === 4 && req.status === 200) {
                this.setState((state,props)=>({
                    spinner : false
                }))
                this.updateState()
            }
            else if(req.readyState === 4 && req.status === 500){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else if(req.readyState === 4 && req.status === 200 && req.response.status === 40401){
                if(item.special == true) {
                    item.special = false
                    this.decrease(item)
                    return
                }
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این غذا وجود نداره :(")
            }
            else if(req.readyState === 4 && req.status === 403){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("اجازه دسترسی به این رستورانو نداری :(")
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 40402){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این رستوران وجود نداره :(")
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 40401){
                if(item.special == true) {
                    item.special = false
                    this.decrease(item)
                    return
                }
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این غذا وجود نداره :(")
            }
            else if(req.readyState === 4 && req.status === 400 && req.response.status === 40001){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("غذا تموم شده :(")
            }
            else if(req.readyState === 4 && req.status === 400 && req.response.status === 40002){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("درخواستت بده :(")
            }
            else if(req.readyState === 4 && req.status === 404 && req.response.status === 4040001){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("این یوزر تو سرور ثبت نیست")
            }
            else if(req.readyState === 4 && req.status === 500 && req.response.status === 500){
                this.setState((state,props)=>({
                    spinner : false,
                }))
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else {
                this.setState({spinner:true})
            }
        }.bind(this)
        req.open('DELETE','http://127.0.0.1:8080/users/1/cart',true)
        req.setRequestHeader("Content-Type", "application/json")
        req.send(JSON.stringify(item))
    }
}

