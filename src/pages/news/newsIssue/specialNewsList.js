import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import recommendApi from 'api/search/recommend.js';
import commonApi from 'api/common.js'
import videoApi from 'api/video/index.js';
import newsApi from 'api/news/category.js';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
import Bread from 'components/global/bread';
import OtherNewsModal from 'components/global/otherNewsModal';
import _mm from 'util/mm.js';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
class Banner extends Component{
    constructor(props){
        super(props)
        this.breadList = [
            {
                name:'新闻类型',
                path:'/news/newsIssue/type'
            },
            {
                name:`${_mm.getParam('name')}`,
                path:`/news/newsIssue/type/specialList/${_mm.getParam('categoryId')}/?name=${_mm.getParam('name')}`
            },
            {
                name:_mm.getParam('specialName'),
                path:''
            }
        ]
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
            selectValue:'0',
            id:this.props.match.params.id,
            specialName:_mm.getParam('specialName'),
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
            pageNum:1,
            //弹出框
            modalVisible:false
        }
    }
    componentDidMount(){
       this.loadList();
    }
    //加载数据
    loadList(){
        let {pageSize,pageNum,selectValue,isSearch,searchValue,id} = this.state;
        if(isSearch){
            newsApi.getCategoryFlieList({
                currPage:pageNum,
                pageSize,
                resourcesName:searchValue,
                specialId:id
            }).then(res=>{
                let totalCount = res[0].total;
                let list = res[0].list ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            newsApi.getCategoryFlieList({
                currPage:pageNum,
                pageSize,
                specialId:id
            }).then(res=>{
                console.log(res);
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
        this.setState({
            modalVisible:true
        })
    }
    //点击查看图标
    clickCheck(item){
        // this.props.history.push(`/discounts/discountsEdit/file/fileDetail/${id}/?checked=0&name=${name}`)
        this.props.history.push(`/video/videoEdit/file/detail/${item.newsId}/?checked=0&name=${item.resourcesName}`)
    }
    //点击编辑图标
    clickEdit(id,name){
        this.props.history.push({
            pathname:`/search/searchEdit/recommend/${id}/?checked=1&name=${name}`
        })
    }
    //点击删除图标
    clickDel(item){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                newsApi.delCategoryFlie({specialContentId:item.specialContentId}).then(res=>{
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
    //关联后的回调
    relevanceCallback(selectedRowKeys,fn){
        let {id} = this.state;
        console.log(selectedRowKeys)
        newsApi.addCategory({
            specialId:id,
            specialContentlist:selectedRowKeys
        }).then(res=>{
            this.setState({
                modalVisible:false
            },()=>{
                fn();
                this.loadList();
                message.success('关联文件成功！');
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        let {pageNum} = this.state;
        return (
            <div className={style.container}>
                <NavTab navList={this.navList}/>
                <div className={style.content}>
                    <OtherNewsModal 
                        activeType ={0}
                        visible={this.state.modalVisible} 
                        ok={()=>{this.setState({modalVisible:false})}}
                        cancel={()=>{this.setState({modalVisible:false})}}
                        callback = {(selectedRowKeys,fn)=>this.relevanceCallback(selectedRowKeys,fn)}
                        canChange = {true}
                        flag = '1'
                        navList = {['新闻','','','直播','视频','','']}
                    />
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <Bread
                                breadList = {this.breadList}
                            />
                        </div>
                        <div className='fr'>
                            <Search
                                placeholder="输入关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                            <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAddBanner()}} type="primary" icon="link" >
                                    关联文件
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        tdHeight='58px'
                        thead={[{width:'5%',name:' '},{width:'30%',name:'文件名称'},{width:'20%',name:'类型'},{width:'25%',name:'创建时间'},{width:'20%',name:'操作'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{item.resourcesName}</td>
                                   {/* <td>{item.resourcesType}</td> */}
                                   <td>{_mm.mapTypeToString(item.resourcesType)}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle' >
                                        <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(item)}}/>
                                        <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(item)}}/>
                                        {/* {
                                            (index==0)&&pageNum==1?null: <IconHandle type='5' id={item.id} iconClick={(id)=>{this.clickTop(item)}}/>
                                        } */}
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