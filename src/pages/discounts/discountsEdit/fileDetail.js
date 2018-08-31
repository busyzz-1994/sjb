import React,{Component} from 'react';
import _mm from 'util/mm.js';
import NavTab from './common/nav.js';
import style from 'common/layout.scss';

// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Pagination,Breadcrumb,Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import DiscountsFileDetail from 'components/discounts/fileDetail.js';
// import NewsCategorySave from '../components/newsCategorySave';
class TypeSave extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked:_mm.getParam('checked')
        }
    }
   
    render(){
        return (
            <div className={style.container}>
                <NavTab/>
                <div className={style.content}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/service/serviceEdit/file'>服务文件</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span style={{color:'#F7AB2F'}}>新增服务</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <DiscountsFileDetail/>
                </div>
            </div>
        )
    }
}
export default withRouter(TypeSave);