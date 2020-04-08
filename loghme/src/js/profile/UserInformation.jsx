import React, {Component} from "react"
import "../../css/profilePage.css"
import "../../css/flaticon.css"
import { translateEnglishToPersianNumbers } from "../basics/Utils"
import PropTypes from 'prop-types'

export class UserInfoHeader extends Component {

    static propTypes = {
        user: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    }

    render() {
        return (
            <div className="pastel-red header-info row mb-5 justify-content-between">
                <div className="col-4 align-self-center">
                    <UserInfo infoType="phone" dir="ltr">{translateEnglishToPersianNumbers((this.props.user.phoneNumber)?this.props.user.phoneNumber:'0')}</UserInfo>
                    <UserInfo infoType="mail" dir="ltr">{(this.props.user.email)?this.props.user.email:"داره لود میشه"}</UserInfo>
                    <UserInfo infoType="card" dir="rtl">{translateEnglishToPersianNumbers((this.props.user.credit)?this.props.user.credit:'0')} تومان</UserInfo>
                </div>
                <UserName>{((this.props.user.name)?(this.props.user.name):("داره لود میشه")) + " " + ((this.props.user.family)?(this.props.user.family):("داره لود میشه"))}</UserName>
            </div>
        )
    }
}

class UserName extends Component {

    static propTypes = {
        children: PropTypes.string
    }

    static defaultProps = {
        children: "داره لود میشه"
    }

    render() {
        return (
            <div className="col-6 row text-center text-white align-self-center px-0">
                <div className="col-9 text-right account-name align-self-center">{this.props.children}</div>
                <div className="col-3 flaticon-account pl-0 text-left"></div>
            </div>
        )
    }
}

class UserInfo extends Component {

    static propTypes = {
        infoType: PropTypes.string.isRequired,
        dir: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
    } 

    render() {
        let classNames = "text-white col-2 flaticon-" + this.props.infoType + " pl-0"
        return (<div className="row info-row-hieght">
            <div className="text-white col-10 text-right info-text-size" dir={this.props.dir}>{this.props.children}</div>
            <div className= {classNames}></div>
        </div>)
    }
}