import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
class Nav extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'商品类型',
                url:'/discounts/discountsEdit/type'
            },
            {
                name:'商品列表',
                url:'/discounts/discountsEdit/file'
            }
        ]
    }
    render(){
        return (
            <div>
                <NavTab navList = {this.navList} />
            </div>
        )
    }
}
export default Nav;