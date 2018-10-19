import React,{Component} from 'react';
import NavTab from './common/nav.js';
import style from 'common/layout.scss';
import _mm from 'util/mm.js';
import Bread from 'components/global/bread';
import BannerDetail from 'components/global/bannerDetail';
class BannerAdd extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            breadList:[
                {
                    name:'banner管理',
                    path:'/service/serviceEdit/banner'
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
                <NavTab />
                <div className={style.content}>
                    <Bread breadList={breadList}
                        check = {name}
                        edit = {name}
                    />
                    <BannerDetail activeType={1} canChange={true}/>
                </div>
            </div>
        )
    }
}
export default BannerAdd;