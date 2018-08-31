import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import {message} from 'antd';
import commonApi from 'api/common.js';
import style from './index.scss';
import uploadImg from 'images/zs2.png';
import _mm from 'util/mm.js';
//传入 getUrl 回调函数获取数据；
class UploadImg extends Component{
    constructor(props){
        super(props)
    }
    upload(e){
        let _this = this;
        let file = e.target.files[0];
        let msg = _mm.checkFile(file,['jpg','jpeg','png','gif'],10);
        if(!msg.status){
            message.error(msg.message);
        }else{
            _mm.fileToBase64(file,function(data){
                commonApi.uploadImg({
                    data:data
                }).then(res=>{
                    _this.props.getUrl(res,_this.props.index);
                }).catch(err=>{
                    message.error(err);
                })
            });
        }
    }
    render(){
        return (
            <div className={style.uploadDiv}>
                 <img src={this.props.imgUrl?this.props.imgUrl:this.props.defaultImgUrl} width={this.props.imgWidth} height={this.props.imgHeight}/>
                 <input type="file" onChange={(e)=>{this.upload(e)}}/>
            </div>
        )
    }
}
UploadImg.defaultProps={
    imgWidth:328,
    imgHeight:140,
    defaultImgUrl:uploadImg,
    index : 0
}
export default UploadImg;