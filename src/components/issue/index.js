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
import self from './index.scss';
import api from 'api/issue/index.js';
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
            content:'',
            createTime:'',
            reply:'',
            list:[]
        }
    }
    componentDidMount(){
        this.getDetail()
    }
    getDetail(){
        let {id} = this.state;
        IssueApi.getReply({id}).then(res=>{
           let {userName,title,phone,name,img,content,createTime,list} = res[0];
           img = img === null ? '' : img;
           content = createTime + '\n' + content;
           img = img.split(',');
           this.setState({
                userName,
                name,
                title,
                phone,
                content,
                img,
                list
           })
        }).catch(err=>{
            message.error(err);
        })
    }
    validate(){
        let {reply} = this.state;
        let validate = new Validate();
        validate.add(reply,'notEmpty','回复内容不能为空！');
        return validate.start();
    }
    onInput(e){
        let val = e.target.value,
            name = e.target.name;
        this.setState({
            [name]:val
        })
    }
    //点击保存
    save(){
        let msg = this.validate();
        let {id,reply} = this.state;
        if(msg){
            message.error(msg)
        }else{
            api.submitReply({complaintsId:id,content:reply}).then(res=>{
                message.success('回复成功')
                this.getDetail()
            }).catch(err=>{
                message.error(err)
            })
        }
        // let {checked} = this.state;
        // if(checked == '2' || checked == '4'){
        //     this.authFile();
        // }else{
        //     let msg = this.validate();
        //     if(msg){
        //         message.error(msg);
        //     }else{
        //         this.addFile();
        //     }
        // }
    }
   
    render(){
        let {img,content,list} = this.state;
        let flag = img.length == 0 || (img.length == 1 && img[0] == '') ? false : true
        return (
            <div className='form-container'>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>用户名*</Col>
                        <Col offset='1' span='12'>
                            <Input disabled={true} maxLength='30' value={this.state.userName} onChange={(e)=>this.onInput(e)} name='userName' />
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
                            {
                                flag? img.map((item,index)=>{
                                    return  <img className={self.img} src={_mm.processImageUrl(item)} key={index} style={{maxWidth:'200px',maxHeight:'200px'}}/>
                                 }):'暂无上传图片'
                            }
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>内容</Col>
                        <Col offset='1' span='12'>
                            <TextArea rows={4} disabled value={content}/>
                        </Col>
                    </Row>
                </div>
                {
                    list.map((item,index)=>{
                        console.log(item.replyType)
                        return <Reply fn={()=>{this.getDetail()}} id={item.id} type={item.replyType} isShow={item.isShow} content={`${item.createTime}\n${item.content}`} key={index}/>
                    })
                }
                <div className='form-item'>
                    <Row>
                        <Col span='4'>回复*</Col>
                        <Col offset='1' span='12'>
                            <TextArea rows={4} placeholder='回复内容不超过500字' onChange={(e)=>this.onInput(e)} name='reply'/>
                        </Col>
                    </Row>
                </div>
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