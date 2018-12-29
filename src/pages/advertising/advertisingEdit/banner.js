import React,{Component} from 'react';
import NavTab from './common/nav.js';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal} from 'antd';
import { withRouter } from 'react-router-dom'; 
import advertisingApi from 'api/advertising/index.js';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
import _mm from 'util/mm.js';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
class Banner extends Component{
    constructor(props){
        super(props)
        this.state={
            //当前的状态
            selectValue:'0',
            //当前render的数据
            dataList:[],
            //是否处于搜索状态
            isSearch:false,
            searchValue:'',
            pageSize:12,
            total:1,
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
                advertisingApi.getList({
                    advMethod:'1',
                    currPage:pageNum,
                    pageSize,
                    theissue:selectValue,
                    advTitle:searchValue
                }).then(res=>{
                    let totalCount = res[0].total;
                    let list = res[0].list ;
                    this.setState({
                        dataList:list,
                        total:totalCount
                    })
                })
            }else{
                advertisingApi.getList({
                    advMethod:'1',
                    currPage:pageNum,
                    pageSize,
                    checkview:selectValue,
                    advTitle:searchValue
                }).then(res=>{
                    let totalCount = res[0].total;
                    let list = res[0].list ;
                    this.setState({
                        dataList:list,
                        total:totalCount
                    })
                })
            }
            
        }else{
            if(selectValue>3){
                advertisingApi.getList({
                    advMethod:'1',
                    currPage:pageNum,
                    pageSize,
                    theissue:selectValue
                }).then(res=>{
                    let totalCount = res[0].total;
                    let list = res[0].list ;
                    this.setState({
                        dataList:list,
                        total:totalCount
                    })
                }).catch(err=>{
                    message.error(err)
                })
            }else{
                advertisingApi.getList({
                    advMethod:'1',
                    currPage:pageNum,
                    pageSize,
                    checkview:selectValue
                }).then(res=>{
                    let totalCount = res[0].total;
                    let list = res[0].list ;
                    this.setState({
                        dataList:list,
                        total:totalCount
                    })
                }).catch(err=>{
                    message.error(err)
                })
            }   
            
        }
        
    }
    //搜索
    searchTitle(value){
        if(!value){
            this.setState({
                isSearch:false,
                pageNum:1,
                searchValue:''
            },()=>{
                this.loadList();
            })
        }else{
            this.setState({
                isSearch:true,
                pageNum:1,
                searchValue:value
            },()=>{
                this.loadList();
            })
        }
    }
    changePage(pageNum){
        this.setState({pageNum},()=>{
            this.loadList()
        })
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
    //跳转到添加页面
    goAddBanner(){
        this.props.history.push('/advertising/advertisingEdit/banner/detail');
    }
    //点击查看图标
    clickCheck(item){
        this.props.history.push(`/advertising/advertisingEdit/banner/detail/${item.advId}/?name=${item.advTitle}&checked=0`)
    }
    //点击编辑图标
    clickEdit(item){
        this.props.history.push(`/advertising/advertisingEdit/banner/detail/${item.advId}/?name=${item.advTitle}&checked=1`)
    }
    //点击删除图标
    clickDel(item){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                advertisingApi.delDetail({advId:item.advId}).then(res=>{
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
        let {selectValue } = this.state;
        let handle_1 = (item)=>{
            return (
                <div>
                    <IconHandle type='1' iconClick={()=>{this.clickCheck(item)}}/>
                    <IconHandle type='3' iconClick={()=>{this.clickEdit(item)}}/>
                    <IconHandle type='2' iconClick={()=>{this.clickDel(item)}}/>
                </div>
            )
        }
        let handle_2 = (item) =>{
            return (
                <div>
                    <IconHandle type='1' iconClick={()=>{this.clickCheck(item)}}/>
                </div>
            )
        }
        let handle = selectValue > 3 ? handle_2 : handle_1;
        return (
            <div className={style.container}>
                <NavTab/>
                <div className={style.content}>
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                // defaultValue = {this.state.selectValue}
                                value = {this.state.selectValue}
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
                                    新增广告
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        thead={[{width:'5%',name:' '},{width:'35%',name:'标题'},{width:'10%',name:'显示区域'},{width:'10%',name:'广告类型'},{width:'20%',name:'创建时间'},{width:'20%',name:'操作'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{item.advTitle}</td>
                                   <td>{_mm.mapStatusToString(item.advStatus)}</td>
                                   <td>{item.advType == '1' ? '外链':'内链'}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle'>
                                       {handle(item)}
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