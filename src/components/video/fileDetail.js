import React,{Component} from 'react';
import _mm from 'util/mm.js';
import style from 'common/layout.scss';
import defaultImg from 'images/newsas.png';
import ImgUpload from 'components/global/uploadImg';
import SignList from 'components/global/signList/indexNew.js';
import AuditForm from 'components/global/auditForm';
import commonApi from 'api/common.js';
import videoApi from 'api/video/index.js';
import Validate from 'util/validate/index.js';
import widthImg from 'images/zs2.png';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col,Icon,Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import config from 'base/config.json';
import FilterWord from 'components/global/filterWord/index.js';
const Option = Select.Option;
const TextArea = Input.TextArea;
// import NewsCategorySave from '../components/newsCategorySave';
class TypeSave extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked:_mm.getParam('checked'),
            id:this.props.match.params.id,
            category:[],
            categoryValue:'',
            title:'',
            // 视频封面图
            tpImg:'',
            //视频缩率图
            // thumbnail:'',
            //是否显示新闻来源
            newsSource:'',
            newsOrigin:false,
            //是否热门推荐
            hot:false,
            //video地址
            videoUrl:'',
            //视频长度
            videoMin:'',
            videoSec:'',
            //视频概要
            videoDetail:'',
            //选中的signList:
            signList:[''],
            signChecked:true,
            authStatus:-1,
            authString:''
        }
    }
    componentDidMount(){
        this.loadTypeList();
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
                tagsIsShow,isHot,videoUrl,videoDesc,checkview,remark} = res[0];
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
                videoDetail:videoDesc,
                authStatus:checkview?+checkview:-1,
                authString:remark
            })    
        }).catch(err=>{
            message.error(err);
        })
    }
    selectCategory(value){
        this.setState({
            categoryValue:value
        })
    }
    onInput(e){
        let name = e.target.name,
        value = e.target.value;
        this.setState({
            [name]:value
        })  
    }
    //获取封面图
    getUrl(data,index){
        let url =data[0].attachFilenames;
        this.setState({
            tpImg:url
        })
    }
    //获取缩略图
    // getUrl_2(data,index){
    //     let url =data[0].attachFilenames;
    //     this.setState({
    //         thumbnail:url
    //     })
    // }
    //获取signList
    getSignList(arr){
        this.setState({
            signList:arr
        })
    }
    //获取选中状态
    getChecked(value){
        this.setState({
            signChecked:value
        })
    }
    //获取审核状态
    getAuthStatus(status){
        this.setState({
            authStatus:status
        })
    }
    //获取审核结果字符串
    getAuthString(string){
        this.setState({
            authString:string
        })
    }
    //切换新闻来源
    changeNewsOrigin(e){
        let status = e.target.checked;
        this.setState({
            newsOrigin:status
        })
    }
    //热门推荐
    changeHot(e){
        let status = e.target.checked;
        this.setState({
            hot:status
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
        validate.add(signList,'checkSignList','标签不能为空！');
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
        let auth = ()=>{
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
        auth();
        // if(authStatus == 2){
        //     let map = {
        //         '0':()=>{this.filerWord.checkWord(ptDetail,()=>{auth()})},
        //         '1':()=>{this.filerWord.checkWord(wbDetail,()=>{auth()})}
        //     }
        //     map[type]();
        // }
        
    }
    //添加或编辑文件
    addFile(){
        let {title,categoryValue,newsSource,newsOrigin,tpImg,signList,
            signChecked,hot,videoDetail,videoUrl,id} = this.state;
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
        let {category,tpImg,signList,signChecked,authStatus,authString,checked,
            newsOrigin,hot,videoUrl,videoMin,videoSec,videoDetail,categoryValue} = this.state;
        return (
            <div className='form-container'>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>选择类型*</Col>
                        <Col offset='1' span='6'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                value = {categoryValue}
                                onChange={(value)=>{this.selectCategory(value)}}
                            >
                                {
                                    category.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.id}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>视频标题*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='30' value={this.state.title} onChange={(e)=>this.onInput(e)} name='title' placeholder='请输入不超过30个字的视频标题' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>直播来源</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='10' value={this.state.newsSource} onChange={(e)=>this.onInput(e)} name='newsSource' placeholder='请输入不超过10个字的视频来源' />
                        </Col>
                        <Col offset='1' span='4'>
                            <Checkbox
                                checked={newsOrigin}
                                onChange={(e)=>this.changeNewsOrigin(e)}
                            >
                            显示来源
                            </Checkbox>
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>视频封面图*</Col>
                        <Col offset='1' span='12'>
                            <ImgUpload defaultImgUrl={widthImg} aspectRatio={690/380} imgWidth={230} imgUrl={_mm.processImageUrl(tpImg)}  imgHeight={125} defaultImgUrl={defaultImg} getUrl = {(data,index)=>this.getUrl(data,index)} />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'></Col>
                        <Col offset='1' span='16'>
                            建议上传尺寸690*380,10-65KB
                        </Col>
                    </Row>
                </div>
                {/* <div className='form-item'>
                    <Row>
                        <Col span='4'>视频缩略图*</Col>
                        <Col offset='1' span='12'>
                            <ImgUpload  aspectRatio={240/310} imgWidth={160} imgUrl={thumbnail?config.server + thumbnail:''}  imgHeight={206} defaultImgUrl={defaultImg} getUrl = {(data,index)=>this.getUrl_2(data,index)} />
                        </Col>
                    </Row>
                </div> */}
                {/* <div className='form-item'>
                    <Row>
                        <Col span='4'></Col>
                        <Col offset='1' span='16'>
                            建议上传尺寸240*310,10-65KB
                        </Col>
                    </Row>
                </div> */}
                {/* <div className='form-item'>
                    <Row>
                        <Col span='4'>视频时长*</Col>
                        <Col offset='1' span='6'>
                            <Input addonAfter="分" maxLength='3' value={videoMin} onChange={(e)=>this.onInput(e)} name='videoMin' placeholder='请输入视频时长（分）' />
                        </Col>
                        <Col offset='1' span='6'>
                            <Input addonAfter="秒" maxLength='3' value={videoSec} onChange={(e)=>this.onInput(e)} name='videoSec' placeholder='请输入视频时长（秒）' />
                        </Col>
                    </Row>
                </div> */}
                <SignList
                    type={1}
                    signList = {signList}
                    checked = {signChecked}
                    getList = {(list)=>this.getSignList(list)}
                    getStatus = {(val)=>this.getChecked(val)}
                />
                <div className='form-item'>
                    <Row>
                        <Col span='4'>热门推荐</Col>
                        <Col offset='1' span='12'>
                            <Checkbox
                                checked={hot}
                                onChange={(e)=>this.changeHot(e)}
                            >
                            加入热门推荐
                            </Checkbox>
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>上传视频文件*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='100' value={videoUrl} onChange={(e)=>this.onInput(e)} name='videoUrl' placeholder='请输入视频连接URL地址 (建议先用浏览器测试该URL是否有效)' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>视频概要</Col>
                        <Col offset='1' span='12'>
                            <TextArea rows={5} value={videoDetail}  onChange={(e)=>this.setState({videoDetail:e.target.value})} /> 
                        </Col>
                    </Row>
                </div>
                {    (checked == 2 || checked == 4)? 
                        <AuditForm
                        status = {authStatus}
                        detail = {authString}
                        getStatus = {(status)=>this.getAuthStatus(status)}
                        getDetail = {(string)=>this.getAuthString(string)}
                    />:
                    null
                }
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
                <FilterWord ref={target=>{this.filerWord = target}} />
            </div>
        )
    }
}
export default withRouter(TypeSave);