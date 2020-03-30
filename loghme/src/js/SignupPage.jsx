import React,{Component} from 'react'
import '../css/signup.css'
import {NavBar} from './Navbar'
import {InputField} from './basics/Inputs'
import {SnackBarGlobalContext,SnackBarContext} from './context/SnackBarContext'
import {CartContext} from './context/CartContext'
import {validateEmail,isNumeric} from './Utils'
import {SnackBar} from './SnackBar'
import {PageLoaderSpinner} from './PageLoadSpinner'
import * as $ from 'jquery'
import {PageRouter} from './router/PageRouter'

export class SignupPage extends Component {
    
    render(){
        return(
            <SnackBarContext>
                <CartContext>
                    <NavBar exit={false} account={false} cart={false} login={true}></NavBar>
                    <div className="container-fluid" id="body-container">
                        <SignupPageUpperRow></SignupPageUpperRow>
                        <div className="row">
                            <div className="col-sm-12" id="signup-card-col">
                                <div className="card" id="signup-card">
                                    <SignupCard></SignupCard>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <SnackBar></SnackBar>
                    <PageLoaderSpinner id="loading-modal"></PageLoaderSpinner>
                </CartContext>
            </SnackBarContext>
        )
    }

    componentDidMount(){
        $("#loading-modal").modal('show')
        setTimeout(()=>{$("#loading-modal").modal('hide')},1500)
    }
}

class SignupCard extends Component{

