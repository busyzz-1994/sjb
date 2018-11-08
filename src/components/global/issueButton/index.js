import React,{Component} from 'react';
import {  Button ,message} from 'antd';
import commonApi from 'api/common.js';
//参数必须传入
//type 发布的类型
//  NEWS="0";// – 新闻
//  BUSINESS="1";//1 – 商家
//  PRODUCTS="2";//2 – 商品
//  LIVES="3";//3 – 直播
//  VIDEOS="4";//4 – 视频
//  MUSICES="5";//5 – 音乐
//  adv="6";//6 – 广告
//  BANNER="9";//9 – bannner
//  TYPE="10";//10 – type
//  SERACH="11";//11 – 搜索
//dataList
//callback 刷新页面
class IssueButton extends Component{
    constructor(props){
        super(props)
    }
    issue(){
        let {dataList} = this.props;
        if(dataList.length){
            let data = {};
            let mapTypeToId = {
                '4':'videoId',
                '6':'advId'
            }
            data.type = this.props.type;
            data.ids = dataList.map(item=>{
                return item[mapTypeToId[this.props.type]?mapTypeToId[this.props.type]:'id']
            })
            commonApi.issueThisPage(data).then(res=>{
                message.success('发布成功！');
                this.props.callback();
            }).catch(err=>{
                message.error(err)
            })
        }else{
            message.error('暂无待发布的内容！')
        }
    }
    render(){
        return (
            <div style={{display:'inline-block',marginLeft:'10px'}}>
                <Button onClick={()=>{this.issue()}} type='primary' >发布本页</Button>
            </div>
        )
    }
}
IssueButton.defaultProps = {
    dataList:[]
}

export default IssueButton;