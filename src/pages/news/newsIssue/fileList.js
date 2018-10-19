import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import TableList from 'components/global/tableList';
import style from '../common/banner.scss';
import { Select , Input , Button ,message,Pagination,Modal} from 'antd';
import { withRouter } from 'react-router-dom'; 
import fileApi from 'api/news/file';
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
                url:'/news/newsIssue/banner'
            },
            {
                name:'新闻类型',
                url:'/news/newsIssue/type'
            },
            {
                name:'新闻文件',
                url:'/news/newsIssue/file'
            }
        ]
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
            pageSize:4,
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
            fileApi.searchIssue({
                currPage:pageNum,
                theissue:selectValue,
                pageSize,
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
            fileApi.getAuthList({
                currPage:pageNum,
                theissue:selectValue,
                pageSize
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
    //点击分页
    changePage(pageNum){
		this.setState({
            pageNum
        },()=>{
            this.loadList();
        })
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
            selectValue:value
        },()=>{
            this.loadList();
        })
    }
    //跳转到添加页面
    goAddBanner(){
        this.props.history.push('/news/newsEdit/file/fileDetail');
    }
    //点击查看图标
    clickCheck(item){
        this.props.history.push(`/news/newsIssue/file/fileDetail/${item.id}/?name=${item.title}&checked=0`);
    }
    //点击编辑图标
    clickEdit(item){
        this.props.history.push(`/news/newsIssue/file/fileDetail/${item.id}/?name=${item.title}&checked=1`);
    }
    //点击上线
    clickOnline(item){
        console.log(item)
        fileApi.fileOnline({contentId:item.id,theissue:'4'}).then(res=>{
            message.success('上线成功！');
            this.loadList();
        }).catch(err=>{
            message.error(err);
        })
    }
    //点击下线
    clickUnline(item){
        fileApi.fileOnline({contentId:item.id,theissue:'5'}).then(res=>{
            message.success('下线成功！');
            this.loadList();
        }).catch(err=>{
            message.error(err);
        })
    }
    //点击删除图标
    clickDel(item){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                let {id} = item;
                fileApi.delFile({
                    newsId:id,
                    id:''
                }).then(res=>{
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
         //待发布icon
         let handle_1 = (item) =>{
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(item)}}/>
                    <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(item)}}/>
                    <IconHandle type='4' id={item.id} iconClick={(id)=>{this.clickOnline(item)}}/>
                    <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(item)}}/>
                </div>
            )
        }
        //已发布时候的icon列表
        let handle_2 = (item,index) =>{
            let hide = (index == 0) && (pageNum == 1) ;
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(item)}}/>
                    <IconHandle type='6' id={item.id} iconClick={(id)=>{this.clickUnline(item)}}/>
                </div>
            )
        }
        //已下线时候的icon列表
        let handle_3 = (item) =>{
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(item)}}/>
                    <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(item)}}/>
                    <IconHandle type='4' id={item.id} iconClick={(id)=>{this.clickOnline(item)}}/>
                    <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(item)}}/>
                </div>
            )
        }
        let { selectValue ,pageNum} = this.state;
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
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        thead={[{width:'5%',name:' '},{width:'35%',name:'新闻标题'},{width:'15%',name:'类型'},{width:'25%',name:'创建时间'},{width:'20%',name:'操作'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{item.title}</td>
                                   <td>{item.newsCategory}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle'>
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