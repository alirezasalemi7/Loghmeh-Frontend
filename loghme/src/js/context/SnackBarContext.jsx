import React,{Component} from 'react'

export const SnackBarGlobalContext = React.createContext()

export class SnackBarContext extends Component {

    constructor(props){
        super(props)
        this.state = {
            show : false,
            message : "",
            showSnackbar: this.show.bind(this)
        }
        this.show = this.show.bind(this)
    }

    render(){
        return(
            <SnackBarGlobalContext.Provider value = {this.state}>
                {this.props.children}
            </SnackBarGlobalContext.Provider>
        );
    }

    show(message,duration=1500){
        this.setState((state,props)=>({message:message,show:true}))
        setInterval(()=>{this.setState({show:false})},duration)
    }
}

export var SnackBarContextController = new SnackBarContext()
