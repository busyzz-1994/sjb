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
                url:'/news/newsIssue/banner'
            },
            {
                name:'新闻类型',
                url:'/news/newsIssue/type'
            },
            {
                name:'新闻文件',
                url:'/news/newsIssue/file'
            }
        ]
        this.state = {
            id:_mm.getParam('id'),
            name:_mm.getParam('name'),
            specialName:_mm.getParam('specialName')
        }
    }
    render(){
        let {id,name,specialName} = this.state;
        return (
            <div className={style.container}>
                <NavTab navList={this.navList} />
                <div className={style.content}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/news/newsIssue/type'>新闻类型</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={`/news/newsIssue/type/specialList/${id}/?name=${name}`}>{name}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span style={{color:'#F7AB2F'}}>{specialName?specialName:"新增专题"}</span>
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