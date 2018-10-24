import React,{Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import style from 'common/layout.scss';
import NavBar from './common/nav.js';
import TableList from 'components/global/tableList';
import IconHandle from 'components/global/icon';
import {Pagination,Button,Input,message} from 'antd';
import systemApi from 'api/system';
import userApi from 'api/user/index.js';
import config from 'base/config.json';
import Icon from './icon';
const Search = Input.Search
class Sign extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchValue : '',
            pageNum : 1,
            total : 5,
            pageSize : 12,
            dataList:[],
            //是否处于搜索状态
            isSearch:false,
            searchValue:'',
        }
    }
    componentDidMount(){
        this.loadList()
    }
     //加载数据
     loadList(){
        let {pageSize,pageNum,isSearch,searchValue} = this.state;
        if(isSearch){
            userApi.getUserInfoList({
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
            })
        }else{
            userApi.getUserInfoList({
                currPage:pageNum,
                pageSize
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
    goAdd(){
        this.props.history.push('/system/auth/inner/detail');
    }
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
    resetPassword(){
        systemApi.resetPassword({
            initialPassword:'123456',
            isInternal:0
        }).then(res=>{
                message.success('重置密码成功！')
        }).catch(err=>{
                message.success(err)
        })
    }
    clickEidt(id,name){
        this.props.history.push(`/system/auth/inner/detail/${id}/?checked=1&name=${name}`);
    }
    changePage(pageNum){
        this.setState({
            pageNum
        },()=>{
            this.loadList()
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
                        {/* <div className='fl'>
                            <button onClick={()=>this.resetPassword()} className="btn btn-danger btn-sm">恢复所有内部用户初始密码</button>
                        </div> */}
                        <div className='fr'>
                            <Search
                                placeholder="输入用户名关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                            {/* <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAdd()}} type="primary" icon="plus" >
                                    新增用户
                                </Button>
                            </div> */}
                        </div>
                    </div>
                     {/* 操作结束 */}
                     <TableList
                        thead={[{width:'5%',name:' '},{width:'10%',name:'用户头像'},{width:'15%',name:'用户昵称'},{width:'15%',name:'用户账号'},{width:'10%',name:'性别'},{width:'15%',name:'地区'},{width:'15%',name:'绑定社交账号'},{width:'15%',name:'注册时间'}]}
                        tdHeight = '58px'
                    >
                        {dataList.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>
                                        <img src={config.server+item.userImg} alt="" style={{width:'50px',height:'50px'}}/>
                                    </td>
                                    <td>{item.userName}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.sex}</td>
                                    <td>{item.area}</td>
                                    <td>
                                        <Icon iconList={item.type.split(',')}/>
                                    </td>
                                    <td>
                                        {item.createTime}
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