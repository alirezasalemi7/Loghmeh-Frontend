import React from 'react';
import ReactDOM from 'react-dom';
import {LoginPage} from '../LoginPage'
import {SignupPage} from '../SignupPage'

export class PageRouter {
    
    gotoLoginPage(){
        ReactDOM.render(<LoginPage></LoginPage>,document.getElementById('page-container'))
    }

    gotoSignupPage(){
        ReactDOM.render(<SignupPage></SignupPage>,document.getElementById('page-container'))
    }
}
