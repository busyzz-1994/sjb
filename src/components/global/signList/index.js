import React,{Component,Fragments} from 'react';
import { Input , Button ,message,Breadcrumb,Row, Col,Checkbox,Icon } from 'antd';
import style from './index.scss';
//参数必须传入
//1.signList 即标签的列表 array signList
//2.标签是否显示  boolean checked
//3.获取新的signList 数据   getList 回调函数
//4.获取新的 选中状态  getStatus 回调函数
class SignList extends Component{
    constructor(props){
        super(props)
    }
     //s输入第一个标签绑定
    changeSign(e){
        let value = e.target.value;
        this.props.signList[0] = value;
        this.props.getList(this.props.signList);
    }
    //输入后面的标签绑定
    changeSignList(e){
        let value = e.target.value,
            index = +e.target.getAttribute('index');
        this.props.signList[index+1] = value;
        this.props.getList(this.props.signList);
    }
    //删除后面的标签绑定
    delSignList(e){
        let index = +e.target.getAttribute('index');
        this.props.signList.splice(index+1,1);
        this.props.getList(this.props.signList);
    }
    //添加标签绑定
    addSignList(e){
        let signList = this.props.signList;
        console.log(signList)
        if(signList.length >= 4){
            message.warning('最多可以添加4条标签！')
        }else{
            this.props.signList.push('');
            this.props.getList(this.props.signList);
        }
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
    render(){
        return (
            <div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>标签绑定*</Col>
                        <Col offset='1' span='5'>
                            <Input maxLength='6' name='sign' placeholder='输入2~6字的标签'  onChange = {(e) => this.changeSign(e)} value={this.props.signList[0]}  />
                        </Col>
                        <Col offset='1' span='8'>
                            <div  className={style.sign}>
                                <div onClick={(e)=>{this.addSignList(e)}} style={{display:'inline-block'}}>
                                    <Icon style={{cursor:'pointer',marginRight:'10px'}} type="plus" />
                                </div>
                                <Button>选择</Button>
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
                                    <Col offset='5' span='5'>
                                        <Input value={item} maxLength='6' index={index} name='sign' placeholder='输入2~6字的标签'  onChange = {(e) => this.changeSignList(e)}   />
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
export default SignList;