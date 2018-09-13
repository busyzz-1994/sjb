import React,{Component} from 'react';
import NavTab from './common/nav.js';
import style from 'common/layout.scss';
import { Icon,Row,Col,Input,Button,message} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import Bread from 'components/global/bread';
import Validate from 'util/validate';
import systemApi from 'api/system';
// import TypeDetail from 'components/discounts/typeDetail.js';
import _mm from 'util/mm.js';
class Banner extends Component{
    constructor(props){
        super(props)
        this.state={
            breadList:[
                {
                    name:'标签管理',
                    path:'/system/sign'
                },
                {
                    name:'新增标签',
                    path:''
                }
            ],
            signName:''
        }
    }
    Input(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]:value
        })    
    }
    validate(){
        let validate = new Validate();
        let {signName} = this.state;
        validate.add(signName,'lengthRange:2:6','标签名称必须为2-6个字符！');
        return validate.start();    
    }
    save(){
        let msg = this.validate();
        if(msg){
            message.error(msg)
        }else{
            let {signName} = this.state;
            console.log(signName)
            systemApi.addSign({name:signName}).then(res=>{
                console.log(res)
                message.success('添加成功！');
                this.props.history.goBack();
            }).catch(msg=>{
                message.error(msg)
            })
        }
    }
    render(){
        let {breadList} = this.state;
        return (
            <div className={style.container}>
                <NavTab/>
                <div className={style.content}>
                    <Bread breadList = {breadList} 
                    />
                    <div className='form-container'>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>标签名称*</Col>
                                <Col offset='1' span='12'>
                                    <Input maxLength='10' name='signName' onChange = {(e) => this.Input(e)} value={this.state.signName}   placeholder ='请输入2~6个字的标签名称' />
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
export default withRouter(Banner);