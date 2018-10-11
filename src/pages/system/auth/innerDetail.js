import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import style from '../common/common.scss';
import NavBar from './common/nav.js';
import {Button,Input,Breadcrumb,Row,Col,Checkbox,message,Switch,Select } from 'antd';
import innerAuthList from './innerAuthList';
import Validate from 'util/validate';
import _mm from 'util/mm.js';
import Bread from 'components/global/bread';
import innerStyle from './inner.scss';
import systemApi from 'api/system';
const Search = Input.Search;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
class OuterDetail extends Component{
    constructor(props){
        super(props)
        this.breadList = [
            {
                name:'内部用户',
                path:'/system/auth/inner'
            },
            {
                name:'添加内部用户',
                path:''
            }
        ]
        this.state = {
           id:this.props.match.params.id,
           checked:_mm.getParam('checked'),
           title :_mm.getParam('name') ,
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
           options:innerAuthList,
            //对应的是value [0,2]
            defaultOptions:[],
            //权限列表 [{id:1},{id:3}]
            sjbPermissions:[]
        }
    }
    componentDidMount(){
        let {id} = this.state;
        if(id !=null){
            this.loadData()
        }
        this.getAreaList()
    }
    //加载数据
    loadData(){
        let {id,options} = this.state;
        systemApi.getOuterDetail({id}).then(res=>{
            let resulte = res[0];
            let {area,name,nickname,email,initialPassword,isStop,sjbPermissions} = resulte;
            sjbPermissions.forEach(item=>{
                let idLength = (item.id+'').length;
                if(idLength>=3){
                    let parentId = item.parentId;
                    let optionsItem = options[parentId-1];
                    optionsItem.selectOptions.push(item.id+'')
                }
            })
            this.setState({
                areaDefault:area,
                username:name,
                name:nickname,
                email,
                password:initialPassword,
                status:isStop,
                options
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
    authSelect(val,index,option){
        let arrValue = val;
        let {options} = this.state;
        options[index].selectOptions = arrValue;
        options[index].checkAll = arrValue.length === option.length ;
        options[index].indeterminate = !!arrValue.length && (arrValue.length < option.length);
        this.setState({
            options
        },()=>{
            this.changePer()
        })
    }
    //checkAll 全选
    checkAll(e,index,option){
        let {options} = this.state;
        options[index].selectOptions = e.target.checked ? option.map((item)=>item.value) : [];
        options[index].checkAll = e.target.checked;
        options[index].indeterminate = false;
        this.setState({options},()=>{
            this.changePer()
        });
    }
    //验证提交表单
    validate(){
        let {username,name,password,email,sjbPermissions} = this.state;
        let validate = new Validate();
        validate.add(username,'isUserName','请输入正确的用户名格式！');
        validate.add(email,'isEmail','请输入正确的邮箱格式！');
        validate.add(name,'notEmpty','姓名不能为空！');
        validate.add(password,'isUserPassword','请输入正确的初始密码格式！');
        let msg = validate.start();
        return msg;
    }
    //将options 转换 为 sjbPermissions
    changePer(){
        let {options} = this.state;
            let sjbPermissions = [];
            options.forEach(item=>{
                let selectOptions = item.selectOptions;
                if(selectOptions.length>0){
                    let obj = {};
                    obj.id = item.value;
                    sjbPermissions.push(obj);
                    selectOptions.forEach(item=>{
                        let objChildren = {};
                        objChildren.id = item;
                        sjbPermissions.push(objChildren);
                    })
                    
                }
            })
        this.setState({sjbPermissions}) 
    }
    //保存
    save(){
        let msg = this.validate();
        let {checked} = this.state;
        if(msg){
            message.error(msg);
        }else{
            if(checked ==null){
                this.addUser()
            }else{
                this.updateUser()
            }
        }
    }
    resetAuthList(){
        let {options} = this.state;
        options.forEach(item=>{
            item.selectOptions = []
        })
    }
    addUser(){
        let {username,name,email,password,sjbPermissions,areaDefault} = this.state;
        systemApi.addOuterUser({
            name:username,
            nickname:name,
            email,
            area:areaDefault,
            initialPassword:password,
            sjbPermissions,
            isInternal:0
        }).then(res=>{
            message.success('添加账号成功！');
            this.resetAuthList()
            this.props.history.goBack();
        }).catch(res=>{
            message.error(res);
        })
    }
    updateUser(){
        let {username,name,email,password,sjbPermissions,areaDefault,status,id} = this.state;
        console.log('zhli')
        systemApi.updateUser({
            name:username,
            nickname:name,
            email,
            area:areaDefault,
            initialPassword:password,
            sjbPermissions,
            isInternal:0,
            isStop:status,
            id
        }).then(res=>{
            message.success('修改账号成功！');
            this.resetAuthList()
            this.props.history.goBack();
        }).catch(res=>{
            message.error(res);
        })
    }
    //切换status
    switch(e){
        let status = e ? '1' : '0';
        this.setState({
            status
        })
    }
    //加载地区列表
    getAreaList(){
        systemApi.getAreaList().then(res=>{
            this.setState({
                areaList:res[0]
            })
        })
    }
     //选择城市
     select(val){
        this.setState({
            areaDefault:val
        })
    }
    render(){
        let { username , name ,password , email ,auth,options,
            defaultOptions,status,checked,title,areaList,areaDefault} = this.state;
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
                                    <Input disabled={checked ==null ? false : true} maxLength='15' value={username} name='username' onChange = {(e) => this.onInput(e)}  placeholder='请使用大写字母加数字组合'/>
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
                                    <Input disabled={true} checked={true} maxLength='6' value={password} name='password' onChange = {(e) => this.onInput(e)}  placeholder='请输入6位数字的纯数字初始密码（明码显示）'/>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>权限分配*</Col>
                                <Col offset='1' span='18'>
                                    {
                                        options.map((item,index)=>{
                                            return (
                                                <div key={index} className={innerStyle.authListContainer} style={{display:'inline-block',verticalAlign:'top'}} >
                                                    <Checkbox
                                                        indeterminate={item.indeterminate}
                                                        onChange={(v)=>{this.checkAll(v,index,item.options)}}
                                                        checked={item.checkAll}
                                                    >
                                                        <span style={{color:'16px'}} >{item.name}</span>
                                                    </Checkbox>
                                                    <div>
                                                        <CheckboxGroup options={item.options} value={item.selectOptions} onChange={(v)=>{this.authSelect(v,index,item.options)}} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        </div>
                        {
                            checked == null ? null :
                            (
                                <div className='form-item'>
                                    <Row>
                                        <Col span='4'>账号状态*</Col>
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