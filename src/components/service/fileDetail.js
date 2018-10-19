import React,{Component} from 'react';
import _mm from 'util/mm.js';
import style from 'common/layout.scss';
import defaultImg from 'images/newsas.png';
import upload_2 from 'images/upload_2.png';
import addImg from 'images/add.png';
import ImgUpload from 'components/global/uploadImg';
import SignList from 'components/global/signList/indexNew.js';
import ImgList from 'components/global/imgList'
import Editor from 'components/global/editor';
import AuditForm from 'components/global/auditForm';
import Validate from 'util/validate';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col,Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import newsEditApi from 'api/news/banner';
import commonApi from 'api/common.js';
import serviceApi from 'api/service/index.js';
import config from 'base/config.json';
const Option = Select.Option;
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
            // 服务缩略图
            tpImg:'',
            //地址
            address:'',
            //评分
            score:'',
            //消费次数
            count:'',
            //起始价格
            startPrice:'',
            //精确地理位置
            exactAddress:'',
            //服务主图
            fwImg:'',
            fwImgList:[''],
            //新闻内容detail
            detail:'',
            //选中的signList:
            signList:[],
            signChecked:false,
            defaultDetail:'',
            detail:'',
            authStatus:2,
            authString:''
        }
    }
    selectCategory(value){
        this.setState({
            categoryValue:value
        })
    }
    componentDidMount(){
        this.loadTypeList();
    }
     //添加类型选项
     loadTypeList(){
        commonApi.getIssueType({currPage:1,pageSize:9999,type:'1',theissue:'4'}).then(res=>{
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
        serviceApi.getFileDetail({
            id
        }).then(res=>{
            console.log(res);
            let {categoryId,title,thumbnail,score,degree,address,detailed,price,
                content,listag,coverimg,spectacular} = res[0];
            this.setState({
                categoryValue:categoryId,
                title:title,
                tpImg:thumbnail,
                score,
                count:degree,
                address,
                exactAddress:degree,
                startPrice:price,
                defaultDetail:content,
                detail:content,
                signList:listag,
                signChecked:spectacular=='1'?true:false,
                fwImgList:coverimg.split(',')
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
    //获取缩略图
    getUrl(data,index){
        let url =  data[0].attachFilenames;
        this.setState({
            tpImg:url
        })
    }
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
    //获取编辑内容
    getHtml(html){
        this.setState({
            detail:html
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
        let {title,tpImg,score,count,address,startPrice} = this.state;
        validate.add(title,'notEmpty','服务标题不能为空！');
        validate.add(tpImg,'notEmpty','服务缩略图不能为空！');
        validate.add(score,'numberRange:0:5','评分只能为0-5的数字！');
        validate.add(count,'notMinus','消费次数为整数！');
        validate.add(address,'notEmpty','地址不能为空！');
        validate.add(startPrice,'notFloatMinus','起始价格必须为数字！');
        return validate.start();
    }
    //审核文件
    authFile(){
        let {id,authStatus,authString} = this.state;
        serviceApi.authFile({
            id:id,
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
        let {title,categoryValue,score,count,tpImg,signList,address,startPrice,
            signChecked,id,exactAddress,fwImgList,detail} = this.state;
            console.log({
                title,
                thumbnail:tpImg,
                degree:count,
                score,
                address,
                price:startPrice,
                listag:signList,
                detailed:exactAddress,
                spectacular:signChecked?'1':'0',
                coverimg:fwImgList.join(','),
                categoryId:categoryValue,
                content:detail
            })
        serviceApi.addFile({
            id,
            title,
            thumbnail:tpImg,
            degree:count,
            score,
            address,
            price:startPrice,
            listag:signList,
            detailed:exactAddress,
            spectacular:signChecked?'1':'0',
            coverimg:fwImgList.join(','),
            categoryId:categoryValue,
            content:detail
        }).then(res=>{
            message.success('保存文件成功！');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err);
        })
    }
    render(){
        let {category,categoryValue,tpImg,signList,signChecked,fwImgList,
            defaultDetail,authStatus,authString,checked} = this.state;
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
                                // defaultValue = {this.state.selectValue}
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
                        <Col span='4'>服务标题*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='30' value={this.state.title} onChange={(e)=>this.onInput(e)} name='title' placeholder='请输入不超过30个字的服务标题' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>服务缩略图*</Col>
                        <Col offset='1' span='12'>
                            <ImgUpload imgWidth={160} imgUrl={tpImg?config.server+tpImg:''}  imgHeight={140} defaultImgUrl={defaultImg} getUrl = {(data,index)=>this.getUrl(data,index)} />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'></Col>
                        <Col offset='1' span='16'>
                            建议上传尺寸180*180,10-65KB
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>服务评分*</Col>
                        <Col offset='1' span='12'>
                            <Input value={this.state.score} onChange={(e)=>this.onInput(e)} name='score' placeholder='请输入0-5评分,可以有小数点' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>消费次数*</Col>
                        <Col offset='1' span='12'>
                            <Input value={this.state.count} onChange={(e)=>this.onInput(e)} name='count' placeholder='请输入消费次数' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>地址*</Col>
                        <Col offset='1' span='12'>
                            <Input value={this.state.address} onChange={(e)=>this.onInput(e)} name='address' placeholder='请输入地址' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>起始价格*</Col>
                        <Col offset='1' span='12'>
                            <Input value={this.state.startPrice} onChange={(e)=>this.onInput(e)} name='startPrice' placeholder='请输入起始价格' />
                        </Col>
                    </Row>
                </div>
                <SignList
                    signList = {signList}
                    checked = {signChecked}
                    getList = {(list)=>this.getSignList(list)}
                    getStatus = {(val)=>this.getChecked(val)}
                />
                <div className='form-item'>
                    <Row>
                        <Col span='4'>精确地理位置*</Col>
                        <Col offset='1' span='12'>
                            <Input value={this.state.exactAddress} onChange={(e)=>this.onInput(e)} name='exactAddress' placeholder='请输入商家精确地理位置' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>服务主图*</Col>
                        <Col offset='1' span='19'>
                            <ImgList 
                                fwImgList={fwImgList}
                                getImgList = {(newList)=>this.setState({fwImgList:newList})}
                           />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'></Col>
                        <Col offset='1' span='16'>
                            建议上传尺寸750*320,10-65KB,20张以内
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                    <Col span='4'>内容编辑*</Col>
                        <Col offset='1' span='18'>
                        <Editor 
                        defaultDetail = {defaultDetail}
                        getHtml={html => this.getHtml(html)}/>
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
                <div className='form-item btn-item'>
                    <Row>
                        <Col offset='5' span='10'>
                            <Button onClick={()=>{this.save()}} type='primary' size='large'>保存</Button>
                            <Button onClick={()=>{this.props.history.goBack()}} size='large'>取消</Button>
                        </Col>
                    </Row>
                </div>
                
            </div>
        )
    }
}
export default withRouter(TypeSave);