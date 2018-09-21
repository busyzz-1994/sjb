import React,{Component} from 'react';
import _mm from 'util/mm.js';
import NavTab from 'components/global/navTab';
import style from './index.scss';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col} from 'antd';
import { withRouter } from 'react-router-dom';
import newsEditApi from 'api/news/banner';
import commonApi from 'api/common.js';
import config from 'base/config.json';
import UploadImg from 'components/global/uploadImg';
import OtherNewsModal from 'components/global/otherNewsModal';
import Validate from 'util/validate';
import AuditForm from 'components/global/auditForm';
const Option = Select.Option;
class BannerDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            checked:_mm.getParam('checked'),
            //链接类型
            type:'1',
            //banner类型
            breadName:'新增banner',
            bannerType:_mm.getParam('bannerType'),
            bannerTitle:'',
            bannerDetail:'',
            linkUrl:'',
            //上传后的图片地址
            imgUrl:'',
            //关联弹出框是否显示
            modalVisible:false,
            //关联内容id
            fkId:'',
            //关联素材的类型
            resourcesType:'',
            //审核
            status:2,
            detail:''
        }
    }
    componentDidMount(){
        let {id} = this.state;
        if(id){
            this.loadData();
        }
    }
    loadData(){
        let { id,checked } = this.state;
        newsEditApi.getBannerDetai({id})
        .then(res=>{
            let {baType,type,reUrl,title,titleImg,fkId,remark,checkview} = res[0];
            console.log(checkview)
            this.setState({
                type:baType,
                bannerType:type,
                linkUrl:reUrl,
                bannerTitle:title,
                imgUrl:config.server + titleImg,
                fkId,
                status:checkview === '0' ? 2 : +checkview,
                detail:remark
            })
        })
    }
    loadAudit(){

    }
    select(value){
        this.setState({
            type:value
        })
    }
    selectBannerType(value){
        this.setState({
            bannerType:value
        })
    }
    onInput(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]:value
        })    
    }
    //上传文件
    getImgData(data){
       let url = config.server +  data[0].attachFilenames;
       this.setState({
         imgUrl:url
       })
    }
    //选择关联新闻
    newsListOther(){
        this.setState((preState)=>({
            modalVisible:!preState.modalVisible
        }))
    }
    //验证表单
    validate(){
        let {bannerTitle,bannerDetail,imgUrl} = this.state;
        let validate = new Validate();
        validate.add(bannerTitle,'notEmpty','banner标题不能为空！')
        validate.add(imgUrl,'notEmpty','轮播图不能为空！')
        // validate.add(bannerDetail,'notEmpty','banner详情不能为空！')
        let msg = validate.start();
        return msg;
    }
    //点击保存
    save(){
       let msg = this.validate();
       if(msg){
            message.error(msg)
       }else{
            let {checked} = this.state;
            if(checked === null){
                this.addBanner();
            }else if(checked == '2'){
                this.auditBanner()
            }else{
                this.updateBanner()
            }
       }
    }
    addBanner(){
        let {id,type,fkId,linkUrl,bannerTitle,imgUrl,bannerType,resourcesType} = this.state;
            newsEditApi.addBanner({
                baType:type,
                fkId,
                reUrl:linkUrl,
                title:bannerTitle,
                titleImg:_mm.processImgUrl(imgUrl),
                type:bannerType,
                resourcesType
            }).then(res=>{
                 message.success('添加成功！');
                 this.props.history.goBack()
            }).catch(err=>{
                message.error(err);
            })
    }
    updateBanner(){
        let {id,type,fkId,linkUrl,bannerTitle,imgUrl,bannerType,resourcesType} = this.state;
        newsEditApi.updateBanner({
            baType:type,
            fkId,
            reUrl:linkUrl,
            title:bannerTitle,
            titleImg:_mm.processImgUrl(imgUrl),
            type:bannerType,
            resourcesType,
            id
        }).then(res=>{
             message.success('修改成功！');
             this.props.history.goBack()
        }).catch(err=>{
            message.error(err);
        })
    }
    auditBanner(){
        let {id,status,detail} = this.state;
        newsEditApi.auditBanner({
            checkview:status,
            remark:detail,
            id
        }).then(res=>{
            message.success('审核成功！')
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        let {type,bannerType,isAdd,status,detail,checked} = this.state;
        return (
            <div className='form-container'>
                    <OtherNewsModal visible={this.state.modalVisible} 
                ok={()=>{this.setState({modalVisible:false})}}
                cancel={()=>{this.setState({modalVisible:false})}}
                />
                <div className='form-item'>
                    <Row>
                        <Col span='4'>链接类型*</Col>
                        <Col offset='1' span='6'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                onChange={(value)=>{this.select(value)}}
                                value = {type}
                                
                            >
                                <Option value="1">内链</Option>
                                <Option value="0">外链</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
                {
                    type == 0 ?
                    <div className='form-item'>
                        <Row>
                            <Col span='4'>外链地址*</Col>
                            <Col offset='1' span='12'>
                            <Input maxLength='100' value={this.state.linkUrl} name='linkUrl' onChange={(e)=>{this.onInput(e)}} placeholder ='请输入外链的URL地址,列如：http://...' />
                            </Col>
                        </Row>
                    </div>
                    : null
                }
                <div className='form-item'>
                    <Row>
                        <Col span='4'>banner标题*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='30' value={this.state.bannerTitle} name='bannerTitle' onChange={(e)=>{this.onInput(e)}} placeholder ='banner标题请勿超过30个字' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>轮播图*</Col>
                        <Col offset='1' span='16'>
                            <UploadImg  imgUrl={this.state.imgUrl} getUrl={(data)=>{this.getImgData(data)}}/>
                            <div>建议尺寸（320 * 140 px）</div>
                        </Col>
                    </Row>
                </div>
                {
                    type == 0 ? null :(
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>banner详情*</Col>
                                <Col offset='1' span='8'>
                                    <Input disabled={type == 0 ? false : true}  value={this.state.bannerDetail} name='bannerDetail' onChange={(e)=>{this.onInput(e)}} placeholder ='请选择banner关联的新闻' />
                                </Col>
                                <Col offset='1' span='4'>
                                    <Button disabled={type == 0 ? true : false} type='primary' onClick={()=>{this.newsListOther()}}  icon='plus'>关联相关新闻</Button>
                                </Col>
                            </Row>
                        </div>
                    )
                }
                {
                    (checked == '2' || checked =='4') ? (
                        <AuditForm 
                            status = {status}
                            getStatus = {(status)=> this.setState({status})}
                            detail = {detail}
                            getDetail = {(detail) => this.setState({detail})}
                        />
                    ) : null
                }
                {
                    (this.state.checked == 0 || this.state.checked ==4 )? 
                    null
                    : 
                    <div className='form-item btn-item'>
                        <Row>
                            <Col offset='5' span='10'>
                                <Button onClick={()=>{this.save()}} type='primary' size='large'>保存</Button>
                                <Button onClick={()=>{this.props.history.goBack()}} size='large'>取消</Button>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}
export default withRouter(BannerDetail);