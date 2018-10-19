import React,{Component} from 'react';
import qqNull from './images/qq_null.png';
import wbNull from './images/wb-null.png';
import wxNull from './images/wx-null.png';
import qqFill from './images/qq_fill.png';
import wbFill from './images/wb-fill.png';
import wxFill from './images/wx-fill.png';
//@param  iconList Array[string] 1-> qq  2-> 微博 3->微信
class Icon extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {iconList} = this.props;
        return (
            <div>
                {
                    iconList.indexOf('1') > -1 ? <img src={qqFill} style={{width:'35px',height:'35px'}}/> :  <img src={qqNull} style={{width:'35px',height:'35px'}}/>
                }
                {
                    iconList.indexOf('2') > -1 ? <img src={wbFill} style={{width:'35px',height:'35px'}}/> :  <img src={wbNull} style={{width:'35px',height:'35px'}}/>
                }
                {
                    iconList.indexOf('3') > -1 ? <img src={wxFill} style={{width:'35px',height:'35px'}}/> :  <img src={wxNull} style={{width:'35px',height:'35px'}}/>
                }
            </div>
        )
    }
}
Icon.defaultProps = {
    iconList:[]
}
export default Icon;