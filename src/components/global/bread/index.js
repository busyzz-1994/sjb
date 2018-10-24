import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import _mm from 'util/mm.js';
//必须属性
//1.breadList 见默认属性 ;
//2.check 查看时候传入的文字；
//3.edit  修改时候传入的文字；
//4.audit  审核时候传入的文字；
class Bread extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked:_mm.getParam('checked'),
            breadList:[]
        }
    }
    componentDidMount(){
        this.setBreadList(this.props)
    }
    componentWillReceiveProps(nextProps){
        this.setBreadList(nextProps)
    }
    setBreadList(props){
        let {checked} = this.state;
        let { breadList , check , edit , audit } = props;
        let newList = JSON.parse(JSON.stringify(breadList));
        let breadListLength = newList.length;
        if(checked == 0){
            newList[breadListLength-1].name = check;
            this.setState({
                breadList:newList
            })
        }else if(checked == 1){
            newList[breadListLength-1].name = edit;
            this.setState({
                breadList:newList
            })
        }else if(checked == 2){
            newList[breadListLength-1].name = audit;
            this.setState({
                breadList:newList
            })
        }else{
            this.setState({
                breadList:newList
            })
        }
    }
    render(){
        let {breadList} = this.state;
        return (
            <div>
               <Breadcrumb>
                    {
                        breadList.map((item,index)=>{
                            let result_1 = (
                                <Breadcrumb.Item key={index}>
                                    <Link to={item.path} onClick={()=>{this.props.history.goBack()}}>{item.name}</Link>
                                </Breadcrumb.Item>
                            )
                            let result_2 = (
                                <Breadcrumb.Item key={index}>
                                    <span style={{color:'#F7AB2F'}}>{item.name}</span>
                                </Breadcrumb.Item>
                            )
                            let jsx = item.path ? result_1:result_2
                            return jsx;
                        })
                    }
                </Breadcrumb>
            </div>
        )
    }
}
Bread.defaultProps = {
    breadList:[
        {
            name:'banner管理',
            path:'/news/newsEdit/banner'
        },
        {
            name:'添加banner',
            path:''
        }
    ],
    check:'查看banner',
    audit:'审核banner',
    edit:'修改banner'
}
export default withRouter(Bread) ;