    constructor(props){
        super(props)
        this.state = {
            firstname : "",
            firstname_empty:false,
            firstname_err:false,
            lastname : "",
            lastname_empty:false,
            lastname_err:false,
            phone : "",
            phone_err:false,
            phone_empty:false,
            email : "",
            email_err:false,
            email_empty:false,
            password : "",
            password_err:false,
            password_empty:false,
            re_password : "",
            re_password_err:false,
            re_password_empty:false
        }
        this.passwordChange = this.passwordChange.bind(this)
        this.re_passwordChange = this.re_passwordChange.bind(this)
        this.emailChange = this.emailChange.bind(this)
        this.phoneChange = this.phoneChange.bind(this)
        this.firstnameChange = this.firstnameChange.bind(this)
        this.lastnameChange = this.lastnameChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    passwordChange(event){
        this.setState({password : event.target.value,password_empty:false,password_err:false,re_password_err:false})
    }

    re_passwordChange(event){
        this.setState({re_password : event.target.value,re_password_empty:false,re_password_err:false,password_err:false})
    }

    emailChange(event){
        this.setState({email : event.target.value,email_empty:false,email_err:false})
    }

    phoneChange(event){
        this.setState({phone : event.target.value,phone_empty:false,phone_err:false})
    }

    firstnameChange(event){
        this.setState({firstname : event.target.value,firstname_empty:false,firstname_err:false})
    }

    lastnameChange(event){
        this.setState({lastname : event.target.value,lastname_empty:false,lastname_err:false})
    }

    onSubmit(){
        let validatation = {}
        let err_pass = false
        let empty = false
        let err_email = false
        let err_phone = false
        if(this.state.firstname=="" || this.state.firstname==null || this.state.firstname==undefined){
            validatation.firstname_empty = true
            empty = true
        }
        if(this.state.lastname=="" || this.state.lastname==null || this.state.lastname==undefined){
            validatation.lastname_empty = true
            empty = true
        }
        if(this.state.phone=="" || this.state.phone==null || this.state.phone==undefined){
            validatation.phone_empty = true
            empty = true
        }
        else if(!(isNumeric(this.state.phone) && this.state.phone.length==11)){
            err_phone = true
            validatation.phone_err = true
        }
        if(this.state.email=="" || this.state.email==null || this.state.email==undefined){
            validatation.email_empty = true
            empty = true
        }
        else if(!validateEmail(this.state.email)){
            err_email = true
            validatation.email_err = true
        }
        if(this.state.password=="" || this.state.password==null || this.state.password==undefined){
            validatation.password_empty = true
            empty = true
        }
        if(this.state.re_password=="" || this.state.re_password==null || this.state.re_password==undefined){
            validatation.re_password_empty = true
            empty = true
        }
        if(!validatation.password_empty && !validatation.re_password_empty){
            if(this.state.password!==this.state.re_password){
                validatation.password_err = true
                validatation.re_password_err = true
                err_pass=true
            }
        }
        let err_msg = ""
        if(empty){
            err_msg += 'زردارو پر کن '
        }
        if(err_pass){
            err_msg += 'پسوردا مچ نیست '
        }
        if(err_email){
            err_msg += 'ایمیل غلطه '
        }
        if(err_phone){
            err_msg += 'تلفن غلطه'
        }
        if(empty || err_pass || err_email || err_phone){
            this.setState((state,props)=>(validatation))
            this.show(err_msg)
        }
        else{
            //connect server
            if(true){ // signup ok
                this.show('ثبت‌نام موفق بود! برو وارد شو',2000)
                setTimeout(
                    ()=>{
                        let router = new PageRouter()
                        router.gotoLoginPage()
                    },
                    2000
                )
            }
        }
    }
    
    render(){
        return(
            <div>
                <SnackBarGlobalContext.Consumer>
                    {(data)=>{
                        this.show = data.showSnackbar
                        return(<div></div>)
                    }}
                </SnackBarGlobalContext.Consumer>
                <div className="card-header">
                    <div className="col-sm-12 text-center">
                        <p className="data-column-info-text" dir="rtl">وقتشه که لقمتو بگیری! واسه شروع اطلاعاتتو بده ثبت کنیم تا برسیم به بعدش :)</p>
                        <p className="data-column-info-text" dir="rtl">ما واسه عضو شدنت تو لقمه فقط یه شرط داریم، ازش لذت ببری :)</p>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row  text-center">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <div className="form-group row">
                                    <div className="col-sm-12 text-center">
                                        <InputField dir="rtl" value={this.state.firstname} onChange={this.firstnameChange} err={this.state.firstname_err} empty={this.state.firstname_empty} type="text" id="name-inp" placeholder="نام"></InputField>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 text-center">
                                        <InputField dir="rtl" value={this.state.lastname} onChange={this.lastnameChange} err={this.state.lastname_err} empty={this.state.lastname_empty} type="text" id="lastname-inp" placeholder="نام خانوادگی"></InputField>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 text-center">
                                        <InputField dir="ltr" value={this.state.phone} err={this.state.phone_err} empty={this.state.phone_empty} type="tel" onChange={this.phoneChange} id="phone-inp" placeholder="شماره همراه"></InputField>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 text-center">
                                        <InputField dir="ltr" value={this.state.email} err={this.state.email_err} empty={this.state.email_empty} type="email" onChange={this.emailChange} id="email-inp" placeholder="ایمیل"></InputField>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 text-center">
                                        <InputField dir="ltr" value={this.state.password} err={this.state.password_err} empty={this.state.password_empty} type="password" onChange={this.passwordChange} id="pass-inp" placeholder="گذر واژه"></InputField>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 text-center">
                                        <InputField dir="ltr" value={this.state.re_password} err={this.state.re_password_err} empty={this.state.re_password_empty} type="password" onChange={this.re_passwordChange} id="pass-re-inp" placeholder="تکرار گذر واژه"></InputField>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <button dir="rtl" className="btn" onClick={this.onSubmit}  id="signup-card-btn">ثبت نام!</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <p dir="rtl" className="data-column-text">
                                            تو لقمه‌ای بودی؟ بزم بریم
                                            <a dir="rtl" href="./Login.html">وارد شیم!</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}

class SignupPageUpperRow extends Component {
    
    render(){
        return(
            <div className="row" id="upper-row">
                <div className="layer"></div>
                <div className="col-sm-12 text-center">
                    <img src={require('../assets/LOGO.png')} id="upper-row-img"></img>
                    <h2 dir="rtl" id="upper-row-title">بزرگترین سایت سفارش غذا در دانشگاه تهران</h2>
                </div>
            </div>
        )
    }
}