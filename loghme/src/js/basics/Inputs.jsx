import React,{Component} from 'react'
import PropTypes from 'prop-types'
import '../../css/input.css'

export class InputField extends Component {

    render(){
        let cls = ((this.props.className) ? (this.props.className + " " + ((this.props.err)? "c-input-err-color" : (this.props.empty)? "c-input-empty-color" : "c-input-color"))
                    : ("mx-auto form-control border h-100" + " " + ((this.props.err)? "c-input-err" : (this.props.empty)? "c-input-empty" : "c-input")))
        console.log(cls)
        return(
            <input type={this.props.type} value={this.props.value} id={this.props.id} onChange={this.props.onChange} className={cls} dir={this.props.dir} placeholder={this.props.placeholder}></input>
        )
    }

    static propTypes = {
        type : PropTypes.string,
        onChange : PropTypes.func,
        dir : PropTypes.string,
        placeholder : PropTypes.string,
        id : PropTypes.string,
        required : PropTypes.bool,
        value : PropTypes.string,
        err : PropTypes.bool.isRequired,
        empty : PropTypes.bool.isRequired,
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