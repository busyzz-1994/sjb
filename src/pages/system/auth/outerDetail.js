import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import style from '../common/common.scss';
import NavBar from './common/nav.js';
import {Button,Input,Breadcrumb,Row,Col,Checkbox,message,Select ,Switch} from 'antd';
import Validate from 'util/validate';
import systemApi from 'api/system';
import _mm from 'util/mm.js';
import Bread from 'components/global/bread';
import { lang } from '../../../../node_modules/_moment@2.22.2@moment';
const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
class OuterDetail extends Component{
    constructor(props){
        super(props)
        this.breadList =[
            {
                name:'地方用户',
                path:'/system/auth/outer'
            },
            {
                name:'添加地方用户',
                path:''
            }
        ]
        this.state = {
           id:this.props.match.params.id,
           checked:_mm.getParam('checked'),
           title : _mm.getParam('name'),
           username:'',
           email:'',
           name:'',
           password:'123456',
           auth:[],
           //地区列表
           areaList:[],
           areaDefault:'成都市',
           //账户状态 1-》 启用 0—》停用
           status:'1',
           options:[
               {
                label:'编辑',
                value:201
               },
               {
                label:'审核',
                value:202
               },
               {
                label:'发布',
                value:203
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
        this.getAreaList()
    }
    //加载地区列表
    getAreaList(){
        systemApi.getAreaList().then(res=>{
            this.setState({
                areaList:res[0]
            })
        })
    }
    //加载数据
    loadData(){
        let {id} = this.state;
        systemApi.getOuterDetail({id}).then(res=>{
            let resulte = res[0];
            let {area,name,nickname,email,initialPassword,isStop,sjbPermissions} = resulte;
            let auth = [];
            sjbPermissions.forEach((item)=>{
                let parentId = item.parentId;
                if(parentId){
                    auth.push(item.id)
                }
            })
            this.setState({
                areaDefault:area,
                username:name,
                name:nickname,
                email,
                password:initialPassword,
                status:isStop,
                auth:auth
            })
        }).catch(err=>{
            message.error(err)
        })
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
    //选择城市
    select(val){
        this.setState({
            areaDefault:val
        })
    }
    //修改用户状态
    handleLink(){
        let {status,id} = this.state;
        let isStop = status === '0' ? 1 :0;
        systemApi.changeUserStatus()
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
        let {checked} = this.state;
        if(msg){
            message.error(msg);
        }else{
           if(checked == null){
                this.addUser()
           }else{
               this.updateUser()
           }
        }
    }
    //切换status
    switch(e){
        let status = e ? '1' : '0';
        this.setState({
            status
        })
    }
    //添加用户
    addUser(){
        let {username,name,email,password,auth,areaDefault} = this.state;
        let sjbPermissions = auth.map((item,index)=>{
            let obj = {};
            obj.id = item;
            return obj;
        })
        sjbPermissions.unshift({id:2});
        systemApi.addOuterUser({
            name:username,
            nickname:name,
            email,
            area:areaDefault,
            initialPassword:password,
            sjbPermissions,
            isInternal:1
        }).then(res=>{
            message.success('添加账号成功！');
            this.props.history.goBack();
        }).catch(res=>{
            message.error(res);
        })
    }
    //修改用户
    updateUser(){
        let {username,name,email,password,auth,areaDefault,status,id} = this.state;
        let sjbPermissions = auth.map((item,index)=>{
            let obj = {};
            obj.id = item;
            return obj;
        })
        sjbPermissions.unshift({id:2});
        systemApi.updateUser({
            name:username,
            nickname:name,
            email,
            area:areaDefault,
            initialPassword:password,
            sjbPermissions,
            isInternal:1,
            isStop:status,
            id
        }).then(res=>{
            message.success('修改账号成功！');
            this.props.history.goBack();
        }).catch(res=>{
            message.error(res);
        })
    }
    render(){
        let { username , name ,password , email ,auth,options,defaultOptions,
            areaList,areaDefault,status,checked,title} = this.state;
        return (
            <div className={style.container}>
                <NavBar/>
                <div className={style.content}>
                    <Bread 
                        breadList = {this.breadList}
                        edit = {title}
                    />
                    <div className='form-container'>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>用户名*</Col>
                                <Col offset='1' span='8'>
                                    <Input disabled = {checked == null ? false : true}  value={username} name='username' onChange = {(e) => this.onInput(e)}  placeholder='请使用大写字母加数字组合'/>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>绑定邮箱*</Col>
                                <Col offset='1' span='8'>
                                    <Input value={email} name='email' onChange = {(e) => this.onInput(e)}  placeholder='请输入邮箱'/>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>姓名*</Col>
                                <Col offset='1' span='8'>
                                    <Input value={name} name='name' onChange = {(e) => this.onInput(e)}  placeholder='请输入用户的姓名'/>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>所在城市*</Col>
                                <Col offset='1' span='8'>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        optionFilterProp="children"
                                        value={areaDefault}
                                        onChange={(value)=>{this.select(value)}}
                                    >
                                    {
                                        areaList.map((item,index)=>{
                                            return (
                                                <Option key={item.name}  value={item.name}>{item.name}</Option>
                                            )
                                        })
                                    }
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>初始密码*</Col>
                                <Col offset='1' span='8'>
                                    <Input disabled={true} value={password} name='password' onChange = {(e) => this.onInput(e)}  placeholder='请输入6位数字的纯数字初始密码（明码显示）'/>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>权限分配*</Col>
                                <Col offset='1' span='8'>
                                    <CheckboxGroup options={options} value={auth} onChange={(val)=>this.authSelect(val)} />
                                </Col>
                            </Row>
                        </div>
                        {
                            checked == null ? null:
                            (
                                <div className='form-item'>
                                    <Row>
                                        <Col span='4'>账号状态</Col>
                                        <Col offset='1' span='19'>
                                            <Switch checkedChildren="启用" unCheckedChildren="停用" 
                                                checked = {status == '1' ? true : false}
                                                onChange = {(e)=>this.switch(e)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            )
                        }
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