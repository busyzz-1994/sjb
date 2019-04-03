import React,{Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import style from '../common/common.scss';
import NavBar from './common/nav.js';
import TableList from 'components/global/tableList';
import IconHandle from 'components/global/icon';
import {Pagination,Button,Input,message,Modal} from 'antd';
import systemApi from 'api/system';
const Search = Input.Search;
const confirm = Modal.confirm;
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
            systemApi.searchUser({
                currPage:pageNum,
                pageSize,
                keyword:searchValue,
                type:0
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            systemApi.getUserList({
                currPage:pageNum,
                pageSize,
                isInternal:0
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
        //点击删除图标
        confirm({
            title:'恢复用户密码会将所有用户的密码重置，确定恢复吗？',
            onOk:()=>{
                systemApi.resetPassword({
                    initialPassword:'123456',
                    isInternal:0
                }).then(res=>{
                        message.success('重置密码成功！')
                }).catch(err=>{
                        message.error(err)
                })
            },
            okText:'确认',
            cancelText:'取消'
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
                        <div className='fl'>
                            <button onClick={()=>this.resetPassword()} className="btn btn-danger btn-sm">恢复所有内部用户初始密码</button>
                        </div>
                        <div className='fr'>
                            <Search
                                placeholder="输入用户名关键字进行搜索"
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
                            let color;
                            color = item.isStop == '1' ? '#666666':'#FF0000';
                            let style = {
                                color
                            }
                            return (
                                <tr key={index} >
                                    <td style={style}>{index+1}</td>
                                    <td style={style}>{item.name}</td>
                                    <td style={style}>{item.email}</td>
                                    <td style={style}>{item.nickname}</td>
                                    <td style={style}>{item.creatTime}</td>
                                    <td className='td-handle'>
                                        <IconHandle type='3' id={item.id} iconClick={(id)=>this.clickEidt(id,item.name)} />
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