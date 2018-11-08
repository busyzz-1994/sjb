import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
class Nav extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/video/videoAudit/banner'
            },
            // {
            //     name:'视频类型',
            //     url:'/video/videoAudit/type'
            // },
            {
                name:'视频列表',
                url:'/video/videoAudit/file'
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