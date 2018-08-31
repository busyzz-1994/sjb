import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import style from '../common/banner.scss';
import _mm from 'util/mm.js';
import Bread from 'components/global/bread';
// import self from './bannerAdd.scss';
// import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col} from 'antd';
// import { withRouter } from 'react-router-dom';
import BannerDetail from 'components/global/bannerDetail';
class BannerAdd extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/news/newsEdit/banner'
            },
            {
                name:'新闻类型',
                url:'/news/newsEdit/type'
            },
            {
                name:'新闻文件',
                url:'/news/newsEdit/file'
            }
        ]
        this.state = {
            breadList:[
                {
                    name:'banner管理',
                    path:'/news/newsEdit/banner'
                },
                {
                    name:'新增banner',
                    path:''
                }
            ],
            checked:_mm.getParam('checked')
        }
    }
    componentDidMount(){
       
    }
    render(){
        let {breadList} = this.state;
        return (
            <div className={style.container}>
                <NavTab navList={this.navList} />
                <div className={style.content}>
                    <Bread breadList={breadList}/>
                    <BannerDetail/>
                </div>
            </div>
        )
    }
}
export default BannerAdd;