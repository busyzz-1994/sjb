import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
class Nav extends Component{
    constructor(props){
        super(props)
        this.navList = [
            // {
            //     name:'banner管理',
            //     url:'/video/videoEdit/banner'
            // },
            {
                name:'直播类型',
                url:'/live/liveEdit/type'
            },
            {
                name:'直播列表',
                url:'/live/liveEdit/file'
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