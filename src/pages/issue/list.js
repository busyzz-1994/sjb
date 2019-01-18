import React,{Component} from 'react';
import NavTab from './nav.js';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon,Tooltip} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import IconHandle from 'components/global/icon';
import issueApi from 'api/issue/index.js';
const Option = Select.Option;
const Search = Input.Search;
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
            total:0,
            pageNum:1,
            type:this.props.match.params.type
        }
    }
    componentDidMount(){
        console.log(this.props)
       this.loadList();
    }
    //加载数据
    loadList(){
        let {pageSize,pageNum,selectValue,isSearch,searchValue,type} = this.state;
        if(isSearch){
            issueApi.getList({
                currPage:pageNum,
                pageSize,
                keyword:searchValue,
                replyStatus:selectValue,
                type
            }).then(res=>{
                let totalCount = res[0].total;
                let list = res[0].list ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            issueApi.getList({
                currPage:pageNum,
                pageSize,
                replyStatus:selectValue,
                type
            }).then(res=>{
                console.log(res);
                let totalCount = res[0].total;
                let list = res[0].list ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
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
    //跳转到添加页面
    goAddBanner(){
        this.props.history.push(`/video/videoEdit/type/detail`);
    }
    //点击查看图标
    clickCheck(item){
        let {type} = this.state;
        this.props.history.push(`/issue/list/${type}/${item.id}/?checked=0&name=${item.userName}`)
    }
    //点击编辑图标
    clickEdit(item){
        let {type} = this.state;
        console.log(item)
        this.props.history.push({
            pathname:`/issue/list/${type}/${item.id}/?checked=1&name=${item.userName}`
        })
    }
    //点击删除图标
    clickDel(item){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                recommendApi.removeWord({id:item.id}).then(res=>{
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
        //待回复操作
        let handle_1 = (item)=>{
            return (
                <div>
                    <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(item)}}/>
                </div>
            )
        },
        handle_2 = (item)=>{
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(item)}}/>
                    <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(item)}}/>
                </div>
            )
        },
        {selectValue} = this.state,
        handle = selectValue == '0' ? handle_1 : handle_2;
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
                                // defaultValue = '待审核'
                                value = {this.state.selectValue}
                                onChange={(value)=>{this.select(value)}}
                            >
                                <Option value="0">待回复</Option>
                                <Option value="1">已回复</Option>
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
                        tdHeight='58px'
                        thead={[{width:'5%',name:' '},{width:'15%',name:'用户名'},{width:'20%',name:'标题'},{width:'30%',name:'内容概述'},{width:'20%',name:'发布时间'},{width:'10%',name:'操作'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{item.userName}</td>
                                   <td>
                                        <Tooltip placement="bottomLeft" title={item.title}>
                                            {item.title}
                                        </Tooltip>
                                   </td>
                                   <td>
                                        <Tooltip placement="bottomLeft" title={item.content}>
                                            {item.content}
                                        </Tooltip>
                                   </td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle' >
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