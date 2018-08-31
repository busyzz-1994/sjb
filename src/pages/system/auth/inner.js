import React,{Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import style from '../common/common.scss';
import NavBar from './common/nav.js';
import TableList from 'components/global/tableList';
import IconHandle from 'components/global/icon';
import {Pagination,Button,Input} from 'antd';
const Search = Input.Search
class Sign extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchValue : '',
            pageNum : 1,
            total : 5,
            pageSize : 10,
            //mock数据
            dataList:[
                {
                    id:1,
                    userName:'hhhh',
                    email:'540548050@qq.com',
                    name:'qzz',
                    createTime:'2018-8-20 15:10',
                },
                {
                    id:9,
                    userName:'xx',
                    email:'54048050@qq.com',
                    name:'qzzss',
                    createTime:'2018-8-20 12:10',
                },
            ]
        }
    }
    goAdd(){
        this.props.history.push('/system/auth/inner/detail');
    }
    searchTitle(value){
        this.setState({
            searchValue:value
        })
    }
    clickEidt(id){
        this.props.history.push(`/system/auth/inner/detail/${id}`);
    }
    changePage(pageNum){
        this.setState({
            pageNum
        })
    }
    render(){
        let {dataList}  = this.state; 
        return (
            <div className={style.container}>
                <NavBar/>
                <div className={style.content}>
                    {/* 操作开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <button className="btn btn-danger btn-sm">恢复所有内部用户初始密码</button>
                        </div>
                        <div className='fr'>
                            <Search
                                placeholder="输入关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                            <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAdd()}} type="primary" icon="plus" >
                                    新增用户
                                </Button>
                            </div>
                        </div>
                    </div>
                     {/* 操作结束 */}
                     <TableList
                        thead={[{width:'5%',name:' '},{width:'20%',name:'用户名'},{width:'20%',name:'绑定邮箱'},{width:'15%',name:'姓名'},{width:'25%',name:'创建时间'},{width:'15%',name:'操作'}]}
                        tdHeight = '58px'
                    >
                        {dataList.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.createTime}</td>
                                    <td>
                                        <IconHandle type='3' id={item.id} iconClick={(id)=>this.clickEidt(id)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </TableList>
                    <div className='clearfix'>
                        <div className='fr'>
                            <Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} hideOnSinglePage={false}
                            current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
                            total={this.state.total} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Sign);