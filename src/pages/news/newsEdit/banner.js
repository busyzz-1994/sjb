import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import TableList from 'components/global/tableList';
import _mm from 'util/mm.js'
import style from '../common/banner.scss';
import {Select,Input,Button,message,Pagination,Modal} from 'antd';
import { withRouter } from 'react-router-dom'; 
import newsEditApi from 'api/news/banner.js';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
class Banner extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/news/newsEdit/banner'
            },
            {
                name:'新闻类型',
                url:'/news/newsEdit/type'
            },
            {
                name:'新闻列表',
                url:'/news/newsEdit/file'
            }
        ]
        this.state={
            //当前的状态
            selectValue:'0',
            //当前render的数据
            dataList:[],
            //是否处于搜索状态
            isSearch:false,
            searchValue:'',
            //当前的原数据
            originDataList:[],
            //原数据
            originData:[],
            pageSize:6,
            total:10,
            pageNum:1
        }
    }
    componentDidMount(){
       this.loadList();
    }
    //加载数据
    loadList(){
        let {pageSize,pageNum,selectValue,isSearch,searchValue} = this.state;
        if(isSearch){
            if(selectValue>3){
                newsEditApi.issueSearch({
                    currPage:pageNum,
                    pageSize,
                    type:0,
                    theissue :selectValue,
                    title:searchValue
                 }).then(res=>{
                    let totalCount = res[0].totalCount;
                    let lists = res[0].lists;
                    this.setState({
                        dataList:lists,
                        total:totalCount
                    })
                 })
            }else{
                newsEditApi.auditSearch({
                    currPage:pageNum,
                    checkview:selectValue,
                    pageSize,
                    type:0,
                    title:searchValue
                 }).then(res=>{
                    let totalCount = res[0].totalCount;
                    let lists = res[0].lists;
                    this.setState({
                        dataList:lists,
                        total:totalCount
                    })
                 })
            }
           
        }else{
            if(selectValue>3){
                newsEditApi.getAuditBannerList({
                    currPage:pageNum,
                    theissue:selectValue,
                    pageSize,
                    type:0
                }).then(res=>{
                    let totalCount = res[0].totalCount;
                    let lists = res[0].lists;
                    this.setState({
                        dataList:lists,
                        total:totalCount
                    })
                })
            }else{
                newsEditApi.getBannerList({
                    currPage:pageNum,
                    checkview:selectValue,
                    pageSize,
                    type:0
                }).then(res=>{
                    let totalCount = res[0].totalCount;
                    let lists = res[0].lists;
                    this.setState({
                        dataList:lists,
                        total:totalCount
                    })
                })
            }
        }
    }
    //搜索
    searchTitle(value){
        if(!value){
            this.setState({
                searchValue:'',
                pageNum:1,
                isSearch:false
            },()=>{
                this.loadList()
            })
        }else{
            this.setState({
                searchValue:value,
                pageNum:1,
                isSearch:true
            },()=>{
                this.loadList()
            })
        }
       
    }
    //选择类型
    select(value){
        this.setState({
            selectValue:value,
            pageNum:1
        },()=>{
            this.loadList();
        })
    }
    //点击分页
    changePage(pageNum){
		this.setState({
            pageNum
        },()=>{
            this.loadList();
        })
    }
    //设置分页组件
    renderPagination(){
        this.setState({
            total:this.state.dataList.length
        },()=>{
            this.changePage(1)
        })
    }
    //跳转到添加页面
    goAddBanner(){
        this.props.history.push('/news/newsEdit/banner/add/?bannerType=0');
    }
    //点击查看图标
    clickCheck(id,name){
        let {selectValue} = this.state;
        selectValue = selectValue == '1' ? '4' : '0'
        this.props.history.push(`/news/newsEdit/banner/add/${id}/?name=${name}&checked=${selectValue}`)
    }
    //点击编辑图标
    clickEdit(id,name){
        this.props.history.push(`/news/newsEdit/banner/add/${id}/?name=${name}&checked=1`)
    }
    //点击删除图标
    clickDel(id,fkId,resourcesType){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                newsEditApi.delBanner({id,fkId,resourcesType}).then(res=>{
                    this.loadList();
                }).catch(res=>{
                    message.error(res);
                })
            },
            okText:'确认',
            cancelText:'取消'
        })
    }
    render(){
        let {selectValue} = this.state;
        let handle_1 = (item)=>{
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(id,item.title)}}/>
                    <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(id,item.title)}}/>
                    <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id,item.fkId,item.resourcesType)}}/>
                </div>
            )
        }
        let handle_2 = (item)=>{
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(id,item.title)}}/>
                </div>
            )
        }
        let handle = selectValue > 3 ? handle_2 : handle_1;
        return (
            <div className={style.container}>
                <NavTab navList={this.navList} />
                <div className={style.content}>
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                // defaultValue = {this.state.selectValue}
                                defaultValue = {selectValue}
                                onChange={(value)=>{this.select(value)}}
                            >
                                <Option value="0">待审核</Option>
                                <Option value="1">审核未通过</Option>
                                <Option value="2">审核已通过</Option>
                                <Option value="4">已发布</Option>
                                <Option value="5">已下线</Option>
                            </Select>
                        </div>
                        <div className='fr'>
                            <Search
                                placeholder="输入关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                            <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAddBanner()}} type="primary" icon="plus" >
                                    新增banner
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        thead={[{width:'5%',name:' '},{width:'22%',name:'轮播图片'},{width:'30%',name:'标题'},{width:'8%',name:'类型'},{width:'20%',name:'创建时间'},{width:'15%',name:'操作'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>
                                       <img src={config.server+item.titleImg} width='150' height='70'/>
                                   </td>
                                   <td>{item.title}</td>
                                   <td>{item.baType == '0' ? '外链':'内链'}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle' >
                                        {
                                            handle(item)
                                        }
                                        {/* <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(id,item.title)}}/>
                                        <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(id,item.title)}}/>
                                        <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id,item.fkId,item.resourcesType)}}/> */}
                                   </td>
                               </tr>
                           )
                       })}
                    </TableList>
                    <div className='clearfix'>
                        <div className='fr'>
                            <Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} hideOnSinglePage={true}
                            current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
                            total={this.state.total} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Banner);