import React,{Component} from 'react'
import Loader from 'react-loader-spinner'
import '../../css/body.css'

export class PageLoaderSpinner extends Component {
    
    render(){
        return(
            <div className="modal" id={this.props.id}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-body">
                        <Loader type={this.props.mode} color="#FFE66D" visible={true} height={200} width={200}/>
                    </div>
                </div>
            </div>
        )
    }

    static defaultProps = {
        mode : 'BallTriangle'
    }
}