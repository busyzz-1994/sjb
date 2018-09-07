import React,{Component} from 'react';
import NavTab from './common/nav.js';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import typeApi from 'api/discounts/type.js';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
import Bread from 'components/global/bread';
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
            //当前的原数据
            originDataList:[],
            //原数据
            //是否处于搜索状态
            isSearch:false,
            searchValue:'',
            breadList:[
                    {
                        name:'商品类型',
                        path:'/discounts/discountsEdit/type'
                    },
                    {
                        name:_mm.getParam('name'),
                        path:''
                    }
                ],
            originData:[],
            pageSize:6,
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
            typeApi.searchType({
                currPage:pageNum,
                pageSize,
                type:'2',
                name:searchValue
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            typeApi.getTypeList({
                currPage:pageNum,
                pageSize,
                type:'2'
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
    // select(value){
    //     this.setState({
    //         selectValue:value,
    //         pageNum:1
    //     },()=>{
    //         this.loadList();
    //     })
    // }
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
        let { selectValue } = this.state;
        this.props.history.push(`/discounts/discountsEdit/type/typeDetail/?type=2`);
    }
    //点击查看图标
    clickCheck(id){
        // this.props.history.push(`/news/newsEdit/banner/add/${id}/?checked=0`)
    }
    //点击编辑图标
    clickEdit(id,name,type){
        this.props.history.push({
            pathname:`/discounts/discountsEdit/type/typeDetail/${id}/?checked=1&name=${name}&type=${type}`
        })
    }
    //点击删除图标
    clickDel(id){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                typeApi.delType({id}).then(res=>{
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
        let {breadList} = this.state;
        return (
            <div className={style.container}>
                <NavTab/>
                <div className={style.content}>
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <Bread  breadList={breadList}/>
                        </div>
                        <div className='fr'>
                            <Search
                                placeholder="输入关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                            <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAddBanner()}} type="primary" icon="plus" >
                                    新增类型
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        tdHeight='58px'
                        thead={[{width:'5%',name:' '},{width:'30%',name:'类型名称'},{width:'20%',name:'创建时间'},{width:'25%',name:'操作'},{width:'20%',name:'管理'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{item.name}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle' >
                                        <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(id,item.name,item.type)}}/>
                                        <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id)}}/>
                                   </td>
                                   <td>
                                        <Link className='gl-link' to={`/discounts/discountsEdit/typeList/${item.id}`} >
                                        <Icon type="link" />
                                        关联商品文件
                                        </Link>
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