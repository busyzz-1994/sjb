import React,{Component} from 'react';
import _mm from 'util/mm.js';
import NavTab from './common/nav.js';
import style from 'common/layout.scss';
// import self from './bannerAdd.scss';
import {Link,withRouter} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col} from 'antd';
import config from 'base/config.json';
import NewDetailComponent from 'components/news/newsDetail';
import Bread from 'components/global/bread';
// import NewsCategorySave from '../components/newsCategorySave';
class TypeSave extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            breadList:[
                {
                    name:'推荐',
                    path:'/search/searchEdit/recommend'
                },
                {
                    name:_mm.getParam('name'),
                    path:''
                }
            ],
            name : _mm.getParam('name')
        }
    }
    render(){
        let {breadList,name} = this.state;
        return (
            <div className={style.container}>
                <NavTab/>
                <div className={style.content}>
                <Bread
                    breadList ={breadList}
                    check = {name}
                    audit = {name}
                    edit = {name}
                />
                    <div className='form-container'>
                        <NewDetailComponent/>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(TypeSave);