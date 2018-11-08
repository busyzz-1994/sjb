import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import style from '../common/banner.scss';
import _mm from 'util/mm.js';
import Bread from 'components/global/bread';
import BannerDetail from 'components/global/bannerDetail';
class BannerAdd extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/news/newsIssue/banner'
            },
            {
                name:'新闻类型',
                url:'/news/newsIssue/type'
            },
            {
                name:'新闻列表',
                url:'/news/newsIssue/file'
            }
        ]
        this.state = {
            breadList:[
                {
                    name:'banner管理',
                    path:'/news/newsIssue/banner'
                },
                {
                    name:'新增banner',
                    path:''
                }
            ],
            checked:_mm.getParam('checked'),
            name:_mm.getParam('name')
        }
    }
    componentDidMount(){
       
    }
    render(){
        let {breadList,name} = this.state;
        return (
            <div className={style.container}>
                <NavTab navList={this.navList} />
                <div className={style.content}>
                    <Bread breadList={breadList}
                        check = {name}
                        edit = {name}
                        audit ={name}
                    />
                    <BannerDetail/>
                </div>
            </div>
        )
    }
}
export default BannerAdd;