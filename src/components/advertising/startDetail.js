import React,{Component} from 'react';
import _mm from 'util/mm.js';
import style from 'common/layout.scss';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col} from 'antd';
import { withRouter } from 'react-router-dom';
import advertisingApi from 'api/advertising/index.js';
import ImgUploadStart from 'images/start.png'
import commonApi from 'api/common.js';
import config from 'base/config.json';
import UploadImg from 'components/global/uploadImg';
import OtherNewsModal from 'components/global/otherNewsModal';
import Validate from 'util/validate';
import AuditForm from 'components/global/auditForm';
const Option = Select.Option;
class startDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            checked:_mm.getParam('checked'),
            //链接类型
            type:'0',
            //banner类型
            breadName:'新增banner',
            bannerType:_mm.getParam('bannerType'),
            bannerTitle:'',
            linkUrl:'',
            //内链信息
            bannerDetail:'',
            fkId:'',
            resourcesType:'',
            //上传后的图片地址
            imgUrl:'',
            //关联弹出框是否显示
            modalVisible:false,
            //关联内容id
            fkId:'',
            //关联素材的类型
            resourcesType:'',
            //审核
            status:-1,
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
        console.log(id);
        advertisingApi.getDetail({advId:id})
        .then(res=>{
            console.log(res[0])
            let {advImage,advTitle,advType,reUrl,fkId,resourcesType,advDesc,checkview,remark} = res[0]
            // let {baType,type,reUrl,title,titleImg,fkId,remark,checkview} = res[0];
            this.setState({
                type:advType,
                linkUrl:reUrl,
                bannerTitle:advTitle,
                imgUrl:advImage,
                fkId,
                resourcesType,
                bannerDetail:advDesc,
                status:checkview?+checkview:-1,
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
       let url = data[0].attachFilenames;
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
        validate.add(bannerTitle,'notEmpty','广告标题不能为空！')
        validate.add(imgUrl,'notEmpty','广告图片不能为空！')
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
        let {bannerTitle,bannerDetail,imgUrl,fkId,type,linkUrl,resourcesType} = this.state;
        advertisingApi.addDetail({
                advMethod:0,
                advType:type,
                advTitle:bannerTitle,
                advImage:imgUrl,
                reUrl:linkUrl,
                fkId,
                resourcesType,
                advDesc:bannerDetail
            }).then(res=>{
                 message.success('添加成功！');
                 this.props.history.goBack()
            }).catch(err=>{
                message.error(err);
            })
    }
    updateBanner(){
        let {bannerTitle,bannerDetail,imgUrl,fkId,type,linkUrl,resourcesType,id} = this.state;
        advertisingApi.addDetail({
                advMethod:0,
                advType:type,
                advTitle:bannerTitle,
                advImage:imgUrl,
                reUrl:linkUrl,
                fkId,
                resourcesType,
                advDesc:bannerDetail,
                advId:id
            }).then(res=>{
                 message.success('编辑成功！');
                 this.props.history.goBack()
            }).catch(err=>{
                message.error(err);
            })
    }
    auditBanner(){
        let {id,status,detail} = this.state;
        if(status == -1){
            message.error('未进行审核操作！');
            return ;
        }
        advertisingApi.authDetail({
            checkview:status,
            remark:detail,
            advId:id
        }).then(res=>{
            message.success('审核成功！')
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err)
        })
    }
    relevanceCallback(selectedRowKeys,fn){
        let {newsId,resourcesName,resourcesType} = selectedRowKeys[0];
        this.setState({
            bannerDetail:resourcesName,
            fkId:newsId,
            resourcesType,
            modalVisible:false
        },()=>{
            fn()
        })
    }
    render(){
        let {type,bannerType,isAdd,status,detail,checked,imgUrl} = this.state;
        return (
            <div className='form-container'>
                    <OtherNewsModal visible={this.state.modalVisible} 
                    ok={()=>{this.setState({modalVisible:false})}}
                    cancel={()=>{this.setState({modalVisible:false})}}
                    callback = {(selectedRowKeys,fn)=>this.relevanceCallback(selectedRowKeys,fn)}
                    type = 'radio'
                />
                <div className='form-item'>
                    <Row>
                        <Col span='4'>广告类型*</Col>
                        <Col offset='1' span='6'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                onChange={(value)=>{this.select(value)}}
                                value = {type}
                                
                            >
                                <Option value="0">内链</Option>
                                <Option value="1">外链</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
                {
                    type == 1 ?
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
                        <Col span='4'>广告标题*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='30' value={this.state.bannerTitle} name='bannerTitle' onChange={(e)=>{this.onInput(e)}} placeholder ='广告标题请勿超过30个字' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>广告图片*</Col>
                        <Col offset='1' span='16'>
                            <UploadImg defaultImgUrl={ImgUploadStart} aspectRatio={9/16}  imgWidth={250} imgHeight={445}  imgUrl={this.state.imgUrl? config.server + this.state.imgUrl:''} getUrl={(data)=>{this.getImgData(data)}}/>
                            <div>建议尺寸（750 * 1335 px）</div>
                        </Col>
                    </Row>
                </div>
                {
                    type == 1 ? null :(
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>广告详情*</Col>
                                <Col offset='1' span='8'>
                                    <Input disabled={type == 1 ? false : true}  value={this.state.bannerDetail} name='bannerDetail' onChange={(e)=>{this.onInput(e)}} placeholder ='请选择广告关联的新闻' />
                                </Col>
                                <Col offset='1' span='4'>
                                    <Button disabled={type == 1 ? true : false} type='primary' onClick={()=>{this.newsListOther()}}  icon='plus'>关联相关新闻</Button>
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
export default withRouter(startDetail);