import React,{Component} from 'react';
import {Col,Row,Input,Select,Checkbox,Radio,Button,Icon} from 'antd';
import defaultImg from 'images/newsas.png';
import ImgUpload from 'components/global/uploadImg';
import config from 'base/config.json';
import SignList from 'components/global/signList/indexNew.js';
// import Editor from 'components/global/editor';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
class Picture extends Component{
    constructor(props){
        super(props)
    }
    //修改新闻缩略图
    // changeImg(e){
    //     let value = e.target.value;
    //     this.props.getImg(value)
    // }
    //获取上传图片后的url
    getUrl(data){
        let url =data[0].attachFilenames;
        this.props.getImg(url)
    }
    //获取sign列表
    getSignList(arr){
        this.props.getSignList(arr)
    }
    //获取sign状态
    getSignStatus(status){
        this.props.getTpSignChecked(status)
    }
    //获取图片描述的图片
    getListUrl(data,index){
        let imgUrl =data[0].attachFilenames;
        this.props.tpImgList[index].imgUrl = imgUrl;
        this.props.getTpImgList(this.props.tpImgList)
    }
    //获取图片描述内容
    getListDesc(e,index){
        let val = e.target.value;
        this.props.tpImgList[index].desc = val;
        this.props.getTpImgList(this.props.tpImgList);
        
    }
    //删除图片列表
    delList(index){
        this.props.tpImgList.splice(index,1);
        this.props.getTpImgList(this.props.tpImgList);
    }
    //添加图片列表
    addList(){
        this.props.tpImgList.push({imgUrl:'',desc:''});
        this.props.getTpImgList(this.props.tpImgList);
    }
    render(){
        let {tpSignList,tpImg,tpImgList,tpSignChecked} = this.props;
        console.log(tpImgList)
        return (
            <div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>封面图*</Col>
                        <Col offset='1' span='12'>
                            <ImgUpload imgWidth={160} imgUrl={tpImg?config.server+tpImg:''}  imgHeight={140} defaultImgUrl={defaultImg} getUrl = {(data,index)=>this.getUrl(data,index)} />
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
                <SignList
                    signList = {tpSignList}
                    checked = {tpSignChecked}
                    getList = {(list)=>this.getSignList(list)}
                    getStatus = {(val)=>this.getSignStatus(val)}
                />
                {/* <SignList signList={tpSignList} checked={tpSignChecked} 
                    getList = {(arr)=>this.getSignList(arr)}
                    getStatus = {(status) => this.getSignStatus(status)}
                /> */}
               <div className='form-item'>
                    <Row>
                        <Col span='4'>图片及描述*</Col>
                        <Col offset='1' span='19'>
                            <div style={{marginBottom:'10px'}}>
                                <Button onClick={()=>{this.addList()}}>添加</Button>
                            </div>
                            {
                                tpImgList.map((item,index)=>{
                                    return (
                                        <div key={index} className='clearfix'>
                                            <div className='fl'>
                                                <ImgUpload imgWidth={160} imgUrl={item.imgUrl?config.server+ item.imgUrl:''} index={index} imgHeight={140} defaultImgUrl={defaultImg} getUrl = {(data,index)=>this.getListUrl(data,index)} />
                                            </div>
                                            <div className='fl' style={{width:'400px',height:'140px',marginLeft:'20px',marginRight:'10px'}}>
                                                <TextArea onChange={(e)=>{this.getListDesc(e,index)}} value={item.desc} style={{width:'100%',height:'100%',display:'block'}}   />
                                            </div>
                                            <div className='fl' onClick={index=>this.delList(index)}>
                                                <Icon type="close-circle" style={{cursor:'pointer'}} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                    </Row>
               </div>
            </div>
        )
    }
}
export default Picture;