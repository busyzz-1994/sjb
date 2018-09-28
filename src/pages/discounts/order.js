import React,{Component} from 'react';
// import NavTab from './common/nav.js';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import orderApi from 'api/discounts/order.js';
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
            orderApi.search({
                currPage:pageNum,
                pageSize,
                orderNumber:searchValue
            }).then(res=>{
                console.log(res)
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            orderApi.getOrderList({
                currPage:pageNum,
                pageSize
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
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
    
    //点击分页
    changePage(pageNum){
		this.setState({
            pageNum
        },()=>{
            this.loadList();
        })
    }
    render(){
        return (
            <div className={style.container}>
                <div className={style.content}>
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fr'>
                            <Search
                                placeholder="输入订单号进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        tdHeight='58px'
                        thead={[{width:'5%',name:' '},{width:'20%',name:'商品名称'},{width:'15%',name:'商品价格（元）'},{width:'10%',name:'商品数量'},{width:'15%',name:'购买者账号'},{width:'20%',name:'订单编号'},{width:'15%',name:'订单时间'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{item.productName}</td>
                                   <td>{item.productPrice}</td>
                                   <td>{item.productNumber}</td>
                                   <td>{item.userNumber}</td>
                                   <td>{item.orderNumber}</td>
                                   <td>{item.creatTime}</td>
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