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
                name:'新闻文件',
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
            pageSize:1,
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

        }else{
            newsEditApi.getBannerList({
                currPage:pageNum,
                checkview:selectValue,
                pageSize,
                type:0
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let lists = res[0].lists;
                console.log(lists)
                this.setState({
                    dataList:lists,
                    total:totalCount
                })
            })
        }
    }
    //选择类型
    choiceType(){
        let type = this.state.selectValue;
        let dataList = this.state.originData.filter((item,index)=>{
            return item.baType == type ;
        })
        this.setState({
            dataList,
            originDataList:dataList
        },()=>{
           this.renderPagination()
        })
    }
    //搜索
    searchTitle(value){
        if(!value){
            this.loadList();
            return;
        }
        newsEditApi.search({title:value,type:this.state.selectValue}).then(res=>{
            this.setState({
                dataList:res,
                originDataList:res
            },()=>{
                this.renderPagination()
            })
        }).catch(err=>{
            message.error(err);
        })
    }
    //选择类型
    select(value){
        this.setState({
            selectValue:value
        },()=>{
            this.choiceType();
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
        this.props.history.push(`/news/newsEdit/banner/add/${id}/?name=${name}&checked=0`)
    }
    //点击编辑图标
    clickEdit(id,name){
        this.props.history.push(`/news/newsEdit/banner/add/${id}/?name=${name}&checked=1`)
    }
    //点击删除图标
    clickDel(id,fkId,resourcesType){
        console.log(fkId)
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
                                   <td>{item.type == '0' ? '外链':'内链'}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle' >
                                        <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(id,item.title)}}/>
                                        <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(id,item.title)}}/>
                                        <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id,item.fkId,item.resourcesType)}}/>
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