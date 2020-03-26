import React,{Component} from 'react'
import ReactSnackBar from "react-js-snackbar";
import '../css/snackbar.css'

export class SnackBar extends Component {

    constructor(props){
        super(props)
    }

    style = {width:"55px",position:"relative",top:"-17px",left:"5px"}

    render(){
        return (
            <div dir="rtl">
                <ReactSnackBar className="snackbar" Icon={<img src={require('../assets/LOGO.png')} style={this.style}></img>} Show={this.props.show}>
                    <div className="row"  style={{padding:"10px"}}>
                        <div className="col-sm-12 text-center">
                            <p dir="rtl" style={{marginTop:"auto",marginBottom:"auto"}}>{this.props.message}</p>
                        </div>
                    </div>
                </ReactSnackBar>
            </div>
        )
    }
}

