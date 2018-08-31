import React,{Component} from 'react';
import NavTab from 'components/global/navTab';
import TableList from 'components/global/tableList';
import style from '../common/banner.scss';
import { Select , Input , Button ,message,Pagination} from 'antd';
import { withRouter } from 'react-router-dom'; 
import newsEditApi from 'api/news/banner';
import config from 'base/config.json';
import IconHandle from 'components/global/icon';
const Option = Select.Option;
const Search = Input.Search;
class Banner extends Component{
    constructor(props){
        super(props)
        this.navList = [
            {
                name:'banner管理',
                url:'/news/newsIssue/banner'
            },
            {
                name:'新闻类型',
                url:'/news/newsIssue/type'
            },
            {
                name:'新闻文件',
                url:'/news/newsIssue/file'
            }
        ]
        this.state={
            //当前的状态
            selectValue:3,
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
    //点击查看图标
    clickCheck(id){
        console.log(id);
    }
    //点击编辑图标
    clickEdit(id){
        console.log(id);
    }
    //点击发布上线
    clickOnline(id){
        console.log(id);
    }
    //点击下线
    clickUnline(id){
        console.log(id)
    }
    render(){
        //未发布时候的icon列表
        let handle_1 = (index) =>{
            return (
                <div>
                    <IconHandle type='1' id='1' iconClick={(id)=>{this.clickCheck(id)}}/>
                    <IconHandle type='3' id='2' iconClick={(id)=>{this.clickEdit(id)}}/>
                    <IconHandle type='4' id='4' iconClick={(id)=>{this.clickOnline(id)}}/>
                </div>
            )
        }
        //已发布时候的icon列表
        let handle_2 = (index) =>{
            return (
                <div>
                    <IconHandle type='1' id='1' iconClick={(id)=>{this.clickCheck(id)}}/>
                    <IconHandle type='3' id='2' iconClick={(id)=>{this.clickEdit(id)}}/>
                    <IconHandle type='6' id='6' iconClick={(id)=>{this.clickUnline(id)}}/>
                </div>
            )
        }
        //已下线时候的icon列表
        let handle_3 = (index) =>{
            return (
                <div>
                    <IconHandle type='1' id='1' iconClick={(id)=>{this.clickCheck(id)}}/>
                    <IconHandle type='3' id='2' iconClick={(id)=>{this.clickEdit(id)}}/>
                    <IconHandle type='4' id='4' iconClick={(id)=>{this.clickOnline(id)}}/>
                    <IconHandle type='6' id='6' iconClick={(id)=>{this.clickUnline(id)}}/>
                </div>
            )
        }
        let { selectValue } = this.state;
        let handleList;
        if(selectValue == 3){
            handleList = handle_1;
        }else if(selectValue == 4){
            handleList = handle_2;
        }else{
            handleList = handle_3;
        }
        return (
            <div className={style.container}>
                <NavTab navList={this.navList} />
                <div className={style.content}>
                    {/* 操作栏开始 */}
                    <div className={style.handle + ' clearfix'}>
                        <div className='fl'>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                // defaultValue = {this.state.selectValue}
                                defaultValue = '待发布'
                                onChange={(value)=>{this.select(value)}}
                            >
                                <Option value="3">待发布</Option>
                                <Option value="4">已发布</Option>
                                <Option value="5">已下线</Option>
                            </Select>
                        </div>
                        <div className='fr'>
                            <Search
                                placeholder="输入关键字进行搜索"
                                onSearch={value => {this.searchTitle(value)}}
                                style={{ width: 350 }}
                            />
                        </div>
                    </div>
                    {/* 操作栏结束 */}
                    <TableList
                        thead={[{width:'5%',name:' '},{width:'15%',name:'轮播图片'},{width:'35%',name:'标题'},{width:'15%',name:'类型'},{width:'15%',name:'创建时间'},{width:'15%',name:'操作'}]}
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
                                       {handleList(index)}
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