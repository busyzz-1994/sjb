import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
class Nav extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'内部用户',
                url:'/system/auth/inner'
            },
            {
                name:'地方用户',
                url:'/system/auth/outer'
            },
            {
                name:'定期修改密码设置',
                url:'/system/auth/update'
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