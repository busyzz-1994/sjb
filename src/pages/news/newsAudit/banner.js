import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import TableList from 'components/global/tableList';
import style from '../common/banner.scss';
import { Select , Input , Button ,message,Pagination} from 'antd';
import { withRouter } from 'react-router-dom'; 
import newsEditApi from 'api/news/banner';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
import _mm from 'util/mm.js'
const Option = Select.Option;
const Search = Input.Search;
class Banner extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/news/newsAudit/banner'
            },
            {
                name:'新闻列表',
                url:'/news/newsAudit/file'
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
    //点击查看图标
    clickCheck(id,name){
        let {selectValue} = this.state;
        selectValue = selectValue == '1' ? '4' : '0'
        this.props.history.push(`/news/newsAudit/banner/detail/${id}/?name=${name}&checked=${selectValue}`)
    }
    //点击审核
    clickEdit(id,name){
        this.props.history.push(`/news/newsAudit/banner/detail/${id}/?name=${name}&checked=2`)
    }
    render(){
        //未发布时候的icon列表
        let handle_1 = (item) => {
            return (
                <div>
                    <IconHandle type='0' id={item.id} iconClick={(id)=>{this.clickEdit(id,item.title)}}/>
                </div>
            )
        }
        //已发布时候的icon列表
        let handle_2 = (item) =>{
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(id,item.title)}}/>
                    {/* <IconHandle type='3' id={index} iconClick={(id)=>{this.clickEdit(id)}}/> */}
                </div>
            )
        }
        
        let { selectValue } = this.state;
        let handleList;
        // console.log(selectValue)
        if(selectValue == 0){
            handleList = handle_1;
        }else{
            handleList = handle_2;
        }
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
                                value = {selectValue}
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
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        thead={[{width:'5%',name:' '},{width:'15%',name:'轮播图片'},{width:'35%',name:'标题'},{width:'15%',name:'类型'},{width:'15%',name:'创建时间'},{width:'15%',name:'操作'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>
                                       <img src={_mm.processImageUrl(item.titleImg)} width='150' height='70'/>
                                   </td>
                                   <td>{item.title}</td>
                                   <td>{item.baType == '0' ? '外链':'内链'}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle'>
                                       {handleList(item)}
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