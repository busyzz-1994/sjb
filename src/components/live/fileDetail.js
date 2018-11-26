import React,{Component} from 'react';
import _mm from 'util/mm.js';
import style from 'common/layout.scss';
import defaultImg from 'images/newsas.png';
import ImgUpload from 'components/global/uploadImg';
import SignList from 'components/global/signList/indexNew.js';
import AuditForm from 'components/global/auditForm';
import commonApi from 'api/common.js';
import liveApi from 'api/live/index.js';
import Validate from 'util/validate/index.js';
import widthImg from 'images/zs2.png';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col,Icon,Checkbox,DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { withRouter } from 'react-router-dom';
import config from 'base/config.json';
const Option = Select.Option;
const TextArea = Input.TextArea;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const {RangePicker} = DatePicker;
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
            // 直播封面图
            tpImg:'',
            //直播缩率图
            // thumbnail:'',
            //是否显示新闻来源
            newsSource:'',
            newsOrigin:false,
            //是否热门推荐
            hot:false,
            //video地址
            videoUrl:'',
            //直播长度
            videoMin:'',
            videoSec:'',
            //直播概要
            videoDetail:'',
            //选中的signList:
            signList:[''],
            signChecked:false,
            authStatus:-1,
            authString:'',
            //直播时间
            startTime:'2018-06-01 12:00:00',
            endTime:'2018-06-12 12:00:00'
        }
    }
    componentDidMount(){
        this.loadTypeList();
    }
    //添加类型选项
    loadTypeList(){
        commonApi.getIssueType({currPage:1,pageSize:9999,type:'3',theissue:'4'}).then(res=>{
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
        liveApi.getVideoDetail({
            videoId:id
        }).then(res=>{
            let {categoryId,videoTitle,videoSourceAdress,sourceIsShow,videoImage,tags,
                tagsIsShow,isHot,videoUrl,videoDesc,startTime,endTime} = res[0];
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
                startTime,endTime
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
        validate.add(title,'notEmpty','直播标题不能为空！');
        // validate.add(newsSource,'notEmpty','新闻来源不能为空！');
        validate.add(tpImg,'notEmpty','直播封面图不能为空！');
        validate.add(videoUrl,'notEmpty','上传直播文件地址不能为空！');
        return validate.start();
    }
    selectTime(date,dateString){
        let startTime = dateString[0],
            endTime = dateString[1];
        this.setState({
            startTime,endTime
        })
    }
    //审核文件
    authFile(){
        let {id,authStatus,authString} = this.state;
        if(authStatus == -1){
            message.error('未进行审核操作！');
            return ;
        }
        liveApi.authVideoFile({
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
            signChecked,hot,videoDetail,videoUrl,id,startTime,endTime} = this.state;
        liveApi.addFile({
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
            categoryId:categoryValue,
            startTime,endTime
        }).then(res=>{
            message.success('保存文件成功！');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err);
        })
    }
    render(){
        let {category,tpImg,signList,signChecked,authStatus,authString,checked,
            newsOrigin,hot,videoUrl,videoMin,videoSec,videoDetail,categoryValue,
            startTime,endTime} = this.state;
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
                        <Col span='4'>直播标题*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='30' value={this.state.title} onChange={(e)=>this.onInput(e)} name='title' placeholder='请输入不超过30个字的直播标题' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>直播来源*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='10' value={this.state.newsSource} onChange={(e)=>this.onInput(e)} name='newsSource' placeholder='请输入不超过10个字的直播来源' />
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
                        <Col span='4'>直播封面图*</Col>
                        <Col offset='1' span='12'>
                            <ImgUpload defaultImgUrl={widthImg} aspectRatio={690/380} imgWidth={230} imgUrl={tpImg?config.server + tpImg:''}  imgHeight={125} defaultImgUrl={defaultImg} getUrl = {(data,index)=>this.getUrl(data,index)} />
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
                        <Col span='4'>直播缩略图*</Col>
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
                        <Col span='4'>直播时长*</Col>
                        <Col offset='1' span='6'>
                            <Input addonAfter="分" maxLength='3' value={videoMin} onChange={(e)=>this.onInput(e)} name='videoMin' placeholder='请输入直播时长（分）' />
                        </Col>
                        <Col offset='1' span='6'>
                            <Input addonAfter="秒" maxLength='3' value={videoSec} onChange={(e)=>this.onInput(e)} name='videoSec' placeholder='请输入直播时长（秒）' />
                        </Col>
                    </Row>
                </div> */}
                <SignList
                    signList = {signList}
                    checked = {signChecked}
                    getList = {(list)=>this.getSignList(list)}
                    getStatus = {(val)=>this.getChecked(val)}
                />
                <div className='form-item'>
                    <Row>
                        <Col span='4'>直播时间*</Col>
                        <Col offset='1' span='12'>
                            <RangePicker locale={locale} showTime={true} allowClear= {false}
                            onChange = {(date,dateString)=>{this.selectTime(date,dateString)}} 
                            format="YYYY-MM-DD HH:mm:ss"
                            value = {[moment(`${startTime}`, 'YYYY-MM-DD HH:mm:ss'),moment(`${endTime}`, 'YYYY-MM-DD HH:mm:ss')]}
                            />
                            {/* <DatePicker defaultValue={moment('2015-01-01 12:12:12', 'YYYY-MM-DD HH:mm:ss')} format = 'YYYY-MM-DD HH:mm:ss'  /> */}
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>热门推荐*</Col>
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
                        <Col span='4'>上传直播文件*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='100' value={videoUrl} onChange={(e)=>this.onInput(e)} name='videoUrl' placeholder='请输入直播连接URL地址 (建议先用浏览器测试该URL是否有效)' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>直播概要</Col>
                        <Col offset='1' span='12'>
                            <TextArea rows={5} value={videoDetail}  onChange={(e)=>this.setState({videoDetail:e.target.value})} /> 
                        </Col>
                    </Row>
                </div>
                {    checked == 2 ?
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
            </div>
        )
    }
}
export default withRouter(TypeSave);