import React,{Component} from 'react';
import Head from 'components/header';
import Nav    from 'components/nav';
import style from  './index.scss';
class Wrapper extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
               <Head/>
               <Nav/>
               <div className = {style.wrapperContent}>
                    {this.props.children}
               </div>
            </div>
        )
    }
}
export default Wrapper;