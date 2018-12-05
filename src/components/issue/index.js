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
        // this.loadTypeList();
    }
    //添加类型选项
    loadTypeList(){
        commonApi.getIssueType({currPage:1,pageSize:9999,type:'4',theissue:'4'}).then(res=>{
            let list = res[0].lists;
            this.setState({
                category:list
            },()=>{
                this.setState({
                    categoryValue:list[0]?list[0].id:''
                },()=>{
                    let {id} = this.state;
                    if(id){
                        this.getDetail();
                    }
                })
            })
        })
    }
    getDetail(){
        let {id} = this.state;
        videoApi.getVideoDetail({
            videoId:id
        }).then(res=>{
            let {categoryId,videoTitle,videoSourceAdress,sourceIsShow,videoImage,tags,
                tagsIsShow,isHot,videoUrl,videoDesc} = res[0];
            this.setState({
                categoryValue:categoryId,
                title:videoTitle,
                newsSource:videoSourceAdress,
                newsOrigin:+sourceIsShow?true:false,
                tpImg:videoImage,
                signList:tags.length!=0?tags:[''],
                signChecked:+tagsIsShow?true:false,
                hot:+isHot?true:false,
                videoUrl,
                videoDetail:videoDesc
            })    
        }).catch(err=>{
            message.error(err);
        })
    }
    onInput(e){
        let name = e.target.name,
        value = e.target.value;
        this.setState({
            [name]:value
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
    //验证表单信息
    validate(){
        let validate = new Validate();
        let {title,newsSource,tpImg,signList,videoUrl} = this.state;
        validate.add(title,'notEmpty','视频标题不能为空！');
        // validate.add(newsSource,'notEmpty','新闻来源不能为空！');
        validate.add(tpImg,'notEmpty','视频封面图不能为空！');
        validate.add(videoUrl,'notEmpty','上传视频文件地址不能为空！');
        return validate.start();
    }
    //审核文件
    authFile(){
        let {id,authStatus,authString} = this.state;
        if(authStatus == -1){
            message.error('未进行审核操作！');
            return ;
        }
        videoApi.authVideoFile({
            videoId:id,
            checkview:authStatus,
            remark:authString
        }).then(res=>{
            message.success('审核成功！');
            this.props.history.goBack();
        }).catch(err=>{
            message.error(err)
        })
    }
    //添加或编辑文件
    addFile(){
        let {title,categoryValue,newsSource,newsOrigin,tpImg,signList,
            signChecked,hot,videoDetail,videoUrl,id} = this.state;
            console.log(id)
        videoApi.addFile({
            videoId:id,
            videoTitle:title,
            videoSourceAdress:newsSource,
            sourceIsShow:newsOrigin?'1':'0',
            videoImage:tpImg,
            tagsIsShow:signChecked?'1':'0',
            tags:signList,
            isHot:hot?'1':'0',
            videoUrl,
            videoDesc:videoDetail,
            categoryId:categoryValue
        }).then(res=>{
            message.success('保存文件成功！');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err);
        })
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