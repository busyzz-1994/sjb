import React,{Component} from 'react';
import { Input ,Pagination , Button ,Modal ,Form,message } from 'antd';
import { Link } from 'react-router-dom';
const Search = Input.Search;
import userApi from 'api/user.js';
class BidIndex extends Component{
    constructor(props){
        super(props)
        this.state = {
            bidList:[],
            pageSize:10,
            pageNum:1,
            total:1
        }
    }
    componentDidMount(){
        this.loadList();
    }
    loadList(){
        let param = {
            pageSize:this.state.pageSize,
            pageNum : this.state.pageNum
        }
        userApi.getBidList(param).then(res=>{
            console.log(res.list)
            this.setState({
                total:res.total,
                bidList:res.list
            })
        })
    }
    changePage(pageNum){
		this.setState({
			pageNum:pageNum
		},()=>{
			this.loadList();
		})
	}
    search(value){
        console.log(value)
        if(value){
			userApi.searchBid(value).then(res=>{
				this.setState({
					bidList:res
				})
			})
		}else{
			this.loadList();
		}
    }
    render(){
        return (
            <div>
                <div className='clearfix'>
                    <div className='search clearfix fl'>
						<Search
							placeholder="输入投标机构关键字"
							onSearch={value => this.search(value)}
							enterButton
						/>
					</div>
                </div>
                <table id='bid-list' className='table table-hover table-striped table-list'>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>公司名称</th>
                            <th>信用代码</th>
                            <th>法人</th>
                            <th>联系方式</th>
                            <th>经营期限</th>
                            <th>注册时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.bidList.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.company}</td>
                                        <td>{item.creditCode}</td>
                                        <td>{item.corporation}</td>
                                        <td>{item.fixedPhone}</td>
                                        <td>{item.operatePeriod?item.operatePeriod:'永久'}</td>
                                        <td>{item.registerTime}</td>
                                        <td>
                                            <Link to={`/bid/detail/${item.id}`}>详情</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} hideOnSinglePage={true}
				 current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
				 total={this.state.total} />
            </div>
        )
    }
}
export default BidIndex;