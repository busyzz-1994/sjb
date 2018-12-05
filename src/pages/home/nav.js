import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
class Nav extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'数据看板',
                url:'/'
            },
            {
                name:'用户画像',
                url:'/graph'
            }
        ]
    }
    render(){
        return (
            <div>
                <NavTab exact = {true} navList = {this.navList} />
            </div>
        )
    }
}
export default Nav;