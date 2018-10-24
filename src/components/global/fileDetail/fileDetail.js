import React,{Component} from 'react';
import _mm from 'util/mm.js';
// import NavTab from './common/nav.js';
import style from 'common/layout.scss';
// import self from './bannerAdd.scss';
import {Link,withRouter} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col} from 'antd';
import config from 'base/config.json';
import FileDetail from 'components/global/fileDetail/index.js';
import Bread from 'components/global/bread';
// import NewsCategorySave from '../components/newsCategorySave';
class TypeSave extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            // breadList:[
            //     {
            //         name:'推荐',
            //         path:`/search/searchIssue/recommend/${this.props.match.params.type}`
            //     },
            //     {
            //         name:_mm.getParam('name'),
            //         path:''
            //     }
            // ],
            name : _mm.getParam('name')
        }
    }
    render(){
        let {breadList,name} = this.state;
        return (
            <div className={style.container}>
                <div className={style.content}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a onClick={()=>{this.props.history.goBack()}}>&lt;返回</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='form-container'>
                        <FileDetail/>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(TypeSave);