import React,{Component,Fragments} from 'react';
import { Input , Button ,message,Breadcrumb,Row, Col,Checkbox,Icon,Select } from 'antd';
import style from './index.scss';
import commonApi from 'api/common.js';
const Option = Select.Option;
//参数必须传入
//1.signList 即标签的列表 选中的list array signList
//2.标签是否显示  boolean checked
//3.获取新的signList 数据   getList 回调函数
//4.获取新的 选中状态  getStatus 回调函数
class SignList extends Component{
    constructor(props){
        super(props)
        this.state = {
            signAllList:[
                {name:'推荐'},
                {name:'热门'},
                {name:'体育'},
                {name:'美食'},
                {name:'娱乐'}
            ]
        }
    }
    componentDidMount(){
        commonApi.getSignList({
            currPage:1,
            pageSize:9999
        }).then(res=>{
            let signList = res[0].lists;
            this.setState({
                signAllList:signList
            })
        })
    }
    //清空所有标签
    cleanSignList(){
        this.props.getList([]);
    }
    //切换显示标签
    changeSignState(e){
        let status = e.target.checked;
        this.props.getStatus(status)
    }
    //选中select
    Select(val){
        if(val.length > 3){
            message.warning('最多可以添加3条标签！')
        }else{
            this.props.getList(val)
        }
    }
    render(){
        let {signList,signAllList} = this.props;
        return (
            <div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>标签绑定*</Col>
                        <Col offset='1' span='10'>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择标签"
                                value={this.props.signList}
                                onChange={(val)=>this.Select(val)}
                            >
                                {
                                    this.state.signAllList.map((item,index)=>{
                                        return (
                                            <Option key={item.name} value={item.name}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                        <Col offset='1' span='8'>
                            <div  className={style.sign}>
                                <Button onClick={()=>this.cleanSignList()}>清空</Button>
                                <Checkbox checked={this.props.checked}  onChange={(e)=>{this.changeSignState(e)}} >
                                    显示标签
                                </Checkbox>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default SignList;