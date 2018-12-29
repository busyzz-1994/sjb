import React,{Component} from 'react';
import NavTab from './common/nav.js';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal,Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom'; 
import fileApi from 'api/video/index.js';
import serviceApi from 'api/service/index.js';
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
            selectValue:'0',
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
            serviceApi.getFileList({
                currPage:pageNum,
                pageSize,
                checkview:selectValue,
                title:searchValue
            }).then(res=>{
                let totalCount = res[0].total;
                let list = res[0].list ;
                console.log(list)
                this.setState({
                    dataList:list,
                    total:totalCount
                })
            })
        }else{
            serviceApi.getFileList({
                currPage:pageNum,
                pageSize,
                checkview:selectValue
            }).then(res=>{
                let totalCount = res[0].total;
                let list = res[0].list ;
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
        this.props.history.push(`/service/serviceEdit/file/detail`);
    }
    //点击查看图标
    clickCheck(item){
        this.props.history.push(`/service/serviceAudit/file/detail/${item.id}/?checked=0&name=${item.title}&bussinessType=${item.bussinessType}`)
    }
    //点击编辑图标
    clickEdit(item){
        this.props.history.push({
            pathname:`/service/serviceEdit/file/detail/${item.id}/?checked=1&name=${item.title}&bussinessType=${item.bussinessType}`
        })
    }
    //点击审核
    clickAuth(item){
        this.props.history.push(`/service/serviceAudit/file/detail/${item.id}/?checked=2&name=${item.title}&bussinessType=${item.bussinessType}`)
    }
    //点击删除图标
    clickDel(item){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                serviceApi.delFileDetail({id:item.id}).then(res=>{
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
    render(){
        let {selectValue} = this.state;
        return (
            <div className={style.container}>
                <NavTab/>
                <div className={style.content}>
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                // defaultValue = {this.state.selectValue}
                                // defaultValue = '待审核'
                                value = {this.state.selectValue}
                                onChange={(value)=>{this.select(value)}}
                            >
                                <Option value="0">待审核</Option>
                                <Option value="1">审核未通过</Option>
                                <Option value="2">审核已通过</Option>
                            </Select>
                        </div>
                        <div className='fr'>
                            <Search
                                placeholder="输入关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                            <div style={{display:'inline-block',marginLeft:'10px'}}>
                                {/* <Button onClick={()=>{this.goAddBanner()}} type="primary" icon="plus" >
                                    新增文件
                                </Button> */}
                            </div>
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        tdHeight='58px'
                        thead={[{width:'5%',name:' '},{width:'30%',name:'商家标题'},{width:'20%',name:'类型'},{width:'25%',name:'创建时间'},{width:'20%',name:'操作'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{item.title}</td>
                                   <td>{item.businessCategory}</td>
                                   <td>{item.createTime}</td>
                                   <td className='td-handle' >
                                        {
                                            selectValue == '0' ?<IconHandle type='0'  iconClick={()=>{this.clickAuth(item)}}/>:
                                            <IconHandle type='1' iconClick={()=>{this.clickCheck(item)}}/>
                                        }
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