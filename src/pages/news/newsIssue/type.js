import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import recommendApi from 'api/search/recommend.js';
import videoApi from 'api/video/index.js';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
import IssueButton from 'components/global/issueButton/index.js';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
class Banner extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/news/newsIssue/banner'
            },
            {
                name:'新闻类型',
                url:'/news/newsIssue/type'
            },
            {
                name:'新闻列表',
                url:'/news/newsIssue/file'
            }
        ]
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
            videoApi.getTypeList({
                currPage:pageNum,
                pageSize,
                type:0,
                name:searchValue,
                theissue:selectValue
            }).then(res=>{
                let totalCount = res[0].total;
                let list = res[0].list ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            videoApi.getTypeList({
                currPage:pageNum,
                pageSize,
                type:0,
                theissue:selectValue
            }).then(res=>{
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
    clickCheck(id,name){
        this.props.history.push(`/discounts/discountsEdit/file/fileDetail/${id}/?checked=0&name=${name}`)
    }
    //点击编辑图标
    clickEdit(item){
        this.props.history.push({
            pathname:`/video/videoEdit/type/detail/${item.id}/?checked=1&name=${item.name}`
        })
    }
    //上线
    clickOnline(item){
        videoApi.OnlineType({
            id:item.id,
            theissue:'4'
        }).then(res=>{
            message.success('发布成功！');
            this.loadList()
        })
    }
    //下线
    clickUnline(item){
        videoApi.OnlineType({
            id:item.id,
            theissue:'5'
        }).then(res=>{
            message.success('下线成功！');
            this.loadList()
        })
    }
    //置顶
    clickTop(item){
        videoApi.topType({
            id:item.id
        }).then(res=>{
            message.success('置顶成功！');
            this.loadList()
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
        let {selectValue,pageNum} = this.state;
        let handle_2 = (item,index)=>{
            return (
                <div>
                    <IconHandle type='6' iconClick={()=>{this.clickUnline(item)}}/>
                    {
                        (index <1 && pageNum ==1) ? null : <IconHandle type='5' iconClick={()=>{this.clickTop(item)}}/>
                    }
                </div>
            )
        }
        return (
            <div className={style.container}>
                <NavTab navList={this.navList}/>
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
                            <IssueButton callback={()=>{this.loadList()}} type={10} dataList ={this.state.dataList} />
                            {/* <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAddBanner()}} type="primary" icon="plus" >
                                    新增类型
                                </Button>
                            </div> */}
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        tdHeight='58px'
                        thead={[{width:'5%',name:' '},{width:'25%',name:'类型名称'},{width:'30%',name:'创建时间'},{width:'20%',name:'操作'},{width:'20%',name:'管理'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td style={item.exclusive=='1' || item.exclusive=='2' || item.name=='党政参考'?{color:'#F8AD2F'}:{}} >{item.name}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle' >
                                    {
                                        selectValue == '4' ? handle_2(item,index) :
                                        <div>
                                            <IconHandle type='4' iconClick={()=>{this.clickOnline(item)}}/>
                                            <IconHandle type='2' iconClick={()=>{this.clickDel(item)}}/>
                                        </div>
                                    }
                                        
                                   </td>
                                   <td>
                                        {
                                            item.name =='党政参考'?null:
                                            item.exclusive == '2'?
                                            <Link className='gl-link' to={`/news/newsIssue/type/specialList/${item.id}/?name=${item.name}`} ><Icon type="link" />
                                                关联类型
                                            </Link>:
                                            <Link className='gl-link' to={`/news/newsIssue/type/list/${item.id}/?name=${item.name}`} >
                                            <Icon type="link" />
                                                关联文件
                                            </Link>
                                        }
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