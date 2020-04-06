import React from 'react';
import ReactDOM from 'react-dom';
import {LoginPage} from '../LoginPage'
import {SignupPage} from '../SignupPage'
import { RestaurantPage } from '../RestaurantPage';

export class PageRouter {
    
    gotoLoginPage(){
        ReactDOM.render(<LoginPage></LoginPage>,document.getElementById('page-container'))
    }

    gotoSignupPage(){
        ReactDOM.render(<SignupPage></SignupPage>,document.getElementById('page-container'))
    }

    gotoRestaurantPage(id) {
        ReactDOM.render(<RestaurantPage id={id}></RestaurantPage>, document.getElementById('page-container'))
    }
}
