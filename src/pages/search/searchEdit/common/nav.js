import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
class Nav extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'推荐搜索',
                url:'/search/searchEdit/recommend/7'
            },
            {
                name:'热门搜索',
                url:'/search/searchEdit/recommend/8'
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