import React,{Component} from 'react'

export const OdresGlobalContext = React.createContext()

export class OrdersContext extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            orders:[],
            getOrders:this.getOrders
        }
        this.getOrders = this.getOrders.bind(this)
    }

    render(){
        return(
            <OdresGlobalContext.Provider value={this.state}>
                {this.props.children}
            </OdresGlobalContext.Provider>
        );
    }

    getOrders() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    this.setState({
                        orders: JSON.parse(req.response)
                    })
                    let orders = JSON.parse(req.response)
                    for(let order in orders){
                        if(order.orderStatus != 'Delivered'){
                            setTimeout(this.getOrders,5000)
                            break
                        }
                    }
                }
            }
        }.bind(this)
        req.onerror = function() {
            this.show('سرورمون فعلا مشکل داره:(')
        }.bind(this)
        req.open("GET", "http://127.0.0.1:8080/users/1/orders/all", true)
        req.send()
    }

    componentDidMount(){
        this.getOrders()
    }
}
