import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import style from '../common/common.scss';
import NavBar from './common/nav.js';
import {Button,Input,Breadcrumb,Row,Col,Checkbox,message} from 'antd';
import Validate from 'util/validate';
const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;
class OuterDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
           id:this.props.match.params.id,
           title : '新增用户',
           username:'',
           email:'',
           name:'',
           password:'',
           auth:[],
           //账户状态
           status:0,
           options:[
               {
                label:'编辑',
                value:0
               },
               {
                label:'审核',
                value:1
               },
               {
                label:'发布',
                value:2
               },{
                label:'审查',
                value:3
               },
               {
                label:'首页数据',
                value:4
               },
               {
                label:'新闻管理',
                value:5
               },
               {
                label:'媒体管理',
                value:6
               },{
                label:'服务管理',
                value:7
               },
               {
                label:'惠民购物',
                value:8
               },
               {
                label:'搜索管理',
                value:9
               },
               {
                label:'广告管理',
                value:10
               },{
                label:'用户管理',
                value:11
               },
               {
                label:'爆料投诉',
                value:12
               }
            ],
            //对应的是value [0,2]
            defaultOptions:[]
        }
    }
    componentDidMount(){
        let {id} = this.state;
        if(id !=null){
            this.loadData()
        }
    }
    //加载数据
    loadData(){
        
    }
    //输入框
    onInput(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name] : value
        })
    }
    //权限选择
    authSelect(val){
        this.setState({
            auth:val
        })
    }
    //验证提交表单
    validate(){
        let {username,name,password,email,auth} = this.state;
        let validate = new Validate();
        validate.add(username,'isUserName','请输入正确的用户名格式！');
        validate.add(email,'isEmail','请输入正确的邮箱格式！');
        validate.add(name,'notEmpty','姓名不能为空！');
        validate.add(password,'isUserPassword','请输入正确的初始密码格式！');
        validate.add(auth,'notEmptyArray','权限分配不能为空！');
        let msg = validate.start();
        return msg;
    }
    //保存
    save(){
        let msg = this.validate();
        if(msg){
            message.error(msg);
        }else{
            alert('ok')
        }
    }
    render(){
        let { username , name ,password , email ,auth,options,defaultOptions} = this.state;
        return (
            <div className={style.container}>
                <NavBar/>
                <div className={style.content}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/system/auth/inner'>内部用户</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span style={{color:'#F7AB2F'}}>{this.state.title}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='form-container'>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>用户名*</Col>
                                <Col offset='1' span='8'>
                                    <Input maxLength='15' value={username} name='username' onChange = {(e) => this.onInput(e)}  placeholder='请使用大写字母加数字组合'/>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>绑定邮箱*</Col>
                                <Col offset='1' span='8'>
                                    <Input maxLength='50' value={email} name='email' onChange = {(e) => this.onInput(e)}  placeholder='请输入QQ邮箱'/>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>姓名*</Col>
                                <Col offset='1' span='8'>
                                    <Input maxLength='10' value={name} name='name' onChange = {(e) => this.onInput(e)}  placeholder='请输入用户的姓名'/>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>初始密码*</Col>
                                <Col offset='1' span='8'>
                                    <Input maxLength='6' value={password} name='password' onChange = {(e) => this.onInput(e)}  placeholder='请输入6位数字的纯数字初始密码（明码显示）'/>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>权限分配*</Col>
                                <Col offset='1' span='12'>
                                    <div>
                                        <CheckboxGroup options={options} defaultValue={defaultOptions} onChange={(val)=>this.authSelect(val)} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>账号状态*</Col>
                                <Col offset='1' span='19'>
                                    <Button>
                                        <span>正常</span>
                                    </Button>
                                    <div style={{display:'inline-block',marginLeft:'20px'}}>
                                        点击
                                        <span className={style.handleLink}>停用</span>
                                        用户账号将无法使用,需管理员刷新后恢复正常
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item btn-item'>
                            <Row>
                                <Col offset='5' span='10'>
                                    <Button onClick={()=>{this.save()}} type='primary' size='large'>保存</Button>
                                    <Button onClick={()=>{this.props.history.goBack()}} size='large'>取消</Button>
                                </Col>
                            </Row>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}
export default withRouter(OuterDetail);