import React,{Component} from 'react';
import NavTab from './common/nav.js';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import recommendApi from 'api/search/recommend.js';
import commonApi from 'api/common.js'
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
                name:'推荐',
                path:`/search/searchIssue/recommend/${this.props.match.params.type}`
            },
            {
                name:_mm.getParam('name'),
                path:''
            }
        ]
        this.state={
            //当前的状态
            selectValue:'0',
            id:this.props.match.params.id,
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
            modalVisible:false,
            type:this.props.match.params.type
        }
    }
    componentDidMount(){
       this.loadList();
    }
    //加载数据
    loadList(){
        let {pageSize,pageNum,selectValue,isSearch,searchValue,id} = this.state;
        if(isSearch){
            recommendApi.getFileList({
                currPage:pageNum,
                pageSize,
                id,
                keyword:searchValue,
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            console.log(id)
            recommendApi.getFileList({
                id,
                currPage:pageNum,
                pageSize
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
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
        let {type} = this.state;
        // this.props.history.push(`/discounts/discountsEdit/file/fileDetail/${id}/?checked=0&name=${name}`)
        this.props.history.push(`/fileDetail/${item.newsId}/?checked=0&name=${item.resourcesName}&type=${item.resourcesType}`)
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
                recommendApi.delFile({id:item.id}).then(res=>{
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
        commonApi.addFileList({
            id,
            categoryContentlist:selectedRowKeys
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
                <NavTab/>
                <div className={style.content}>
                    <OtherNewsModal 
                        visible={this.state.modalVisible} 
                        ok={()=>{this.setState({modalVisible:false})}}
                        cancel={()=>{this.setState({modalVisible:false})}}
                        callback = {(selectedRowKeys,fn)=>this.relevanceCallback(selectedRowKeys,fn)}
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