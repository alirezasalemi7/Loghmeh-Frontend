import React,{Component} from 'react'
import ReactSnackBar from "react-js-snackbar";
import '../../css/snackbar.css'
import {SnackBarGlobalContext} from '../context/SnackBarContext'
export class SnackBar extends Component {

    style = {width:"55px",position:"relative",top:"-17px",left:"5px"}
    render(){
        return (
            <SnackBarGlobalContext.Consumer>
                {
                    (data) => (
                        <div dir="rtl">
                            <ReactSnackBar className="snackbar" Icon={<img alt="" src={require('../../assets/LOGO.png')} style={this.style}></img>} Show={data.show}>
                                <div className="row"  style={{padding:"10px"}}>
                                    <div className="col-sm-12 text-center">
                                        <p dir="rtl" style={{marginTop:"auto",marginBottom:"auto"}}>{data.message}</p>
                                    </div>
                                </div>
                            </ReactSnackBar>
                        </div>
                    )
                }
            </SnackBarGlobalContext.Consumer>
        )
    }
}

