import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import TableList from 'components/global/tableList';
import style from '../common/banner.scss';
import { Select , Input , Button ,message,Pagination,Modal,Checkbox} from 'antd';
import { withRouter } from 'react-router-dom'; 
import fileApi from 'api/news/file';
import config from 'base/config.json';
import commonApi from 'api/common.js';
import IssueButton from 'components/global/issueButton/index.js';
import IconHandle from 'components/global/icon';
import _mm from 'util/mm.js';
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
        var nav_o = [
            {
                name:'新闻列表',
                url:'/news/newsIssue/file'
            }
        ]
        this.navList = _mm.isOuter() ? nav_o : this.navList;
        this.state={
            //当前的状态
            selectValue:'3',
            //当前render的数据
            dataList:[],
            //传入issueButton的datalist
            issueList:[],
            //是否处于搜索状态
            isSearch:false,
            searchValue:'',
            //当前的原数据
            originDataList:[],
            //原数据
            originData:[],
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
    //点击置顶
    clickTop(item){
        let {id,placedstick} = item;
        placedstick = placedstick == '1' ? '0' :'1';
        commonApi.topAndCancel({id,placedstick,type:'0'}).then(res=>{
            message.success('操作完成')
            this.loadList()
        }).catch(err=>{
            message.error(err);
        })
    }
    /**********支持多选代码 **********/
    //选中当前项
    checkbox(e){
        let list = this.getIssueId();
        let {issueList} = this.state;
        let has = list.indexOf(e.target.id) == -1 ? false:true;
        if(has){
            issueList.forEach((item,index)=>{
                if(e.target.id == item.id){
                    issueList.splice(index,1);
                    this.setState({
                        issueList
                    })
                }
            })
        }else{
           let item =  this.mapIdToItem(e.target.id);
           issueList.push(item);
           this.setState({
                issueList
           })
        }
    }
    //选中所有的项
    checkboxAll(){
        let {dataList,issueList} = this.state;
        if(issueList.length>0){
            this.setState({
                issueList:[]
            })
        }else{
            this.setState({
                issueList:JSON.parse(JSON.stringify(dataList))
            })
        }
    }
    //是否选中
    isChecked(id){
        let list = this.getIssueId();
        return list.indexOf(id) == -1 ? false:true;
    }
    //获取已经选中的id
    getIssueId(){
        let {issueList} = this.state;
        let list = issueList.map(item=>{
            return item.id
        })
        return list;
    }
    //通过id在datalist里面获取item
    mapIdToItem(id){
        let {dataList} = this.state;
        for(let i = 0 ; i<dataList.length;i++){
            if(dataList[i].id == id){
                return dataList[i] ;
            }
        }
    }
    render(){
        let {dataList} = this.state;
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
            let {placedstick} = item;
            return (
                <div>
                    <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(item)}}/>
                    <IconHandle type='6' id={item.id} iconClick={(id)=>{this.clickUnline(item)}}/>
                    {
                        placedstick == '1' ? <IconHandle type='9' id={item.id} iconClick={(id)=>{this.clickTop(item)}}/>:
                        <IconHandle type='5' id={item.id} iconClick={(id)=>{this.clickTop(item)}}/>
                    }
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
                            {selectValue != '4' ? <IssueButton callback={()=>{this.loadList();this.setState({issueList:[]})}} type={0} dataList ={this.state.issueList} />:null }
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        thead={[{checked:()=>{this.checkboxAll()},isChecked:this.state.dataList.length == this.state.issueList.length},{width:'5%',name:' '},{width:'30%',name:'新闻标题'},{width:'15%',name:'类型'},{width:'25%',name:'创建时间'},{width:'20%',name:'操作'}]}
                    >
                       {dataList.map((item,index)=>{
                           return (
                               <tr key={item.id+item.placedstick}>
                                   <td>
                                       <Checkbox checked={this.isChecked(item.id)} id={item.id} onChange={(e)=>{this.checkbox(e)}} />
                                   </td>
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