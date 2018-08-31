import React,{Component} from 'react';
import './common.scss';
import userApi from 'api/user.js';
import {Button,Switch,Modal,Input,Form,message } from 'antd';
import Validate from 'util/validate';
import Title from 'components/title';
class TenderDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            tenderAgency:{},
            tenderAgencyAuth:[],
            modalVisible:false,
            //modal确认按钮的加载状态
            confirmLoading:false,
            id:this.props.match.params.id,
            addAcount:{
                loginName:'',
                name:'',
                mobile:'',
                idCard:'',
                tenderAgencyId:this.props.match.params.id
            },
            errorMsg:''
        }
        this.formItemLayout={
            labelCol: {
                xs: { span: 4 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 20 }
            }
        }
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        this.getData(id)
    }
    getData(id){
        userApi.getTenderDetail(id).then(res=>{
            this.setState(res);
        })
    }
    Switch(status,index,id){
        userApi.updateTenderAccountStatus({state:status,id}).then(res=>{
            this.state.tenderAgencyAuth[index].status = status;
            this.setState({
                tenderAgencyAuth:this.state.tenderAgencyAuth
            })
        })
       
    }
    handleModal(e){
        let name = e.target.name;
        let value = e.target.value;
        let newaddAcount = Object.assign({},this.state.addAcount,{[name]:value})
        this.setState({
            addAcount:newaddAcount
        })
    }
    saveAccount(){
        let msg = this.validateAccount();
        if(msg){
            this.setState({
                errorMsg:msg
            })
        }else{
            this.setState({
                confirmLoading:true
            })
            userApi.addTenderAccount(this.state.addAcount).then(res=>{
                message.success('添加账户成功！');
                this.setState({
                    modalVisible:false,
                    confirmLoading:false,
                    addAcount:{
                        loginName:'',
                        name:'',
                        mobile:'',
                        idCard:'',
                        tenderAgencyId:this.props.match.params.id
                    }
                })
                this.getData(this.state.id);
            }).catch(res=>{
                this.setState({
                    errorMsg:res,
                    confirmLoading:false
                })
            })
        }
    }
    validateAccount(){
        let validate = new Validate();
        let {loginName,name,mobile,idCard} = this.state.addAcount;
        validate.add(name,'notEmpty','姓名不能为空！');
        validate.add(loginName,'notEmpty','账户不能为空！');
        validate.add(idCard,'isIDcard','请输入正确的身份证格式！');
        validate.add(mobile,'isPhone','请输入正确的手机号！');
        return validate.start();
    }
    render(){
        const {tenderAgency,tenderAgencyAuth,addAcount} = this.state;
        return (
            <div>
                <Modal title="添加账户"
                    visible={this.state.modalVisible}
                    confirmLoading={this.state.confirmLoading}
                    onCancel = {()=>{this.setState({modalVisible:false})}}
                    onOk = {()=>{this.saveAccount()}}
                    okText='添加'
                    cancelText = '取消'
                >
                    <Form.Item
                        {...this.formItemLayout}
                        label="姓名"
                        >
                       <Input placeholder='请输入注册人真实姓名' value={addAcount.name} name='name' onChange={(e)=>{this.handleModal(e)}}/>
                    </Form.Item>
                    <Form.Item
                        {...this.formItemLayout}
                        label="登录账户"
                        >
                       <Input placeholder='请输入注册人登录名' value={addAcount.loginName} name='loginName' onChange={(e)=>{this.handleModal(e)}} />
                    </Form.Item>
                    <Form.Item
                        {...this.formItemLayout}
                        label="身份证"
                        >
                       <Input placeholder='请输入注册人身份证号码' value={addAcount.idCard} name='idCard' onChange={(e)=>{this.handleModal(e)}}/>
                    </Form.Item>
                    <Form.Item
                        {...this.formItemLayout}
                        label="联系方式"
                        >
                       <Input placeholder='请输入注册人手机号码' value={addAcount.mobile} name='mobile' onChange={(e)=>{this.handleModal(e)}} />
                    </Form.Item>
                    <Form.Item
                        {...this.formItemLayout}
                        label=""
                        >
                       <span style={{marginLeft:'81px'}} className='error-message'>{this.state.errorMsg}</span>
                    </Form.Item>
                </Modal>
                <Title title='代理机构详情'/>
                <table className='table table-bordered tenderDetail-table'>
                   <tbody>
                        <tr>
                            <th colSpan='4'>代理机构详情</th>
                        </tr>
                        <tr>
                            <td>公司名称</td>
                            <td>
                                <input type="text" defaultValue={tenderAgency.company} readOnly  className='form-control'/>
                            </td>
                            <td>
                               公司地址
                            </td>
                            <td>
                                <input type="text" defaultValue={tenderAgency.address} readOnly className='form-control'/>
                            </td>
                        </tr>
                        <tr>
                            <td>社会信用代码</td>
                            <td>
                                <input type="text" defaultValue={tenderAgency.creditCode} readOnly className='form-control'/>
                            </td>
                            <td>
                                邮箱
                            </td>
                            <td>
                                <input type="text" defaultValue={tenderAgency.email} readOnly className='form-control'/>
                            </td>
                        </tr>
                        <tr>
                            <td>法人</td>
                            <td>
                                <input type="text" defaultValue={tenderAgency.name} readOnly className='form-control'/>
                            </td>
                            <td>
                                电话
                            </td>
                            <td>
                                <input type="text" defaultValue={tenderAgency.phone} readOnly className='form-control'/>
                            </td>
                        </tr>
                   </tbody>
                </table>
                <table className='table table-bordered account-list'>
                    <thead>
                        <tr>
                            <th style={{textAlign:'left'}} colSpan='6'>
                                <span>登录账户</span>
                                <div className='account-add-btn fr'>
                                    <Button type="primary" icon="plus" onClick={()=>{this.setState({modalVisible:true})}}>
                                        添加账户
                                    </Button>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <th>登录账号</th>
                            <th>身份证号码</th>
                            <th>联系方式</th>
                            <th>创建时间</th>
                            <th>账户状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tenderAgencyAuth.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.loginName}</td>
                                        <td>{item.idCard}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.createTime}</td>
                                        <td>
                                            <Switch checked={item.status}
                                            unCheckedChildren='禁用'
                                            checkedChildren='可用'
                                            onChange={(status)=>{this.Switch(status,index,item.id)}} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TenderDetail;