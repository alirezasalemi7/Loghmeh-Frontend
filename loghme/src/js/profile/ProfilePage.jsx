import React, {Component} from "react"
import "../../css/profilePage.css"
import "../../css/flaticon.css"
import { UserInfoHeader } from "./UserInformation"
import { MainTable } from "./MainTable"
import { NavBar } from "../Navbar"
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext"
import { CartContext } from "../context/CartContext"
import { SnackBar } from "../SnackBar"
import { isReal } from "../Utils"
import * as $ from 'jquery'
import {PageLoaderSpinner} from '../PageLoadSpinner'

export class ProfilePage extends Component {

    constructor(props) {
        super(props)
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
        $("#loading-modal").modal('show')
    }

    getUserInfo() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    this.setState({
                        user: JSON.parse(req.response)
                    })
                    setTimeout(()=>{$("#loading-modal").modal('hide')},2000)
                }
            }
        }.bind(this)
        req.onerror = function() {
            this.show('سرورمون فعلا مشکل داره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/users/1/profile/view", true)
        req.send()
    }

}

