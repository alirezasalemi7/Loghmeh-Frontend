import React,{Component} from 'react'
import '../css/RestaurantPage.css'
import {Cart} from './Cart'
import {Menu} from './FoodGroupContainer'
import * as $ from 'jquery'
import { SnackBarGlobalContext } from './context/SnackBarContext'
import {PageLoaderSpinner} from './PageLoadSpinner'

var LoghmehLogo = require('../assets/LOGO.png')

class RestaurantInfoBar extends Component{

    render(){
        return(
            <div className="row" id="upper-row">
                <div className="col-sm-12">
                    <div className="row">
                        <img src={this.props.imgSrc} id="restaurant-logo" alt="" className="img-thumbnail"></img>
                    </div>
                    <div className="row my-auto">
                        <div className="col-sm-12">
                            <p dir="rtl" className="font-weight-bold text-center" id="restaurant-name">{this.props.restaurantName}</p>    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class RestaurantPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            name : "داره لود میشه",
            logo : "",
            menu : [],
            id : "",
            valid : false
        }
        this.show = () => {}
    }

    getRestaurantData(){
        $("#loading-modal").modal({backdrop:false})
        let req = new XMLHttpRequest()
        req.responseType = 'json'
        req.onreadystatechange = function() {
            if(req.readyState == 4){
                $("#loading-modal").modal('hide')
            }
            if(req.readyState == 4 && req.status == 200) {
                this.setState((state,props)=>({
                    logo : req.response.logo,
                    menu : req.response.menu,
                    name : req.response.name,
                    id : req.response.id,
                    valid : true
                }))
            }
            else if(req.readyState == 4 && req.status == 500){
                this.setState({name:"سرور قطعه",logo:LoghmehLogo})
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else if(req.readyState == 4 && req.status == 404){
                this.setState({name:"رستوران وجود نداره",logo:LoghmehLogo})
                this.show("این رستوران وجود نداره :(")
            }
            else if(req.readyState == 4 && req.status == 403){
                this.setState({name:"درسترسی غیر مجاز",logo:LoghmehLogo})
                this.show("اجازه دسترسی به این رستورانو نداری :(")
            }
        }.bind(this)
        req.onerror = function(){
            this.setState({name:"سرور قطعه",logo:LoghmehLogo})
            $("#loading-modal").modal('hide')
            this.show("سرورمون فعلا مشکل داره :(")
        }.bind(this)
        req.open('GET','http://127.0.0.1:8080/restaurants/'+this.props.id,true)
        req.send()
    }
    
    render(){
        return(
            <SnackBarGlobalContext.Consumer>
                {
                    (data) => {
                        this.show = data.showSnackbar
                        return(
                            <div>
                                <div className="container-fluid" id="body-container">
                                    <RestaurantInfoBar restaurantName={this.state.name} imgSrc={this.state.logo}></RestaurantInfoBar>
                                    <div className="row" id="middle-row">
                                        <div className="col-sm-8 text-center">
                                            {this.state.valid && <Menu allFoods={this.state.menu}></Menu>}
                                        </div>
                                        <div className="col-sm-4 text-center" id="cart-col">
                                            <Cart></Cart>
                                        </div>
                                    </div>
                                </div>
                                <PageLoaderSpinner id="loading-modal"></PageLoaderSpinner>
                            </div>
                        )
                    }
                }
            </SnackBarGlobalContext.Consumer>
        )
    }

    componentDidMount(){
        this.getRestaurantData()
    }
}