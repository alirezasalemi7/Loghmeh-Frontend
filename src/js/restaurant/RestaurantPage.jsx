import React,{Component} from 'react'
import '../../css/RestaurantPage.css'
import {Cart} from '../basics/Cart'
import {Menu} from './Menu'
import * as $ from 'jquery'
import { SnackBarGlobalContext,SnackBarContext } from '../context/SnackBarContext'
import {CartContext} from '../context/CartContext'
import {PageLoaderSpinner} from '../basics/PageLoadSpinner'
import { NavBar } from '../basics/Navbar'
import {SnackBar} from '../basics/SnackBar'
import PropTypes from 'prop-types'
import { exitFromApp } from '../basics/Utils'


var LoghmehLogo = require('../../assets/LOGO.png')


class RestaurantInfoBar extends Component{

    static propTypes = {
        imgSrc : PropTypes.string.isRequired,
        restaurantName : PropTypes.string.isRequired
    }

    render(){
        return(
            <div className="row" id="restaurant-upper-row">
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

    static propTypes = {
        id : PropTypes.string.isRequired,
        history : PropTypes.object.isRequired
    }

    getRestaurantData(){
        $("#loading-modal").modal('show')
        let req = new XMLHttpRequest()
        req.responseType = 'json'
        req.onreadystatechange = function() {
            if(req.readyState === 4){
                $("#loading-modal").modal('hide')
            }
            if(req.readyState === 4 && req.status === 200 && this.mount) {
                this.setState((state,props)=>({
                    logo : req.response.restaurantInfo.logoAddress,
                    menu : req.response.menu,
                    name : req.response.restaurantInfo.name,
                    id : req.response.restaurantInfo.id,
                    valid : true
                }))
            }
            else if(req.readyState === 4 && req.status === 500 && this.mount){
                this.setState({name:"سرور قطعه",logo:LoghmehLogo})
                this.show("سرورمون فعلا مشکل داره :(")
            }
            else if(req.readyState === 4 && req.status === 404 && this.mount){
                this.setState({name:"رستوران وجود نداره",logo:LoghmehLogo})
                this.show("این رستوران وجود نداره :(")
            }
            else if(req.status===403 && req.response.status===null){
                if(localStorage.getItem("auth")){
                    exitFromApp()
                }
            }
            else if(req.readyState === 4 && req.status === 403 && this.mount){
                this.setState({name:"درسترسی غیر مجاز",logo:LoghmehLogo})
                this.show("اجازه دسترسی به این رستورانو نداری :(")
            }
        }.bind(this)
        req.onerror = function(){
            if(this.mount){
                this.setState({name:"سرور قطعه",logo:LoghmehLogo})
                $("#loading-modal").modal('hide')
                this.show("سرورمون فعلا مشکل داره :(")
            }
        }.bind(this)
        req.open('GET','http://10.104.200.201:8080/restaurants/'+this.props.id,true)
        
        req.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('id_token'))
        req.send()
    }
    
    render(){
        return(
            <SnackBarContext>
                <CartContext>
                    <SnackBarGlobalContext.Consumer>
                        {
                            (data) => {
                                this.show = data.showSnackbar
                                return(
                                    <div>
                                        <NavBar history={this.props.history}></NavBar>
                                        <div className="container-fluid" id="restaurant-body-container">
                                            <RestaurantInfoBar restaurantName={this.state.name} imgSrc={this.state.logo}></RestaurantInfoBar>
                                            <div className="row" id="restaurant-middle-row">
                                                <div className="col-sm-8 text-center">
                                                    {this.state.valid && <Menu allFoods={this.state.menu} restaurant={this.state.name} restaurantId={this.props.id}></Menu>}
                                                </div>
                                                <div className="col-sm-4 text-center" id="restaurant-cart-col">
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
                    <SnackBar></SnackBar>
                </CartContext>
            </SnackBarContext>
        )
    }

    componentDidMount(){
        this.getRestaurantData()
        this.mount = true
    }

    componentWillUnmount(){
        this.mount = false
    }
}