import React,{Component} from 'react';
import './index.scss';
import {withRouter} from 'react-router-dom';
import _mm from 'util/mm.js'
import Validate from 'util/validate';
import style from './index.scss';
import loginApi from 'api/login';
import Logo from 'images/login/logo.png';
import Login4 from 'images/login/login4.png';
import Login5 from 'images/login/login5.png';
class Login extends Component{
    static getRedirect(){
        let res = window.location.hash.split('#')[2];
        // Login.getRedirect() ||
        console.log(res);
        return res;
    }
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            password: '',
            verifyCode:'',
            redirect: '/',
            errorMsg:'',
            //获取验证码按钮是否可点击
            buttonIs:true,
            //获取验证码按钮文字
            buttonText:'获取验证码'
        }
    }
    componentWillMount(){
        // let app = document.getElementById('app');
        let body = document.documentElement.getElementsByTagName('body')[0];
        let html = document.documentElement;
        html.style.width = html.style.height = body.style.width = app.style.height = '100%';
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        let body = document.documentElement.getElementsByTagName('body')[0];
        let html = document.documentElement;
        html.style.width = html.style.height = body.style.width = app.style.height = 'auto';
        if(this.timer){
            clearInterval(this.timer);
        }
    }
    // 当用户名发生改变
    handle(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
    //获取验证码
    getVerifyCode(){
        let {buttonIs} = this.state;
        if(!buttonIs) return ;
        let username = this.state.username;
        loginApi.getVerifyCode({name:username}).then(res=>{
            console.log(res)
            this.setState({
                errorMsg:'',
            },()=>{
                this.openTimer();
            })
        }).catch(err=>{
            this.setState({
                errorMsg:err
            })
        })
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    //开启计时器
    openTimer(){
        let time = 60;
        this.timer = setInterval(()=>{
            time -- ;
            if(time<1){
                this.setState({
                    buttonText:`获取验证码`,
                    buttonIs:true
                })
                clearInterval(this.timer)
            }else{
                this.setState({
                    buttonText:`${time}秒后重新发送`,
                    buttonIs:false
                })
            }
        },1000)
    }
    // 当用户提交表单
    onSubmit(){
        let msg = this.validate();
        if(msg){
            this.setState({
                errorMsg:msg
            })
        }else{
            loginApi.login({
                name:this.state.username,
                number:this.state.password,
                code:this.state.verifyCode
            }).then(res=>{
                console.log(res);
                // return;
                let token = res[0].token,
                    userInfo = res[0].userList;
                _mm.setStorage('token',token);
                _mm.setStorage('userInfo',userInfo);
                this.props.history.push(this.state.redirect)
            }).catch(res =>{
                this.setState({
                    errorMsg:res
                })
            })
        }
        
    }
    //验证表单
    validate(){
        let validate = new Validate();
        validate.add(this.state.username,'notEmpty','用户名不能为空！');
        validate.add(this.state.password,'notEmpty','密码不能为空！');
        validate.add(this.state.verifyCode,'notEmpty','验证码不能为空！');
        let msg = validate.start();
        return msg;
    }
    render(){
        let { errorMsg , username ,password ,verifyCode,buttonIs} = this.state;
        return(
            <div className={style.container}>
                 <iframe src="https://app-admin.scsjb.cn/bg/index.html"  frameBorder="0"></iframe>
                 <div className={style.loginBox} onKeyUp={e => { this.onInputKeyUp(e) }} onChange={ e =>{this.handle(e)}}>
                    <img src={Logo} />
                    <div className={style.errorBox}>
                        <span className='error-message'>{errorMsg}</span>
                    </div>
                    <div className={style.loginInput}>
                        <div>
                            <img src={Login4} />
                        </div>
                        <input value={username} name='username' type="text" placeholder="请输入账号"/>
                    </div>
                    <div className={style.loginInput}>
                        <div>
                            <img src={Login5} />
                        </div>
                        <input value={password} name='password' type="password" placeholder="请输入密码"/>
                    </div>
                    <div className={style.verCode}>
                        <input value={verifyCode} name='verifyCode' type="text"  placeholder="请输入验证码"/>
                        <div onClick={()=>{this.getVerifyCode()}} className={buttonIs?style.verCodes + ' ' + style.cl : style.verCodes+ ' ' + style.disabled}>
                            <span>{this.state.buttonText}</span>
                        </div>
                    </div>
                    <div onClick={()=>{this.onSubmit()}} className={style.loginStart}>
                        登录
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);