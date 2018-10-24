import React,{Component} from 'react';
import { withRouter ,Link} from 'react-router-dom'; 
import style from 'common/layout.scss';
import NavBar from './common/nav.js';
import TableList from 'components/global/tableList';
import IconHandle from 'components/global/icon';
import {Pagination,Button,Input,message,Select,Modal,Tooltip} from 'antd';
import userApi from 'api/user/index.js';
const Search = Input.Search;
const Option = Select.Option;
const confirm = Modal.confirm;
class Sign extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectValue:'1',
            pageNum : 1,
            total : 1,
            pageSize : 12,
            dataList:[],
            //是否处于搜索状态
            isSearch:false,
            searchValue:'',
        }
    }
    componentDidMount(){
        this.loadList()
    }
     //加载数据
     loadList(){
        let {pageSize,pageNum,isSearch,searchValue,selectValue} = this.state;
        if(isSearch){
            userApi.searchComment({
                currPage:pageNum,
                pageSize,
                keyword:searchValue,
                isShow:selectValue
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            userApi.getCommentList({
                currPage:pageNum,
                pageSize,
                isShow:selectValue
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }
        
    }
    goAdd(){
        this.props.history.push('/system/auth/inner/detail');
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
    clickAudit(id,item){
        confirm({
            title:'审核结果确认',
            content:'这条评论是否审核通过',
            onOk:()=>{
                userApi.auditComment({id,isShow:0}).then(res=>{
                    message.success('审核完成！')
                    this.loadList();
                }).catch(res=>{
                    message.error(res);
                })
            },
            onCancel:()=>{
                userApi.auditComment({id,isShow:2}).then(res=>{
                    message.success('审核完成！')
                    this.loadList();
                }).catch(res=>{
                    message.error(res);
                })
            },
            okText:'通过',
            cancelText:'不通过'
        })
    }
    clickDel(id){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                userApi.delComment({id}).then(res=>{
                    message.success('删除成功！')
                    this.loadList();
                }).catch(res=>{
                    message.error(res);
                })
            },
            okText:'确认',
            cancelText:'取消'
        })
    }
    //显示评论
    clickShow(item){
        console.log(item)
    }
    //影藏评论
    clickHide(item){
        console.log(item)
    }
    changePage(pageNum){
        this.setState({
            pageNum
        },()=>{
            this.loadList()
        })
    }
    render(){
        let {dataList,selectValue}  = this.state; 
        //未审核
        let handle_1 = (item) =>{
            return (
                <div>
                    <IconHandle type='0' id={item.id} iconClick={(id)=>{this.clickAudit(id,item)}}/>
                    <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id,item)}}/>
                </div>
            )
        }
        //审核通过
        let handle_2 = (item) =>{
            return (
                <div>
                    {/* <IconHandle type='7' id={item.id} iconClick={(id)=>{this.clickShow(item)}}/>
                    <IconHandle type='8' id={item.id} iconClick={(id)=>{this.clickHide(item)}}/> */}
                    <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id,item)}}/>
                </div>
            )
        }
        //审核未通过
        let handle_3 = (item) =>{
            return (
                <div>
                    <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id,item)}}/>
                </div>
            )
        }
        let handleList;
        // console.log(selectValue)
        if(selectValue == 1){
            handleList = handle_1;
        }else if(selectValue == 0){
            handleList = handle_2;
        }else{
            handleList = handle_3;
        }
        return (
            <div className={style.container}>
                <NavBar/>
                <div className={style.content}>
                    {/* 操作开始 */}
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
                                <Option value="1">待审核</Option>
                                <Option value="2">审核未通过</Option>
                                <Option value="0">审核已通过</Option>
                            </Select>
                        </div>
                        <div className='fr'>
                            <Search
                                placeholder="输入用户名关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                        </div>
                    </div>
                     {/* 操作结束 */}
                     <TableList
                        thead={[{width:'5%',name:' '},{width:'20%',name:'用户名'},{width:'20%',name:'评论内容'},{width:'15%',name:'来源'},{width:'25%',name:'评论时间'},{width:'15%',name:'操作'}]}
                        tdHeight = '58px'
                    >
                        {dataList.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.userName}</td>
                                    <td>
                                        <Tooltip placement="bottomLeft" title={item.content}>
                                            {item.content}
                                        </Tooltip>
                                    </td>
                                    <td>
                                        <Tooltip placement="bottomLeft" title={item.title}>
                                            {item.title}
                                        </Tooltip>
                                    </td>
                                    <td>{item.time}</td>
                                    <td className='td-handle'>
                                        {handleList(item)}
                                    </td>
                                </tr>
                            )
                        })}
                    </TableList>
                    <div className='clearfix'>
                        <div className='fr'>
                            <Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} hideOnSinglePage={false}
                            current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
                            total={this.state.total} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Sign);