import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import Bread from 'components/global/bread';
import WordDetail from 'components/video/typeDetail.js';
import _mm from 'util/mm.js';
class Banner extends Component{
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
        this.state={
            breadList:[
                {
                    name:'新闻类型',
                    path:'/news/newsEdit/type'
                },
                {
                    name:'新增类型',
                    path:''
                }
            ],
            typeName:_mm.getParam('name'),
            id:this.props.match.params.id
        }
    }
    componentDidMount(){
        let {id} = this.state;
    }
    render(){
        let {breadList,typeName} = this.state;
        return (
            <div className={style.container}>
                <NavTab navList={this.navList}/>
                <div className={style.content}>
                    <Bread breadList = {breadList} 
                        edit = {typeName}
                        check = {typeName}
                    />
                    <WordDetail type={0} title='新闻类型名称' />
                </div>
            </div>
        )
    }
}
export default withRouter(Banner);