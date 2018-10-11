import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
class Nav extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'启动页',
                url:'/advertising/advertisingIssue/start'
            },
            {
                name:'弹出广告',
                url:'/advertising/advertisingIssue/banner'
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