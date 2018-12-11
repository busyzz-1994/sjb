import React,{Component} from 'react';
import _mm from 'util/mm.js';
import style from 'common/layout.scss';
import Validate from 'util/validate/index.js';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col,Icon,Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import config from 'base/config.json';
import Reply from './reply.js';
import IssueApi from 'api/issue/index.js';
const Option = Select.Option;
const TextArea = Input.TextArea;
// import NewsCategorySave from '../components/newsCategorySave';
class TypeSave extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked:_mm.getParam('checked'),
            id:this.props.match.params.id,
            type:this.props.match.params.type,
            userName:'',
            title:'',
            name:'',
            phone:'',
            img:[],
        }
    }
    componentDidMount(){
        this.getDetail()
    }
    getDetail(){
        let {id} = this.state;
        IssueApi.getReply({id}).then(res=>{
            console.log(res);
        }).catch(err=>{
            message.error(err);
        })
    }
    
    //点击保存
    save(){
        let {checked} = this.state;
        if(checked == '2' || checked == '4'){
            this.authFile();
        }else{
            let msg = this.validate();
            if(msg){
                message.error(msg);
            }else{
                this.addFile();
            }
        }
    }
   
    render(){
        return (
            <div className='form-container'>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>用户名*</Col>
                        <Col offset='1' span='12'>
                            <Input disabled={true} maxLength='30' value={this.state.title} onChange={(e)=>this.onInput(e)} name='userName' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>标题*</Col>
                        <Col offset='1' span='12'>
                            <Input disabled={true} maxLength='30' value={this.state.title} onChange={(e)=>this.onInput(e)} name='title' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>联系人姓名*</Col>
                        <Col offset='1' span='12'>
                            <Input disabled={true} maxLength='30' value={this.state.name} onChange={(e)=>this.onInput(e)} name='name' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>联系电话*</Col>
                        <Col offset='1' span='12'>
                            <Input disabled={true} maxLength='30' value={this.state.phone} onChange={(e)=>this.onInput(e)} name='phone' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>图片*</Col>
                        <Col offset='1' span='12'>
                            <img src={config.server} style={{maxWidth:'200px',maxHeight:'200px'}}/>
                        </Col>
                    </Row>
                </div>
                <Reply/>
                {
                    (this.state.checked == 0 || this.state.checked ==4 )? 
                    null
                    : (
                        <div className='form-item btn-item'>
                            <Row>
                                <Col offset='5' span='10'>
                                    <Button onClick={()=>{this.save()}} type='primary' size='large'>保存</Button>
                                    <Button onClick={()=>{this.props.history.goBack()}} size='large'>取消</Button>
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </div>
        )
    }
}
export default withRouter(TypeSave);