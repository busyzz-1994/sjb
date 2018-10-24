import React,{Component} from 'react';
import NavTab from './common/nav.js';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import self from './self.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon,Row,Col} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import recommendApi from 'api/search/recommend.js';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
import Bread from 'components/global/bread';
import OtherNewsModal from 'components/global/otherNewsModal';
import FormAuth from 'components/global/auditForm';
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
                path:`/search/searchAuth/recommend/${this.props.match.params.type}`
            },
            {
                name:_mm.getParam('name'),
                path:''
            }
        ]
        this.state={
            //当前的状态
            selectValue:'0',
            checked:_mm.getParam('checked'),
            name:_mm.getParam('name'),
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
            //审核
            authStatus:2,
            authDetail:''
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
                id,
                currPage:pageNum,
                pageSize,
                keyword:searchValue
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
        }else{
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
        this.props.history.push(`/fileDetail/${item.newsId}/?checked=0&name=${item.resourcesName}&type=${item.resourcesType}`)
        // this.props.history.push(`/discounts/discountsEdit/file/fileDetail/${id}/?checked=0&name=${name}`)
    }
    //点击编辑图标
    clickEdit(id,name){
        this.props.history.push({
            pathname:`/discounts/discountsEdit/file/fileDetail/${id}/?checked=1&name=${name}`
        })
    }
    //点击删除图标
    clickDel(id){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                fileApi.removeFile({id}).then(res=>{
                    this.loadList();
                }).catch(res=>{
                    message.error(res);
                })
            },
            okText:'确认',
            cancelText:'取消'
        })
    }
    //提交审核
    save(){
        let {authDetail,authStatus,id} = this.state ;
        recommendApi.authList({
            id,
            checkview:authStatus,
            remark:authDetail
        }).then(res=>{
            message.success('审核完成！');
            this.props.history.goBack();
        }).catch(err=>{
            message.error(err);
        })
    }
    render(){
        let {checked,name,authStatus,authDetail} =this.state;
        return (
            <div className={style.container}>
                <NavTab/>
                <div className={style.content}>
                    <OtherNewsModal 
                        visible={this.state.modalVisible} 
                        ok={()=>{this.setState({modalVisible:false})}}
                        cancel={()=>{this.setState({modalVisible:false})}}
                    />
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <Bread
                                breadList = {this.breadList}
                                audit = {name}
                            />
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
                                   </td>
                               </tr>
                           )
                       })}
                    </TableList>
                    <div className={self.auth}>
                        <FormAuth
                            status = {authStatus}
                            detail = {authDetail}
                            getStatus = {(val)=>this.setState({authStatus:val})}
                            getDetail = {val=>this.setState({authDetail:val})}
                        />
                        <div className='form-item btn-item'>
                            <Row>
                                <Col offset='5' span='10'>
                                    <Button onClick={()=>{this.save()}} type='primary' size='large'>保存</Button>
                                    <Button onClick={()=>{this.props.history.goBack()}} size='large'>取消</Button>
                                </Col>
                            </Row>
                        </div> 
                    </div>
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