import React,{Component} from 'react';
import NavTab from './common/nav.js';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import fileApi from 'api/video/index.js';
import serviceApi from 'api/service/index.js';
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
            //当前的原数据
            originDataList:[],
            //原数据
            //是否处于搜索状态
            isSearch:false,
            searchValue:'',
            originData:[],
            pageSize:12,
            total:0,
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
            serviceApi.getFileList({
                currPage:pageNum,
                pageSize,
                theissue:selectValue,
                title:searchValue
            }).then(res=>{
                let totalCount = res[0].total;
                let list = res[0].list ;
                console.log(list)
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            serviceApi.getFileList({
                currPage:pageNum,
                pageSize,
                theissue:selectValue
            }).then(res=>{
                let totalCount = res[0].total;
                let list = res[0].list ;
                console.log(list)
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
        this.props.history.push(`/service/serviceEdit/file/detail`);
    }
    //点击查看图标
    clickCheck(item){
        this.props.history.push(`/service/serviceIssue/file/detail/${item.id}/?checked=0&name=${item.title}`)
    }
    //点击编辑图标
    clickEdit(item){
        this.props.history.push({
            pathname:`/service/serviceIssue/file/detail/${item.id}/?checked=1&name=${item.title}`
        })
    }
    //点击删除图标
    clickDel(item){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                serviceApi.delFileDetail({id:item.id}).then(res=>{
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
     //发布上线
    clickOnline(item){
        serviceApi.issueFile({
            id:item.id,
            theissue:'4'
        }).then(res=>{
            message.success('发布成功！');
            this.loadList();
        }).catch(err=>{
            message.error(err)
        })
    }
    //发布下线
    clickUnline(item){
        serviceApi.issueFile({
            id:item.id,
            theissue:'5'
        }).then(res=>{
            message.success('下线成功');
            this.loadList();
        }).catch(err=>{
            message.error(err)
        })
    }
    //点击置顶
    clickTop(item){
        serviceApi.topFile({
            id:item.id
        }).then(res=>{
            message.success('置顶成功！');
            this.loadList();
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        let {selectValue,pageNum} = this.state;
        //待发布
        let handle_1 = (item) =>{
            return (
                <div>
                    <IconHandle type='1' iconClick={()=>{this.clickCheck(item)}}/>
                    <IconHandle type='4' iconClick={()=>{this.clickOnline(item)}}/>
                    <IconHandle type='3' iconClick={()=>{this.clickEdit(item)}}/>
                    <IconHandle type='2' iconClick={()=>{this.clickDel(item)}}/>
                </div>
            )
        }
        //已发布
        let handle_2 = (item,index) =>{
            return (
                <div>
                    <IconHandle type='1' iconClick={()=>{this.clickCheck(item)}}/>
                    <IconHandle type='6' iconClick={()=>{this.clickUnline(item)}}/>
                    {
                        (pageNum == 1 && index == 0) ? null :<IconHandle type='5' iconClick={()=>{this.clickTop(item)}}/>
                    }
                </div>
            )
        }
        //已下线
        let handle_3 = (item) =>{
            return (
                <div>
                    <IconHandle type='1' iconClick={()=>{this.clickCheck(item)}}/>
                    <IconHandle type='4' iconClick={()=>{this.clickOnline(item)}}/>
                    <IconHandle type='3' iconClick={()=>{this.clickEdit(item)}}/>
                    <IconHandle type='2' iconClick={()=>{this.clickDel(item)}}/>
                </div>
            )
        }
        let handle;
        if(selectValue == 3){
            handle = handle_1;
        }else if(selectValue == 4){
            handle = handle_2;
        }else{
            handle = handle_3;
        }
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
                                    新增文件
                                </Button>
                            </div> */}
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        tdHeight='58px'
                        thead={[{width:'5%',name:' '},{width:'30%',name:'服务标题'},{width:'20%',name:'类型'},{width:'25%',name:'创建时间'},{width:'20%',name:'操作'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{item.title}</td>
                                   <td>{item.businessCategory}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle' >
                                        {handle(item,index)}
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