import React,{Component} from 'react';
import {Col,Row,Input,Select,Checkbox,Button} from 'antd';
import General from './general.js';
import Picture from './picture';
import Text from './text';
import AuditForm from 'components/global/auditForm'
import fileApi from 'api/news/file.js';
const Option = Select.Option;
class NewsDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            //新闻类别
            category:'',
            categoryList:[],
            //新闻类型
            type:0,
            //新闻标题
            newsTitle:'',
            //新闻来源
            newsOrigin:'',
            //是否显示新闻来源
            originChecked:false,
            //审核状态 1->通过 2->不通过
            auditStatus:1,
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
            ptDefaultDetail:'<p>6666666</p>',
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
            wbDefaultDetail:'<p>6666666</p>',
            wbDetail:''
        }
    }
    componentDidMount(){
        this.loadTypeList()
    }
    //添加类型选项
    loadTypeList(){
        fileApi.getTypeList({currPage:1,pageSize:9999,type:0}).then(res=>{
            console.log(res);
            console.log('类型')
            return ;
            let list = res[0].lists;
            this.setState({
                categoryList:list
            },()=>{
                this.setState({
                    category:list[0]?list[0].id:''
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
        console.log(this.state)
    }
    render(){
        let {category,categoryList} = this.state;
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
                                onChange={(value)=>{this.selectCategory(value)}}
                            >
                                {
                                    categoryList.map((item,index)=>{
                                        return <Option key={index} value="0">推荐</Option>
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
                                defaultValue = '普通新闻'
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
                        getWbSignList = {arr=>this.setState({tpSignList:arr})}
                        getWbHotChecked = { status =>  this.setState({wbHotChecked:status})}
                        getSignStatus = {status => this.setState({wbSignChecked:status})}
                        getDetail = {html => this.setState({wbDetail:html})}
                    />
                }
                <AuditForm status={this.state.auditStatus} 
                    detail={this.state.auditDetail}
                    getStatus = {(val)=>this.getAudtiStatus(val)}
                    getDetail = {(val)=>this.getAuditDetail(val)}
                />
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
export default NewsDetail;