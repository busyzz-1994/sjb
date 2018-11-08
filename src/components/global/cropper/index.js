import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import {message,Modal,Button} from 'antd';
import commonApi from 'api/common.js';
import style from './index.scss';
import {connect} from 'react-redux';
// import uploadImg from 'images/zs2.png';
import _mm from 'util/mm.js';
import {HIDE_MODAL} from 'store/actionCreater.js';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
//传入 getUrl 回调函数获取数据；
class UploadImg extends Component{
    constructor(props){
        super(props)
        this.state = {
            modalShow:true,
            imgBase64:'',
            initBase64:''
        }
    }
    upload(e){
        let _this = this;
        let file = e.target.files[0];
        let msg = _mm.checkFile(file,['jpg','jpeg','png','gif'],10);
        if(!msg.status){
            message.error(msg.message);
        }else{
            _mm.fileToBase64(file,function(data){
                _this.setState({
                    initBase64:data,
                    imgBase64:data
                })
                // commonApi.uploadImg({
                //     data:data
                // }).then(res=>{
                //     _this.props.getUrl(res,_this.props.index);
                // }).catch(err=>{
                //     message.error(err);
                // })
            });
        }
    }
    _crop(){
        let imgBase64 = this.cropper.getCroppedCanvas().toDataURL();
       this.setState({
            imgBase64
       })
    }
    ok(){
        let {imgBase64} = this.state;
        if(!imgBase64){
            message.error('请先选择图片！')
        }else{
            commonApi.uploadImg({
                    data:imgBase64
                }).then(res=>{
                    this.props.callback(res);
                    this.props.cancel();
                    // this.props.getUrl(res,this.props.index);
                    // this.setState({modalShow:false})
                }).catch(err=>{
                    message.error(err);
                })
        }
    }
    render(){
        let {modalShow,imgBase64,initBase64} = this.state;
        let {isShow,cancel} = this.props;
        return (
           <div>
                <Modal
                    title="图片裁剪"
                    visible={isShow}
                    width = '1000px'
                    okText = '确认'
                    cancelText = '取消'
                    onOk = {()=>{this.ok()}}
                    onCancel = {()=>{cancel()}}
                    >
                    <div className={style.uploadDiv} >
                        <Button type='primary'>选择图片</Button>
                        <input type="file" onChange={(e)=>{this.upload(e)}}/>
                    </div>
                     <Cropper
                        ref={cropper => this.cropper = cropper }
                        src={initBase64}
                        style={{height: 400, width: '100%'}}
                        // Cropper.js options
                        aspectRatio={this.props.aspectRatio}
                        viewMode={1}
                        preview = '.test'
                        scalable = {true}
                        zoomable = {true}
                        className = {style.cropper}
                        crop={this._crop.bind(this)} />
                        <div className ='test' style={{width:'300px',height:'200px',overflow:'hidden'}}>

                        </div>
                </Modal>
           </div>
                
        )
    }
}
let mapStateToProps =(state)=>{
    return {
        isShow:state.isShow,
        callback:(res)=>{
            state.fn(res)
        },
        aspectRatio:state.aspectRatio
    }
}
let mapActionsToProps =(dispatch)=>{
    return {
        cancel(){
            dispatch(HIDE_MODAL())
        }
    }
}
UploadImg.defaultProps={
    aspectRatio : 1334 / 750
}
export default connect(mapStateToProps,mapActionsToProps)(UploadImg) ;