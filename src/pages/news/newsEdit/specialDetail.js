import React,{Component} from 'react';
import _mm from 'util/mm.js';
import NavTab from 'components/global/navTab';
import style from '../common/banner.scss';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col} from 'antd';
import { withRouter } from 'react-router-dom';
import newsEditApi from 'api/news/banner';
import commonApi from 'api/common.js';
import config from 'base/config.json';
import SpecialDetail from '../components/SpecialDetail';
class Special extends Component{
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
                name:'新闻列表',
                url:'/news/newsEdit/file'
            }
        ]
    }
    render(){
        return (
            <div className={style.container}>
                <NavTab navList={this.navList} />
                <div className={style.content}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/news/newsEdit/type'>新闻类型</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='/news/newsEdit/SpecialList'>专题</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span style={{color:'#F7AB2F'}}>新增专题</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='form-container'>
                        <SpecialDetail/>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Special);