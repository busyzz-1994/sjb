import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Col,Row,Input,Select,Checkbox,Button,message} from 'antd';
import General from './general.js';
import Picture from './picture';
import Text from './text';
import AuditForm from 'components/global/auditForm'
import fileApi from 'api/news/file.js';
import _mm from 'util/mm.js';
import commonApi from 'api/common.js';
const Option = Select.Option;
class NewsDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            checked:_mm.getParam('checked'),
            categoryId:_mm.getParam('categoryId'),
            //新闻类别
            category:'',
            categoryList:[],
            //新闻类型
            type:'0',
            //新闻标题
            newsTitle:'',
            //新闻来源
            newsOrigin:'',
            //是否显示新闻来源
            originChecked:false,
            //审核状态 1->通过 2->不通过
            auditStatus:2,
            //审核详情
            auditDetail:'',
            /**普通新闻的数据 */
            //新闻缩略图  1 - 》 1张  2 -》 3张
            ptImg:1,
            //单个缩率图
            ptSingleImg:[''],
            //多个缩率图
            ptMoreImg:['','',''],
            //标签列表
            ptSignList:[''],
            //标签是否选中
            ptSignChecked:false,
            //热门是否可选
            ptHotChecked:false,
            //默认的detail
            ptDefaultDetail:'',
            //获取到的detail
            ptDetail:'',
            /*图片新闻的数据*/
            tpImg:'',
            tpSignList:[''],
            tpImgList:[{imgUrl:'',desc:''},{imgUrl:'',desc:''}],
            tpSignChecked:false,
            /*文本新闻的数据*/
            wbSignList:[''],
            wbSignChecked:false,
            wbHotChecked:false,
            wbDefaultDetail:'',
            wbDetail:''
        }
    }
    componentDidMount(){
        this.loadTypeList()
    }
    //添加类型选项
    loadTypeList(){
        commonApi.getIssueType({currPage:1,pageSize:9999,type:'0',theissue:'4'}).then(res=>{
            let list = res[0].lists;
            this.setState({
                categoryList:list
            },()=>{
                this.setState({
                    category:list[0]?list[0].id:''
                },()=>{
                    let {id} = this.state;
                    console.log(id)
                    if(id){
                        this.getDetail();
                    }
                })
            })
        })
    }
    changeOriginState(e){
       let status = e.target.checked;
       this.setState({
            originChecked:status
       })
    }
    //选择新闻类别
    selectCategory(val){
        this.setState({
            category:val
        })
    }
    //选择新闻类型
    selectType(val){
        this.setState({
            type:val
        })
    }
    //input输入
    onInput(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]:value
        })    
    }
    //获取审核状态
    getAudtiStatus(value){
        this.setState({
            auditStatus:value
        })
    }
    //获取审核详情
    getAuditDetail(val){
        this.setState({
            auditDetail:val
        })
    }
    //点击保存
    save(){
       let {checked} = this.state;
       if(checked ===null){
           this.addFile()
       }else if(checked == '2'){
           this.auditFile()
       }else{
           this.updateFile()
       }
    }
    //添加新闻
    addFile(){
        let obj = this.getFormData();
        console.log(obj);
        fileApi.addFile(obj).then(res=>{
            message.success('添加成功！');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err);
        })
    }
    //修改文件
    updateFile(){
        let obj = this.getFormData();
        let {id} = this.state; 
        obj = {...obj,newsId:id}
        fileApi.updateFile(obj).then(res=>{
            message.success('修改成功！');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err);
        })
    }
    //审核文件
    auditFile(){
        let {id,auditStatus,auditDetail,categoryId} = this.state;
        fileApi.authFile({id,checkview:auditStatus,remark:auditDetail,categoryId}).then(res=>{
            message.success('修改成功！');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err);
        })
    }
    getDetail(){
        let {id} = this.state;
        fileApi.getNewsDetail({id}).then(res=>{
            let result = res[0];
            let {newsType,categoryId,title,sourceAdress,sourceAdressState,
                tagsName,tagsState,isHot,content,thumbnails,images
            } = result;
            this.setState({
                category:categoryId,
                type:newsType,
                newsTitle:title,
                newsOrigin:sourceAdress,
                originChecked:sourceAdressState == '0' ?false:true
            })
            switch(newsType){
                case '0':
                    this.setState({
                        ptDefaultDetail:content,
                        ptDetail:content,
                        ptHotChecked:isHot == '1'?true:false,
                        ptSignList:tagsName.length!=0?tagsName:[''],
                        ptSignChecked:tagsState == '1'?true:false,
                        ptSingleImg:thumbnails.length>1?['']:thumbnails,
                        ptMoreImg:thumbnails.length>1?thumbnails:['','',''],
                        ptImg:thumbnails.length>1?2:1
                    })
                break;
                case '1':
                    let tpImgList = JSON.parse(images).map(item=>{
                        let obj = {};
                        obj.imgUrl = item.imagesUrl;
                        obj.desc = item.imagesDesc;
                        return obj
                    })
                    this.setState({
                        tpImg:thumbnails[0],
                        tpSignList:tagsName.length!=0?tagsName:[''],
                        tpSignChecked:tagsState =='1'?true:false,
                        tpImgList
                    })
                break;
                case '2':
                    this.setState({
                        wbDefaultDetail:content,
                        wbDetail:content,
                        wbHotChecked:isHot == '1'?true:false,
                        wbSignList:tagsName.length!=0?tagsName:[''],
                        wbSignChecked:tagsState == '1'?true:false
                    })
                break;
                default:
                break;
            }
        })
    }
    //getFormData
    getFormData(){
        let {type,category,newsTitle,newsOrigin,originChecked} = this.state;
        //普通新闻
        let {ptImg,ptSingleImg,ptMoreImg,ptSignList,ptSignChecked,ptHotChecked,ptDetail} = this.state;
        //图片新闻
        let {tpImg,tpSignList,tpImgList,tpSignChecked} = this.state;
        //文本新闻
        let {wbSignList,wbSignChecked,wbHotChecked,wbDetail} = this.state;
        let obj = {
            title:newsTitle,
            newsType:type,
            categoryId:category,
            sourceAdress:{
                sourceAdressName:newsOrigin,
                sourceAdressisShow:originChecked?'1':'0'
            }
        }
        switch(type){
            case "0":
                obj = {...obj,
                    thumbnail:ptImg == 1 ? _mm.processImgUrl(ptSingleImg) :_mm.processImgUrl(ptMoreImg),
                    tags:{
                        list:ptSignList,
                        tagsisShow:ptSignChecked?'1':'0'
                    },
                    isHot:ptHotChecked?'1':'0',
                    content:ptDetail
                }
            break;
            case "1":
                let images = tpImgList.map((item)=>{
                    let obj = {}
                    obj.imagesUrl = _mm.processImgUrl(item.imgUrl) ;
                    obj.imagesDesc = item.desc;
                    return obj;
                })
                obj = {...obj,
                    thumbnail:[_mm.processImgUrl(tpImg)],
                    tags:{
                        list:tpSignList,
                        tagsisShow:tpSignChecked?'1':'0'
                    },
                    images
                }
            break;
            case '2':
                obj = {...obj,
                    tags:{
                        list:wbSignList,
                        tagsisShow:wbSignChecked?'1':'0'
                    },
                    isHot:wbHotChecked?'1':'0',
                    content:wbDetail
                }
            break;
            default:
            break;
        }
        return obj;

    }
    render(){
        let {category,categoryList,type} = this.state;
        //普通新闻的数据
        let {ptImg,ptSingleImg,ptMoreImg,ptSignList,ptSignChecked,ptHotChecked,ptDefaultDetail,ptDetail} = this.state;
        //图片新闻的数据
        let {tpImg,tpSignList,tpImgList,tpSignChecked} = this.state;
        //文本新闻的数据
        let {wbSignList,wbHotChecked,wbDefaultDetail,wbDetail,wbSignChecked} = this.state;
        let newsType = this.state.type;
        return (
            <div>
               <div className='form-item'>
                    <Row>
                        <Col span='4'>新闻类型*</Col>
                        <Col offset='1' span='6'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                // defaultValue = {this.state.selectValue}
                                value = {category}
                                onChange={(value)=>{this.selectCategory(value)}}
                            >
                                {
                                    categoryList.map((item,index)=>{
                                        return <Option key={index} value={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>新闻分类*</Col>
                        <Col offset='1' span='6'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                // defaultValue = {this.state.selectValue}
                                // defaultValue = '普通新闻'
                                value = {type}
                                onChange={(value)=>{this.selectType(value)}}
                            >
                                <Option value="0">普通新闻</Option>
                                <Option value="1">图片新闻</Option>
                                <Option value="2">文本新闻</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>新闻标题*</Col>
                        <Col offset='1' span='12'>
                            <Input value={this.state.newsTitle} onChange={(e)=>this.onInput(e)} name='newsTitle' placeholder='请输入不超过30个字的新闻标题' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>新闻来源*</Col>
                        <Col offset='1' span='12'>
                            <Input value={this.state.newsOrigin} onChange={(e)=>this.onInput(e)} name='newsOrigin' placeholder='请输入不超过10个字的新闻来源' />
                        </Col>
                        <Col offset='1' span='6'>
                            <Checkbox checked={this.state.originChecked} onChange={(e)=>{this.changeOriginState(e)}} >
                                显示来源
                            </Checkbox>
                        </Col>
                    </Row>
                </div>
                {
                    newsType == 0 ?
                    <General
                        img = {ptImg}
                        singleImg = {ptSingleImg}
                        moreImg ={ptMoreImg}
                        signList ={ptSignList}
                        signChecked ={ptSignChecked}
                        hotChecked ={ptHotChecked}
                        defaultDetail ={ptDefaultDetail}
                        detail ={ptDetail}
                        getImg = {(value)=>{this.setState({ptImg:value})}}
                        getSingleImg = {arr => this.setState({ptSingleImg:arr})}
                        getMoreImg = {arr => this.setState({ptMoreImg:arr})}
                        getSignList = {arr=>this.setState({ptSignList:arr})}
                        getSignStatus = {status => this.setState({ptSignChecked:status})}
                        getHotChecked = {status => this.setState({ptHotChecked:status})}
                        getDetail= {html => this.setState({ptDetail:html})}
                    />:
                    newsType == 1 ?
                    <Picture 
                        tpSignList = {tpSignList}
                        tpImg = {tpImg}
                        tpImgList = {tpImgList}
                        tpSignChecked = {tpSignChecked}
                        getSignList = {arr => this.setState({tpSignList:arr})}
                        getImg = {tpImg =>this.setState({tpImg})}
                        getTpImgList = {tpImgList =>this.setState({tpImgList})}
                        getTpSignChecked = {tpSignChecked =>this.setState({tpSignChecked})}
                    /> :
                    <Text 
                        wbSignList = {wbSignList}
                        wbHotChecked = {wbHotChecked}
                        wbDefaultDetail = {wbDefaultDetail}
                        wbSignChecked = {wbSignChecked}
                        getWbSignList = {arr=>this.setState({wbSignList:arr})}
                        getWbHotChecked = { status =>  this.setState({wbHotChecked:status})}
                        getSignStatus = {status => this.setState({wbSignChecked:status})}
                        getDetail = {html => this.setState({wbDetail:html})}
                    />
                }
                {
                    (this.state.checked == 2 )? 
                    <AuditForm status={this.state.auditStatus} 
                        detail={this.state.auditDetail}
                        getStatus = {(val)=>this.getAudtiStatus(val)}
                        getDetail = {(val)=>this.getAuditDetail(val)}
                    />:
                    null
                }
                {
                    (this.state.checked == 0 || this.state.checked ==4 )? 
                    null:
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
export default withRouter(NewsDetail) ;


