import React,{Component} from 'react';
import {Col,Row,Input,Select,Checkbox,Radio,Button} from 'antd';
import defaultImg from 'images/newsas.png';
import ImgUpload from 'components/global/uploadImg';
import config from 'base/config.json';
import SignList from 'components/global/signList';
import Editor from 'components/global/editor';
const Option = Select.Option;
const RadioGroup = Radio.Group;
class General extends Component{
    constructor(props){
        super(props)
    }
    //修改新闻缩略图
    changeImg(e){
        let value = e.target.value;
        this.props.getImg(value)
    }
    //获取上传图片后的url
    getSingleUrl(data){

        let url =config.server + data[0].attachFilenames;
        let {singleImg} = this.props;
        singleImg[0] = url;
        this.props.getSingleImg(singleImg)
    }
    //获取三张上传图片的url
    getMoreUrl(data,index){
        let url =config.server + data[0].attachFilenames;
        let {moreImg} = this.props;
        moreImg[index] = url;
        this.props.getMoreImg(moreImg)
        
    }
    //获取sign列表
    getSignList(arr){
        this.props.getSignList(arr)
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
        this.props.getHotChecked(status)
    }
    render(){
        let {moreImg,singleImg,img,signList,signChecked,hotChecked,defaultDetail,detail} = this.props;
        console.log(img)
        let more = moreImg.map((item,index)=>{
            return (
                <div key={index} style={{display:'inline-block',marginRight:'15px'}}>
                    <ImgUpload index={index} imgWidth={160} imgUrl={item}  imgHeight={140} defaultImgUrl={defaultImg} getUrl = {(data,index)=>this.getMoreUrl(data,index)} />
                </div>
            )
        })
        let single = singleImg.map((item,index)=>{
            return (
                <div key={index} style={{display:'inline-block',marginRight:'15px'}}>
                    <ImgUpload  imgWidth={160} imgUrl={item}  imgHeight={140} defaultImgUrl={defaultImg} getUrl = {(data)=>this.getSingleUrl(data)} />
                </div>
            )
        })
        let imgList = img == 1 ? single : more;
        return (
            <div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>新闻缩略图*</Col>
                        <Col offset='1' span='12'>
                            <RadioGroup onChange={(e)=>this.changeImg(e)} value={img}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={2}>三图</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'></Col>
                        <Col offset='1' span='16'>
                            {imgList}
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'></Col>
                        <Col offset='1' span='16'>
                            建议上传尺寸160*140,10-65KB
                        </Col>
                    </Row>
                </div>
                <SignList signList={signList} checked={signChecked} 
                    getList = {(arr)=>this.getSignList(arr)}
                    getStatus = {(status) => this.getSignStatus(status)}
                />
                <div className='form-item'>
                    <Row>
                        <Col span='4'>热门推荐*</Col>
                        <Col offset='1' span='16'>
                           <Checkbox onChange={(e)=>this.setHotChecked(e)} checked = {hotChecked} >
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
                           defaultDetail = {defaultDetail}
                           getHtml={html => this.getEditorHtml(html)}/>
                        </Col>
                    </Row>
                </div>
               
            </div>
        )
    }
}
export default General;