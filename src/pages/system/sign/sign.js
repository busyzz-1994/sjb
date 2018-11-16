import React,{Component} from 'react';
import style from '../common/common.scss';
import NavBar from './common/nav.js';
import TableList from 'components/global/tableList';
import IconHandle from 'components/global/icon';
import {Pagination,Modal,Button} from 'antd';
import systemApi from 'api/system';
const confirm = Modal.confirm;
class Sign extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            pageNum : 1,
            total : 0,
            pageSize : 12,
            dataList:[],
            type:props.match.params.type
        }
        //mock数据
        this.data = [
            {
                name:'热门话题'
            },{
                name:'直播'
            }
        ]
    }
    componentDidMount(){
        this.loadList();
    }
    loadList(){
        let {pageNum,pageSize,type} = this.state;
        console.log(type)
        systemApi.getSignList({
            currPage:pageNum,pageSize,type
        }).then(res=>{
            if(res.length>0){
                let total = res[0].totalCount,
                    list = res[0].lists;
                this.setState({
                    total,
                    dataList:list
                })    
            }
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
    clickDel(name){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                let {type} = this.state;
                systemApi.delSign({name,type}).then(res=>{
                    this.loadList();
                }).catch(res=>{
                    message.error(res);
                })
            },
            okText:'确认',
            cancelText:'取消'
        })
    }
    goAdd(){
        let {type} = this.state;
        this.props.history.push(`/system/sign/${type}/detail`)
    }
    render(){
        let {dataList} = this.state;
        return (
            <div className={style.container}>
                <NavBar/>
                <div className={style.content}>
                <div className={style.handle + ' clearfix'}>
                        <div className='fr'>
                            <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAdd()}} type="primary" icon="plus" >
                                    新增标签
                                </Button>
                            </div>
                        </div>
                    </div>
                    <TableList
                        thead={[{width:'5%',name:' '},{width:'75%',name:'标签名'},{width:'20%',name:'操作'}]}
                        tdHeight = '56px'
                    >
                        {
                            dataList.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                       <td>{index+1}</td>
                                       <td>
                                           {item.name}
                                       </td>
                                       <td className='td-handle'>
                                           <IconHandle  type='2' id={item.name} iconClick={(id)=>this.clickDel(id)} />
                                       </td>
                                    </tr>
                                )
                            })
                        }
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
export default Sign;