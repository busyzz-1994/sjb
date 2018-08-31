import React,{Component} from 'react';
import {Col,Row,Input,Select,Checkbox,Radio,Button} from 'antd';
import defaultImg from 'images/newsas.png';
import config from 'base/config.json';
import SignList from 'components/global/signList';
import Editor from 'components/global/editor';
const Option = Select.Option;
class Text extends Component{
    constructor(props){
        super(props)
    }
    //获取sign列表
    getSignList(arr){
        this.props.getWbSignList(arr)
    }
    //获取sign状态
    getSignStatus(status){
        this.props.getSignStatus(status)
    }
    //获取html
    getEditorHtml(htmlString){
        this.props.getDetail(htmlString)
    }
    //设置是否为热门
    setHotChecked(e){
        let status = e.target.checked;
        this.props.getWbHotChecked(status)
    }
    render(){
        let {wbSignList,wbHotChecked,wbDefaultDetail,wbSignChecked} = this.props;
        return (
            <div>
                <SignList signList={wbSignList} checked={wbSignChecked} 
                    getList = {(arr)=>this.getSignList(arr)}
                    getStatus = {(status) => this.getSignStatus(status)}
                />
                <div className='form-item'>
                    <Row>
                        <Col span='4'>热门推荐*</Col>
                        <Col offset='1' span='16'>
                           <Checkbox onChange={(e)=>this.setHotChecked(e)} checked = {wbHotChecked} >
                                显示热门推荐
                           </Checkbox>
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                    <Col span='4'>内容编辑*</Col>
                        <Col offset='1' span='18'>
                           <Editor 
                           defaultDetail = {wbDefaultDetail}
                           getHtml={html => this.getEditorHtml(html)}/>
                        </Col>
                    </Row>
                </div>
               
            </div>
        )
    }
}
export default Text;