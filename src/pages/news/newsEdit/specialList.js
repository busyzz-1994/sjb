import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import TableList from 'components/global/tableList';
import style from '../common/banner.scss';
import { Select , Input , Button ,message,Pagination,Breadcrumb} from 'antd';
import { withRouter ,Link } from 'react-router-dom'; 
import newsTypeApi from 'api/news/category.js';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
const Option = Select.Option;
const Search = Input.Search;
class specialList extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/news/newsEdit/banner'
            },
            {
                name:'新闻类型',
                url:'/news/newsEdit/type'
            },
            {
                name:'新闻列表',
                url:'/news/newsEdit/file'
            }
        ]
        this.state={
            //当前的状态
            selectValue:0,
            //当前render的数据
            dataList:[],
            //当前的原数据
            originDataList:[],
            //原数据
            originData:[],
            pageSize:1,
            total:10,
            pageNum:1,
            categoryName:'ddd'
        }
    }
    componentDidMount(){
       this.loadList();
    }
    //加载数据
    loadList(){
        let {pageNum,pageSize} = this.state;


        newsTypeApi.getList({
            currPage:pageNum,
            pageSize
        }).then(res=>{
            this.setState({
                dataList:res,
                originData:res,
                originDataList:res
            },()=>{
                // this.choiceType();
                console.log(this.state.originData)
            })
        })
    }
    //选择类型
    choiceType(){
        let type = this.state.selectValue;
        let dataList = this.state.originData.filter((item,index)=>{
            return item.type == type ;
        })
        this.setState({
            dataList,
            originDataList:dataList
        },()=>{
           this.renderPagination()
        })
    }
    //搜索
    searchTitle(value){
        if(!value){
            this.loadList();
            return;
        }
        newsEditApi.search({title:value,type:this.state.selectValue}).then(res=>{
            this.setState({
                dataList:res,
                originDataList:res
            },()=>{
                this.renderPagination()
            })
        }).catch(err=>{
            message.error(err);
        })
    }
    //选择类型
    select(value){
        this.setState({
            selectValue:value
        },()=>{
            this.choiceType();
        })
    }
    //点击分页
    changePage(pageNum){
        let pageSize = this.state.pageSize;
        let dataList = this.state.originDataList.slice((pageNum*pageSize - 1),((pageNum+1)*pageSize) - 1);
		this.setState({
            pageNum,
            dataList
        })
    }
    //设置分页组件
    renderPagination(){
        this.setState({
            total:this.state.dataList.length
        },()=>{
            this.changePage(1)
        })
    }
    //跳转到添加页面
    goAddBanner(){
        this.props.history.push('/news/newsEdit/type/save');
    }
    //点击查看图标
    clickCheck(id){
        console.log(id);
    }
    //点击编辑图标
    clickEdit(id){
        console.log(id);
    }
    //点击删除图标
    clickDel(id){
        console.log(id);
    }
    render(){
        return (
            <div className={style.container}>
                <NavTab navList={this.navList} />
                <div className={style.content}>
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <Link to='/news/newsEdit/type'>新闻类型</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <span style={{color:'#F7AB2F'}}>{this.state.categoryName}</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className='fr'>
                            <div style={{display:'inline-block',marginRight:'10px'}}>
                                <Select
                                    showSearch
                                    style={{ width: 150 }}
                                    optionFilterProp="children"
                                    // defaultValue = {this.state.selectValue}
                                    defaultValue = '待审核'
                                    onChange={(value)=>{this.select(value)}}
                               >
                                    <Option value="0">待审核</Option>
                                    <Option value="1">审核未通过</Option>
                                    <Option value="2">审核已通过</Option>
                                </Select>
                            </div>
                            <Search
                                placeholder="输入关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                            <div style={{display:'inline-block',marginLeft:'10px'}}>
                                <Button onClick={()=>{this.goAddBanner()}} type="primary" icon="plus" >
                                    新增专题
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        thead={[{width:'5%',name:' '},{width:'30%',name:'类型名称'},{width:'25%',name:'创建时间'},{width:'25%',name:'操作'},{width:'15%',name:'管理'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>
                                       <img src={config.server+item.titleImg} width='80%' height='80%'/>
                                   </td>
                                   <td>{item.title}</td>
                                   <td>{item.type == '0' ? '外链':'内链'}</td>
                                   <td>{item.createTime}</td>
                                   <td>
                                        <IconHandle type='1' id='1' iconClick={(id)=>{this.clickCheck(id)}}/>
                                        <IconHandle type='3' id='2' iconClick={(id)=>{this.clickEdit(id)}}/>
                                        <IconHandle type='2' id='3' iconClick={(id)=>{this.clickDel(id)}}/>
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
export default withRouter(specialList);