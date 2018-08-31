import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
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
class OtherNewsModal extends Component{
    constructor(props){
        super(props)
        this.columns = [{
            title: '标题',
            dataIndex: 'title',
            width: 650,
            key:'标题'
          }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key:'创建时间'
          }];
        this.state={
            pageNum:1,
            total:10,
            pageSize:1,
            //选中的key只是用来实现单选效果的
            selectedRowKeys:[],
            //选中的元素
            selectedItem:[],
            list:[{
                    title:'哈哈哈哈',
                    createTime:'2018-12-26'
                },{
                   title:'ssz',
                   createTime:'2018-12-26' 
                },
                {
                    title:'qzz',
                    createTime:'2018-12-26'
                },{
                   title:'ssz',
                   createTime:'2018-12-26' 
                },
                {
                    title:'qzz',
                    createTime:'2018-12-26'
                },{
                   title:'ssz',
                   createTime:'2018-12-26' 
                },
                {
                    title:'qzz',
                    createTime:'2018-12-26'
                },{
                   title:'ssz',
                   createTime:'2018-12-26' 
                }
            ],
            //当前选中的类别
            activeType:0,
            //当前单选选中的标题
            activeTitle:0
        }
    }
    componentDidMount(){
        let {list} = this.state;
        list.forEach((item,index)=>{
            item.key = index+'ok'
        })
    }
    loadList(){
        let {pageNum,pageSize} = this.state;
        commonApi.getOtherNewsList({
            currPage:pageNum,
            pageSize
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            message.error(err);
        })
    }
    changePage(pageNum){

    }
    //切换关联类型
    changeType(e){
        let  index = e.target.getAttribute('index');
        this.setState({activeType:index});
    }
    //search查询
    search(value){
        console.log(value);
    }
    //选择标题
    chioceTitle(e){
        let index = e.target.getAttribute('index');
        this.setState({
            activeTitle:index
        })
    }
    render(){
        let typeArr = ['新闻','商家','商品','直播','视频','音乐','广告'];
        let {list,selectedRowKeys} = this.state;
        let columns = this.columns;
        let rowSelection = {
            type:'radio',
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
                 <Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} hideOnSinglePage={true}
                    current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
                    total={this.state.total} />
                <div className={style.footerHandle}>
                    <Button onClick={()=>{this.props.ok()}}  type='primary'>确认</Button>
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

export default OtherNewsModal;