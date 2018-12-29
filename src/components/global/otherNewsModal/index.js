import React,{Component} from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import {message,Modal,Pagination,Button,Tabs,Input,Table} from 'antd';
import style from './index.scss';
import _mm from 'util/mm.js';
import commonApi from 'api/common.js';
import TableList from 'components/global/tableList';
//未选中图片
import unSelectImg from 'images/new1.png';
//选中图片
import selectImg from 'images/new2.png';

const TabPane  = Tabs.TabPane;
const Search =Input.Search;
//接收的属性
//1.visible -》 控制modal 的显示与隐藏
//2.ok -》 选择确定的回调
//3.cancel -》 选择取消的回调
//4.callback 点击后的回调函数；
class OtherNewsModal extends Component{
    constructor(props){
        super(props)
        this.columns = [{
            title: '标题',
            dataIndex: 'resourcesName',
            width: 650,
            key:'标题'
          }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key:'创建时间'
          }];
        this.state={
            id:this.props.match.params.id,
            pageNum:1,
            total:10,
            pageSize:12,
            isSearch:false,
            searchValue:'',
            //选中的key只是用来实现单选效果的
            selectedRowKeys:[],
            //选中的元素
            selectedItem:[],
            list:[],
            //当前选中的类别
            activeType:this.props.activeType,
            //当前单选选中的标题
            activeTitle:0
        }
    }
    componentDidMount(){
        // let {list} = this.state;
        // list.forEach((item,index)=>{
        //     item.key = index+'ok'
        // })
        this.loadList();
    }
    loadList(){
        let {pageSize,pageNum,activeType,isSearch,searchValue,id} = this.state;
        if(isSearch){
            commonApi.getModalList({
                currPage:pageNum,
                pageSize,
                id:id?id:'999999',
                type:activeType,
                flag:this.props.flag,
                keyword:searchValue
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
                list.forEach(item=>{
                    let obj = {};
                    obj.newsId = item.id;
                    obj.resourcesType = item.resourcesType;
                    obj.resourcesName = item.resourcesName;
                    obj = JSON.stringify(obj);
                    item.key = obj;
                })
                this.setState({
                    list,
                    total:totalCount
                })
            })
        }else{
            commonApi.getModalList({
                currPage:pageNum,
                pageSize,
                id:id?id:'999999',
                type:activeType,
                flag:this.props.flag
            }).then(res=>{
                let totalCount = res[0].totalCount;
                let list = res[0].lists ;
                list.forEach(item=>{
                    let obj = {};
                    obj.newsId = item.id;
                    obj.resourcesType = item.resourcesType;
                    obj.resourcesName = item.resourcesName;
                    obj = JSON.stringify(obj);
                    item.key = obj;
                })
                this.setState({
                    list,
                    total:totalCount
                })
            })
        }
    }
    changePage(pageNum){
        this.setState({
            pageNum
        },()=>{
            this.loadList();
        })
    }
    //切换关联类型
    changeType(e){
        let canChange = this.props.canChange;
        if(canChange){
            let  index = e.target.getAttribute('index');
            this.setState({activeType:index,isSearch:false,pageNum:1},()=>{this.loadList()});
        }
    }
    //search查询
    search(value){
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
    //选择标题
    chioceTitle(e){
        
        let index = e.target.getAttribute('index');
        this.setState({
            activeTitle:index
        })
    }
    //保存确认
    save(){
        let {selectedRowKeys,id} = this.state;
        selectedRowKeys.forEach((item,index)=>{
            selectedRowKeys[index] = JSON.parse(item)
        })
        this.props.callback(selectedRowKeys,()=>{
            this.setState({
                selectedRowKeys:[]
            })
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
            this.loadList()
        }
    }
    render(){
        let typeArr = this.props.navList?this.props.navList: ['新闻','商家','商品','直播','视频','音乐','广告'];
        let {list,selectedRowKeys} = this.state;
        let columns = this.columns;
        let rowSelection = {
            type:this.props.type,
            selectedRowKeys,
            onChange:(key,record)=>{
                //record 为数组  
                this.setState({
                    selectedRowKeys:key,
                    selectedItem:record
                })
            }
        }
        let head = (
            <div className={style.head}>
                <ul className='clearfix'>
                   {typeArr.map((item,index)=>{
                       return <li 
                       key={index} 
                       index={index} 
                       className={this.state.activeType == index ? style.active :''}
                       onClick={(e)=>{this.changeType(e)}}
                       >{item}</li>
                   })}
                </ul>
                <Search
                    placeholder="输入关键字进行搜索"
                    onSearch={value => this.search(value)}
                    style={{ width: 300 }}
                />
            </div>
        )
        let footer = (
            <div className={style.footer}>
                 <Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} 
                    current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
                    total={this.state.total} />
                <div className={style.footerHandle}>
                    <Button onClick={()=>{this.save()}}  type='primary'>确认</Button>
                    <Button onClick={()=>{this.props.cancel()}}>取消</Button>
                </div>   
            </div>
        )
        return (
           
            <div className={style.otherNewsModal}>
               <Modal title="Title"
                    visible={this.props.visible}
                    width='1100px'
                    footer={footer}
                    title = {head}
                    onCancel = {()=>{this.props.cancel()}}
                    bodyStyle = {{padding:'0 24px'}}
                >
                    <Table rowSelection={rowSelection} rowClassName={style.row} columns={columns} dataSource={list} pagination={false} scroll={{ y: 300 }} />,
                </Modal>
            </div>
        )
    }
}
OtherNewsModal.defaultProps = {
    type:'checkbox',
    activeType:0,
    canChange:true,
    flag:0,
    navList:''
}

export default withRouter(OtherNewsModal) ;