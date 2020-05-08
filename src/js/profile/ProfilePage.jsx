import React, {Component} from "react"
import "../../css/profilePage.css"
import "../../css/flaticon.css"
import { UserInfoHeader } from "./UserInformation"
import { MainTable } from "./MainTable"
import { NavBar } from "../basics/Navbar"
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext"
import { CartContext } from "../context/CartContext"
import { SnackBar } from "../basics/SnackBar"
import * as $ from 'jquery'
import {PageLoaderSpinner} from '../basics/PageLoadSpinner'
import PropTypes from 'prop-types'

export class ProfilePage extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.mount = false
        this.rendered = false
        this.state = {
            user : [],
        }
        this.getUserInfo = this.getUserInfo.bind(this)
    }

    render() {
        return (
            <SnackBarContext>
                <CartContext>
                    <SnackBarGlobalContext.Consumer>
                        {
                            (data) => {
                                this.show = data.showSnackbar
                                return (
                                    <div className="container-fluid" id="body-container">
                                        <NavBar history={this.props.history}></NavBar>
                                        <UserInfoHeader user={this.state.user}></UserInfoHeader>
                                        <MainTable getUserInfo={this.getUserInfo} increase={this.state.increase}></MainTable>
                                    </div>
                                )
                            }
                        }
                    </SnackBarGlobalContext.Consumer>
                    <SnackBar></SnackBar>
                    <PageLoaderSpinner id="loading-modal"></PageLoaderSpinner>
                </CartContext>
            </SnackBarContext>
        )
    }

    componentDidMount() {
        this.getUserInfo()
        this.mount = true
        this.interval = setInterval(()=>{this.getUserInfo()},5000)
        $("#loading-modal").modal('show')
    }

    getUserInfo() {
        if(!this.mount){
            clearInterval(this.interval)
            return
        }
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    this.setState({
                        user: JSON.parse(req.response)
                    })
                    if(!this.rendered){
                        setTimeout(()=>{$("#loading-modal").modal('hide')},1000)
                        this.rendered = true
                    }
                } else if (req.status === 404) {
                    this.show('کاربری با این نام کاربری پیدا نشد:(')
                }
            }
        }.bind(this)
        req.onerror = function() {
            $("#loading-modal").modal('hide')
            this.setState({user:{name:"سرور",family:"مشکل داره",phoneNumber:"سرور مشکل داره",email:"سرور مشکل داره",credit:"0"}})
            this.show('سرورمون فعلا مشکل داره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/users/profile", true)
        
        req.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('id_token'))
        req.send()
    }

    componentWillUnmount(){
        this.mount = false
        clearInterval(this.interval)
    }

}

