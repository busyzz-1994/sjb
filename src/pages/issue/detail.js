import React,{Component} from 'react';
import _mm from 'util/mm.js';
import NavTab from './nav.js';
import style from 'common/layout.scss';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Pagination,Breadcrumb,Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import IssueDetail from 'components/issue/index.js';
import Bread from 'components/global/bread';
// import NewsCategorySave from '../components/newsCategorySave';
class TypeSave extends Component{
    constructor(props){
        super(props)
        this.type = this.props.match.params.type;
        this.id = this.props.match.params.id
        this.state = {
            checked:_mm.getParam('checked'),
            breadList:[
                {
                    name:this.type == 1 ? '投诉建议' :'爆料求助',
                    path:`/issue/list/${this.type}`
                },
                {
                    name:'',
                    path:''
                }
            ],
            name:_mm.getParam('name')
        }
    }
   
    render(){
        let {breadList,name} = this.state;
        return (
            <div className={style.container}>
                <NavTab/>
                <div className={style.content}>
                    <Bread breadList={breadList}
                        edit={name}
                        check = {name}
                    />
                    <IssueDetail/>
                </div>
            </div>
        )
    }
}
export default withRouter(TypeSave);