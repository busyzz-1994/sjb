import React,{Component,Fragments} from 'react';
import { Input , Button ,message,Breadcrumb,Row, Col,Checkbox,Icon,Select,AutoComplete } from 'antd';
import style from './index.scss';
import commonApi from 'api/common.js';
import systemApi from 'api/system/index.js';
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
            signAllList:[],
            dataSource:[],
            maxLength:'6'
        }
    }
    componentDidMount(){
        let {type} = this.props;
        systemApi.getSignList({pageSize:9999,currPage:1,type}).then(res=>{
            let signList = res[0].lists;
            signList = signList.map(item=>{
                return item.name
            })
            this.setState({
                dataSource:signList
            })
        })
    }
    //清空所有标签
    // cleanSignList(){
    //     this.props.getList([]);
    // }
    // //切换显示标签
    // changeSignState(e){
    //     let status = e.target.checked;
    //     this.props.getStatus(status)
    // }
    //选中select
    Select(val){
        if(val.length >= 6){
            message.warning('最多可以添加6条标签！')
        }else{
            this.props.getList(val)
        }
    }
    /********** */
    //添加标签绑定
    addSignList(e){
        let signList = this.props.signList;
        console.log(signList)
        if(signList.length >= 6){
            message.warning('最多可以添加6条标签！')
        }else{
            this.props.signList.push('');
            this.props.getList(this.props.signList);
        }
    }
    //删除后面的标签绑定
    delSignList(e){
        let index = +e.target.getAttribute('index');
        this.props.signList.splice(index+1,1);
        this.props.getList(this.props.signList);
    }
     //s输入第一个标签绑定
     changeSign(val){
        // let value = e.target.value;
        if(val.length>=this.state.maxLength){
            return;
        }
        this.props.signList[0] = val;
        this.props.getList(this.props.signList);
    }
    //输入后面的标签绑定
    changeSignList(val,index){
        // let value = e.target.value,
        //     index = +e.target.getAttribute('index');
        this.props.signList[index+1] = val;
        this.props.getList(this.props.signList);
    }
    //清空所有标签
    cleanSignList(){
        let {signList} = this.props;
        signList[0] = '';
        signList.splice(1);
        this.props.getList(this.props.signList);
    }
    //切换显示标签
    changeSignState(e){
        let status = e.target.checked;
        this.props.getStatus(status)
    }
    //onSelect 选择联想类容
    onSelect(value){
        this.changeSign(value);
    }
    //onSelectList
    onSelectList(value,index){
        this.changeSignList(value,index);
    }
    render(){
        let {signList,signAllList} = this.props;
        let {dataSource} = this.state;
        return (
            <div>
                {/* <div className='form-item'>
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
                </div> */}
                <div className='form-item'>
                    <Row>
                        <Col span='4'>标签绑定*</Col>
                        <Col offset='1' span='5'>
                        <AutoComplete
                            dataSource={dataSource}
                            style={{ width: 200 }}
                            onSelect={(val)=>{this.onSelect(val)}}
                            placeholder="请输入标签"
                            onChange = {(e) => this.changeSign(e)}
                            value={this.props.signList[0]}
                            filterOption = {(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />
                            {/* <Input maxLength='6' name='sign' placeholder='输入2~6字的标签'  onChange = {(e) => this.changeSign(e)} value={this.props.signList[0]}  /> */}
                        </Col>
                        <Col offset='1' span='8'>
                            <div  className={style.sign}>
                                <div onClick={(e)=>{this.addSignList(e)}} style={{display:'inline-block'}}>
                                    <Icon style={{cursor:'pointer',marginRight:'10px'}} type="plus" />
                                </div>
                                {/* <Button>选择</Button> */}
                                <Button onClick={()=>this.cleanSignList()}>清空</Button>
                                <Checkbox checked={this.props.checked}  onChange={(e)=>{this.changeSignState(e)}} >
                                    显示标签
                                </Checkbox>
                            </div>
                        </Col>
                    </Row>
                </div>
                {
                    this.props.signList.slice(1).map((item,index)=>{
                        return (
                            <div key={index} className='form-item'>
                                <Row>
                                    <Col span='4'>标签绑定*</Col>
                                    <Col offset='1' span='5'>
                                        <AutoComplete
                                            dataSource={dataSource}
                                            style={{ width: 200 }}
                                            onSelect={(val)=>{this.onSelectList(val,index)}}
                                            placeholder="请输入标签"
                                            onChange = {(e) => this.changeSignList(e,index)}
                                            value={item}
                                            filterOption = {(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                        />
                                        {/* <Input value={item} maxLength='6' index={index} name='sign' placeholder='输入2~6字的标签'  onChange = {(e) => this.changeSignList(e)}   /> */}
                                    </Col>
                                    <Col offset='1' span='8'>
                                        <div style={{display:'inline-block'}} onClick={(e)=>{this.delSignList(e)}}>
                                            <Icon index={index} style={{cursor:'pointer'}} type="close-circle" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
SignList.defaultProps = {
    type:0 //0->新闻标签 1->生活标签
}
export default SignList;