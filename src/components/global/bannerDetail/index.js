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
const Option = Select.Option;
class BannerDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            checked:_mm.getParam('checked'),
            //链接类型
            type:1,
            //banner类型
            breadName:'新增banner',
            bannerType:0,
            bannerTitle:'',
            bannerDetail:'',
            linkUrl:'',
            //上传后的图片地址
            imgUrl:'',
            //关联弹出框是否显示
            modalVisible:false,
            //关联内容id
            fkId:1
        }
    }
    componentDidMount(){
        let {id} = this.state;
        if(id){
            this.loadData();
        }
    }
    loadData(){
        let { id } = this.state;
        newsEditApi.getBannerDetai({id})
        .then(res=>{
            let {baType,type,reUrl,title,titleImg,fkId} = res[0];
            this.setState({
                type:baType,
                bannerType:type,
                linkUrl:reUrl,
                bannerTitle:title,
                imgUrl:config.server + titleImg,
                fkId
            })
        })
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
        validate.add(bannerDetail,'notEmpty','banner详情不能为空！')
        let msg = validate.start();
        return msg;
    }
    //点击保存
    save(){
       let msg = this.validate();
       if(msg){
            message.error(msg)
       }else{
        let {id,type,fkId,linkUrl,bannerTitle,imgUrl,bannerType} = this.state;
            newsEditApi.addBanner({
                baType:type,
                fkId,
                reUrl:linkUrl,
                title:bannerTitle,
                titleImg:imgUrl,
                type:bannerType
            })
       }
    }
    render(){
        let {type,bannerType} = this.state;
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
                        <Col span='4'>banner类别*</Col>
                        <Col offset='1' span='6'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                onChange={(value)=>{this.selectBannerType(value)}}
                                defaultValue = '新闻'
                            >
                                <Option value="0">新闻</Option>
                                <Option value="1">商家</Option>
                                <Option value="2">商品</Option>
                                <Option value="3">直播</Option>
                                <Option value="4">视频</Option>
                                <Option value="5">音乐</Option>
                                <Option value="6">广告</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
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
                <div className='form-item'>
                    <Row>
                        <Col span='4'>banner详情*</Col>
                        <Col offset='1' span='8'>
                            <Input value={this.state.bannerDetail} name='bannerDetail' onChange={(e)=>{this.onInput(e)}} placeholder ='请选择banner关联的新闻' />
                        </Col>
                        <Col offset='1' span='4'>
                            <Button type='primary' onClick={()=>{this.newsListOther()}}  icon='plus'>关联相关新闻</Button>
                        </Col>
                    </Row>
                </div>
                {
                    this.state.checked == 0 ? 
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