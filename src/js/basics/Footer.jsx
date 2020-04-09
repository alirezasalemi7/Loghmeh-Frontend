import React,{Component} from 'react'
import '../../css/footer.css'


export class Footer extends Component {
   
    render(){
        return(
            <div dir="rtl" className="row footer h-100">
                <div className="col-sm-12 my-auto">
                    <div className="text-center footer-copy-right">© تمامی حقوق متعلق به لقمه است.</div>
                </div>
            </div>
        )
    }
}
