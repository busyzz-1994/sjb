import React,{Component} from 'react';
import NavTab from './common/nav.js';
import TableList from 'components/global/tableList';
import _mm from 'util/mm.js'
import style from 'common/layout.scss';
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
        this.state={
            //当前的状态
            selectValue:'3',
            //当前render的数据
            dataList:[],
            //是否处于搜索状态
            isSearch:false,
            searchValue:'',
            //当前的原数据
            originDataList:[],
            //原数据
            originData:[],
            pageSize:3,
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
            newsEditApi.issueSearch({
                currPage:pageNum,
                pageSize,
                type:1,
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
            newsEditApi.getAuditBannerList({
                currPage:pageNum,
                theissue:selectValue,
                pageSize,
                type:1
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
        this.props.history.push('/service/serviceIssue/banner/detail/?bannerType=1');
    }
    //点击查看图标
    clickCheck(id,name){
        this.props.history.push(`/service/serviceIssue/banner/detail/${id}/?name=${name}&checked=0&bannerType=1`)
    }
    //点击编辑图标
    clickEdit(id,name){
        this.props.history.push(`/service/serviceIssue/banner/detail/${id}/?name=${name}&checked=1&bannerType=1`)
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
     //点击发布
     clickOnline(item){
        let { id , fkId ,baType } = item;
        let {selectValue} = this.state;
        newsEditApi.issueBanner({
            id,fkId,baType,theissue:'4'
        }).then(res=>{
            message.success('发布成功！');
            this.loadList()
        }).catch(err=>{
            message.error(err);
        })
    }
    //点击下线
    clickUnline(item){
        let { id , fkId ,baType } = item;
        let {selectValue} = this.state;
        newsEditApi.issueBanner({
            id,fkId,baType,theissue:'5'
        }).then(res=>{
            message.success('下线成功！');
            this.loadList()
        }).catch(err=>{
            message.error(err);
        })
    }
     //点击置顶
     clickTop(item){
        let {id} = item;
        newsEditApi.bannerTop({
            id,placedstick:1
        }).then(res=>{
            message.success('置顶成功！')
            this.loadList();
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        let {selectValue,pageNum} = this.state;
        //待发布icon
        let handle_1 = (item) =>{
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(id,item.title)}}/>
                    <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(id,item.title)}}/>
                    <IconHandle type='4' id={item.id} iconClick={(id)=>{this.clickOnline(item)}}/>
                    <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id,item.fkId,item.resourcesType)}}/>
                </div>
            )
        }
        //已发布时候的icon列表
        let handle_2 = (item,index) =>{
            let hide = (index == 0) && (pageNum == 1) ;
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(id,item.title)}}/>
                    <IconHandle type='6' id={item.id} iconClick={(id)=>{this.clickUnline(item)}}/>
                    {
                        hide ? null :  <IconHandle type='5' id={item.id} iconClick={(id)=>{this.clickTop(item)}}/>
                    }
                </div>
            )
        }
        //已下线时候的icon列表
        let handle_3 = (item) =>{
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(id,item.title)}}/>
                    <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(id,item.title)}}/>
                    <IconHandle type='4' id={item.id} iconClick={(id)=>{this.clickOnline(id,item.title)}}/>
                    <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id,item.fkId,item.resourcesType)}}/>
                </div>
            )
        }
        let handleList;
        // console.log(selectValue)
        if(selectValue == 3){
            handleList = handle_1;
        }else if(selectValue == 4){
            handleList = handle_2;
        }else{
            handleList = handle_3;
        }
        return (
            <div className={style.container}>
                <NavTab />
                <div className={style.content}>
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                // defaultValue = {this.state.selectValue}
                                value = {selectValue}
                                onChange={(value)=>{this.select(value)}}
                            >
                               <Option value="3">待发布</Option>
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
                            {/* <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAddBanner()}} type="primary" icon="plus" >
                                    新增banner
                                </Button>
                            </div> */}
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
                                        {handleList(item,index)}
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