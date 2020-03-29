import React,{Component} from 'react'
import '../../css/input.css'

export class InputField extends Component {

    render(){
        let cls = (this.props.err)? "c-input-err mx-auto form-control border h-100" : (this.props.empty)? "c-input-empty mx-auto form-control border h-100" : "c-input mx-auto form-control border h-100"
        return(
            <input type={this.props.type} value={this.props.value} id={this.props.id} onChange={this.props.onChange} className={cls} dir={this.props.dir} placeholder={this.props.placeholder}></input>
        )
    }

    static defaultProps = {
        type : "text",
        onChange : (e)=>{},
        dir : "rtl",
        placeholder : "",
        id : "",
        required : false,
        value : ""
    }
}