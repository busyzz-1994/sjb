import React,{Component} from 'react';
import NavTab from './common/nav.js';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import typeApi from 'api/discounts/type.js';
import Bread from 'components/global/bread';
import StartDetail from 'components/advertising/startDetail.js';
import _mm from 'util/mm.js';
class Banner extends Component{
    constructor(props){
        super(props)
        this.state={
            breadList:[
                {
                    name:'启动页',
                    path:'/advertising/advertisingAuth/start'
                },
                {
                    name:'新增',
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
                <NavTab/>
                <div className={style.content}>
                    <Bread breadList = {breadList} 
                        edit = {typeName}
                        check = {typeName}
                    />
                    <StartDetail/>
                </div>
            </div>
        )
    }
}
export default withRouter(Banner);