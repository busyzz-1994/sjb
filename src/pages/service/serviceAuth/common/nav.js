import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
class Nav extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/service/serviceAudit/banner'
            },
            // {
            //     name:'服务类型',
            //     url:'/service/serviceEdit/type'
            // },
            {
                name:'服务文件',
                url:'/service/serviceAudit/file'
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