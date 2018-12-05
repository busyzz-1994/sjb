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
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col,Icon,DatePicker,Checkbox,AutoComplete} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { withRouter } from 'react-router-dom';
import commonApi from 'api/common.js';
import config from 'base/config.json';
import typeApi from 'api/discounts/type.js';
import fileApi from 'api/discounts/file.js';
import serviceApi from 'api/service/index.js';
import Validate from 'util/validate';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
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
            // 缩略图
            tpImg:'',
            //商品价格
            price:'',
            //商品库存
            count:'',
            //服务主图
            fwImgList:[''],
            //新闻内容detail
            detail:'',
            //选中的signList:
            signList:[''],
            signChecked:false,
            authStatus:-1,
            authString:'',
            //富文本
            editDetail:'',
            defaultDetail:'',
            startTime:'2018-06-01 12:00:00',
            endTime:'2018-06-12 12:00:00',
            isHot:false,
            //是否显示库存
            isShowCount:true,
            //已售出的数量
            salesNum:0,
            //选中的管理商家ID
            businessId:'',
            //已发布的商家列表
            businessList:[],
            //联想的商家名称
            businessName:[],
            //选中的商家名称
            selectedName:'',
            //商品评分
            score:''
        }
    }
    selectCategory(value){
        this.setState({
            categoryValue:value
        })
    }
    componentDidMount(){
        this.loadTypeList();
        this.loadService();
    }
    onInput(e){
        let name = e.target.name,
        value = e.target.value;
        this.setState({
            [name]:value
        })  
    }
    //获取已发布的商家列表
    loadService(){
        serviceApi.getFileList({
            currPage:1,
            pageSize:99999,
            theissue:4
        }).then(res=>{
            let totalCount = res[0].total;
            let list = res[0].list,
                listName = list.map(item=>{
                    return item.title
                })
                console.log(listName)
            this.setState({
                businessList:list,
                businessName:listName
            },()=>{
                console.log(this.state.businessList)
            })
        })
    }
    //添加类型选项
    loadTypeList(){
        commonApi.getIssueType({currPage:1,pageSize:9999,type:'2',theissue:'4'}).then(res=>{
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
    //获取商品详情
    getDetail(){
        let {id} = this.state;
        fileApi.getFileDetail({id}).then(res=>{
            var res = res[0];
            let {typeId,title,thumbnail,listPositive,price,inventory,
                listag,introduce,reveal,isHot,startTime,endTime,inventoryShow,salesNum,businessId,bussinessName,score} = res;
                console.log(res)
            this.setState({
                categoryValue:typeId,
                title,
                tpImg:thumbnail,
                fwImgList:listPositive,
                price,
                count:inventory,
                signList:listag.length!=0?listag:[''],
                defaultDetail:introduce,
                editDetail:introduce,
                signChecked:reveal == 1 ,
                isHot:isHot =='1' ? true : false,
                startTime,
                endTime,
                isShowCount: inventoryShow =='1' ? true :false,
                salesNum,
                businessId,
                selectedName:bussinessName,
                score
            })
            
        }).catch(err=>{
            message.error('获取商品详情失败！')
        })
    }
    //获取缩略图
    getUrl(data,index){
        let url =data[0].attachFilenames;
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
            editDetail:html
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
    //验证表单信息
    validate(){
        let {title,tpImg,price,count,signList,fwImgList,editDetail,selectedName} = this.state;
        let validate = new Validate();
        validate.add(title,'notEmpty','商品标题不能为空！');
        validate.addFn(()=>{
            return this.mapNameToId(selectedName)?'':'输入的商家不存在！'
        });
        validate.add(tpImg,'notEmpty','商品缩略图不能为空！');
        validate.add(price,'notFloatMinus','商品价格只能为正数！');
        validate.add(count,'notMinus','库存只能为整数！');
        // validate.add(signList,'notEmptyArray','标签绑定不能为空！');
        validate.add(fwImgList,'notEmptyArrayWithItem','服务主图不能为空！');
        validate.add(editDetail,'notEmpty','内容编辑不能为空！');
        return validate.start();
    }
    //保存save
    save(){
        let msg = this.validate();
        // let msg = false;
        if(msg){
            message.error(msg)
        }else{
            let {checked} = this.state;
            if(checked === null){
                this.addFile();
            }else if(checked == '2'){
                this.auditFile()
            }else{
                this.updateFile()
            }
        }
    }
    getFileDetail(){
        let {categoryValue,title,tpImg,price,count,signList,
            fwImgList,editDetail,signChecked,endTime,startTime,isHot,isShowCount,salesNum,selectedName,score} = this.state;
        let obj = {
            typeId:categoryValue,
            title,
            thumbnail: _mm.processImgUrl(tpImg),
            price,
            inventory:count,
            tagIds:signList,
            tags:signList,
            positiveImg:_mm.processImgUrl(fwImgList),
            introduce:editDetail,
            reveal:signChecked?1:0,
            endTime,
            startTime,
            isHot:isHot?'1':'0',
            inventoryShow:isShowCount?'1':'0',
            salesNum,
            businessId:this.mapNameToId(selectedName),
            score
        }
        return obj;
    }
    addFile(){
        let obj = this.getFileDetail();
        fileApi.addFile(obj).then(res=>{
            message.success('添加商品成功！');
            this.props.history.goBack();
        }).catch(err=>{
            message.error(err)
        })
    }
    updateFile(){
        var obj = this.getFileDetail();
        let {id} = this.state;
        obj = {...obj,id};
        fileApi.updataFile(obj).then(res=>{
            message.success('修改商品成功！');
            this.props.history.goBack();
        }).catch(err=>{
            message.error(err)
        })
    }
    auditFile(){
        let {id,authStatus,authString} = this.state;
        if(status == -1){
            message.error('未进行审核操作！');
            return ;
        }
        fileApi.auditFile({
            id,checkview:authStatus,remark:authString
        }).then(res=>{
            message.success('审核完成！');
            this.props.history.goBack();
        }).catch(err=>{
            message.error(err)
        })
    }
    selectTime(date,dateString){
        let startTime = dateString[0],
            endTime = dateString[1];
        this.setState({
            startTime,endTime
        })
    }
    setHotChecked(e){
        this.setState({
            isHot:e.target.checked 
        })
    }
    setCountChecked(e){
        this.setState({
            isShowCount:e.target.checked 
        })
    }
    onSelect(val){
        this.changeName(val)
    }
    changeName(val){
        this.setState({
            selectedName:val
        })
    }
    mapNameToId(name){
        let {businessList} = this.state;
        for(let i = 0 ;i<businessList.length;i++){
            if(businessList[i].title == name){
                return businessList[i].id
            }
        }
        return null;
    }
    render(){
        let {category,tpImg,signList,signChecked,fwImgList,defaultDetail
            ,authStatus,authString,checked,categoryValue,endTime,startTime,isHot,isShowCount,businessName,selectedName,score
        } = this.state;
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
                        <Col span='4'>商品标题*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='30' value={this.state.title} onChange={(e)=>this.onInput(e)} name='title' placeholder='请输入不超过30个字的商品标题' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>所属商家*</Col>
                        <Col offset='1' span='12'>
                            <AutoComplete
                                dataSource={businessName}
                                style={{ width: '100%' }}
                                onSelect={(val)=>{this.onSelect(val)}}
                                placeholder="请输入商家名称"
                                onChange = {(e) => this.changeName(e)}
                                value={selectedName}
                                filterOption = {(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            />
                            {/* <Input maxLength='30' value={this.state.title} onChange={(e)=>this.onInput(e)} name='title' placeholder='请输入不超过30个字的商品标题' /> */}
                        </Col>
                    </Row>
                </div>
                
                <div className='form-item'>
                    <Row>
                        <Col span='4'>商品缩略图*</Col>
                        <Col offset='1' span='12'>
                            <ImgUpload aspectRatio={180/180} imgWidth={160} imgUrl={tpImg?config.server+tpImg:''}  imgHeight={140} defaultImgUrl={defaultImg} getUrl = {(data,index)=>this.getUrl(data,index)} />
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
                        <Col span='4'>起始时间*</Col>
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
                        <Col span='4'>商品价格（元）*</Col>
                        <Col offset='1' span='12'>
                            <Input value={this.state.price} onChange={(e)=>this.onInput(e)} name='price' placeholder='请输入价格' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>商品评分（0-5）*</Col>
                        <Col offset='1' span='12'>
                            <Input value={this.state.score} onChange={(e)=>this.onInput(e)} name='score' placeholder='请输入评分' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>商品库存*</Col>
                        <Col offset='1' span='9'>
                            <Input value={this.state.count} onChange={(e)=>this.onInput(e)} name='count' placeholder='请输入0-100000的整数' />
                        </Col>
                        <Col span='3' offset='1'>
                            <Checkbox onChange={(e)=>this.setCountChecked(e)} checked = {isShowCount} >
                                显示库存
                           </Checkbox> 
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>已售数量*</Col>
                        <Col offset='1' span='9'>
                            <Input value={this.state.salesNum} onChange={(e)=>this.onInput(e)} name='salesNum' placeholder='请输入0-100000的整数' />
                        </Col>
                    </Row>
                </div>
                <SignList
                    type={1}
                    signList = {signList}
                    checked = {signChecked}
                    getList = {(list)=>this.getSignList(list)}
                    getStatus = {(val)=>this.getChecked(val)}
                />
                <div className='form-item'>
                    <Row>
                        <Col span='4'>商品主图*</Col>
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
                        <Col span='4'>热门推荐*</Col>
                        <Col offset='1' span='16'>
                           <Checkbox onChange={(e)=>this.setHotChecked(e)} checked = {isHot} >
                                加入热门推荐
                           </Checkbox>
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
export default withRouter(TypeSave);