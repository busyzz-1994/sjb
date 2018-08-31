import React,{Component} from 'react';
import NavTab from './common/nav.js';
import TableList from 'components/global/tableList';
import style from 'common/layout.scss';
import { Select , Input , Button ,message,Pagination,Modal} from 'antd';
import { withRouter } from 'react-router-dom'; 
import newsEditApi from 'api/news/banner.js';
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
            selectValue:0,
            //当前render的数据
            dataList:[],
            //当前的原数据
            originDataList:[],
            //原数据
            originData:[],
            pageSize:1,
            total:10,
            pageNum:1
        }
    }
    componentDidMount(){
       this.loadList();
    }
    //加载数据
    loadList(){
        newsEditApi.getBannerList().then(res=>{
            this.setState({
                dataList:res,
                originData:res,
                originDataList:res
            },()=>{
                this.choiceType();
            })
        })
    }
    //选择类型
    choiceType(){
        let type = this.state.selectValue;
        let dataList = this.state.originData.filter((item,index)=>{
            return item.baType == type ;
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
        this.props.history.push('/news/newsEdit/banner/add');
    }
    //点击查看图标
    clickCheck(id){
        this.props.history.push(`/news/newsEdit/banner/add/${id}/?checked=0`)
    }
    //点击编辑图标
    clickEdit(id){
        this.props.history.push(`/news/newsEdit/banner/add/${id}/?checked=1`)
    }
    //点击删除图标
    clickDel(id){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk(){
                
            },
            okText:'确认',
            cancelText:'取消'
        })
    }
    render(){
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
                                defaultValue = '待审核'
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
                                <Button onClick={()=>{this.goAddBanner()}} type="primary" icon="plus" >
                                    新增banner
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        thead={[{width:'5%',name:' '},{width:'22%',name:'轮播图片'},{width:'35%',name:'标题'},{width:'8%',name:'类型'},{width:'15%',name:'创建时间'},{width:'15%',name:'操作'}]}
                    >
                       {this.state.dataList.map((item,index)=>{
                           return (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>
                                       <img src={config.server+item.titleImg} width='150' height='70'/>
                                   </td>
                                   <td>{item.title}</td>
                                   <td>{item.type == '0' ? '外链':'内链'}</td>
                                   <td>{item.createTime}</td>
                                   <td>
                                        <IconHandle type='1' id={item.id} iconClick={(id)=>{this.clickCheck(id)}}/>
                                        <IconHandle type='3' id={item.id} iconClick={(id)=>{this.clickEdit(id)}}/>
                                        <IconHandle type='2' id={item.id} iconClick={(id)=>{this.clickDel(id)}}/>
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