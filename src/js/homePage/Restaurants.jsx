import React, { Component } from "react"
import { SnackBarContext, SnackBarGlobalContext } from "../context/SnackBarContext"
import { SnackBar } from "../basics/SnackBar"
import * as $ from 'jquery'
import PropTypes from 'prop-types'
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';

export class RestaurantsContainer extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            visible: true,
            pageNumber: 0,
            totalPageNumber: 0,
            pageSize: 14
        }
        this.getRestaurants = this.getRestaurants.bind(this)
        this.handlePagination = this.handlePagination.bind(this)
    }

    componentDidMount() {
        this.getRestaurants(0, 14)
    }

    getRestaurants(page_number, page_size) {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let newPage = JSON.parse(req.response)
                    if (newPage.restaurants.length < page_size) {
                        this.setState({
                            pageNumber: this.state.pageNumber + 1,
                            visible: false,
                            restaurants: newPage.restaurants,
                            totalPageNumber: newPage.totalPages
                        })
                    } else {
                        this.setState({
                            pageNumber: this.state.pageNumber + 1,
                            restaurants: newPage.restaurants,
                            totalPageNumber: newPage.totalPages
                        })
                    }
                    setTimeout(()=>{ $("#loading-modal").modal('hide')}, 1000)
                } else {
                    this.show('لطفا پس از مدتی دوباره تلاش کنید.')
                }
            }
        }.bind(this)
        req.onerror = function() {
            $("#loading-modal").modal('hide')
            this.show('سرور فعلا مشکل داره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/restaurants?user_id=1&page_number="+page_number+"&page_size="+page_size, true)
        req.send()
    }

    handlePagination(event,page){
        this.getRestaurants(page-1,this.state.pageSize)
    }

    render() {
        let restaurants = this.state.restaurants.map((element, i)=><RestaurantCart history={this.props.history} key={i} name={element.name} imageSrc={element.logoAddress} id={element.id}></RestaurantCart>)
        return (
            <SnackBarContext>
                <SnackBarGlobalContext.Consumer>
                    {
                        (data) => {
                            this.show = data.showSnackbar
                            return (
                                <div className="text-center mb-5">
                                    <div className="row">
                                        <p className="part-title mx-auto">رستوران‌ها</p>
                                    </div>
                                    <div className="row d-flex justify-content-around mx-auto mb-1 restaurant-container" dir="rtl">
                                        {restaurants.length > 0 && restaurants}
                                        {restaurants.length == 0 &&
                                            <div className="col-sm-12 text-center">
                                                <p dir="rtl">سرور در دسترس نیست!</p>
                                            </div>
                                        }
                                    </div>
                                    <hr></hr>
                                    {
                                        <Grid container justify = "center">
                                            <Pagination count={this.state.totalPageNumber} onChange={this.handlePagination} variant="outlined" color="secondary"/>
                                        </Grid>
                                    }
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

export class RestaurantCart extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        imgSrc: PropTypes.string,
        id: PropTypes.string.isRequired
    }

    gotoRestaurantPage(id) {
        this.props.history.push('/restaurant/'+id)
    }

    render() {
        return (
            <div className="card d-flex align-items-center p-1 restaurant-card border">
                <img className="restaurant-image rounded-circle mb-1 mt-2" src={this.props.imageSrc} alt="Restaurant Image"/>
                <p className="restaurant-name-text mb-2 flex-grow-1">{this.props.name}</p>
                <button type="submit" className="border maize px-2 menu-button" onClick={(e)=>this.gotoRestaurantPage(this.props.id)}>نمایش منو</button>
            </div>
        )
    }
}