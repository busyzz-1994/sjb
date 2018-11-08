import React,{Component} from 'react';
import { Input , Button ,message,Row, Col,Checkbox,Icon,Radio } from 'antd';
import defaultImg from 'images/newsas.png';
import upload_2 from 'images/upload_2.png';
import addImg from 'images/add.png';
import ImgUpload from 'components/global/uploadImg';
import config from 'base/config.json';
//参数必须传入
//1.fwImgList 数组 ['','']  元素为img 地址
//2.getImgList 回调函数 获取新的数组
class imgList extends Component{
    constructor(props){
        super(props)
    }
    //添加图片
    delImgList(index){
        let {fwImgList} = this.props;
        fwImgList.splice(index,1);
        this.props.getImgList(fwImgList)
    }
    //删除图片
    addImgList(){
        let {fwImgList} = this.props;
        if(fwImgList.length>=20){
            message.warning('最多上传20张缩略图！')
        }else{
            fwImgList.push('');
            this.props.getImgList(fwImgList)
        }
    }
    //设置服务图片
    getFwUrl(data,index){
        let {fwImgList} = this.props;
        let url = data[0].attachFilenames;
        fwImgList[index] = url;
        this.props.getImgList(fwImgList)
    }
    render(){
        let {fwImgList} = this.props;
        return (
            <div>
                {fwImgList.map((item,index)=>{
                    return (
                        <div key={index} style={{display:'inline-block',marginRight:'10px',position:'relative'}}>
                            <ImgUpload aspectRatio={750/320}  index={index} imgWidth={200} imgUrl={item?config.server + item:''}  imgHeight={80} defaultImgUrl={upload_2} getUrl = {(data,index)=>this.getFwUrl(data,index)} />
                            <Icon type="close-circle" onClick={()=>this.delImgList(index)} style={{position:'absolute',right:'-8px',top:'-5px',cursor:'pointer'}} />
                        </div>
                    )
                })}
                <div style={{display:'inline-block',marginRight:'10px'}}>
                    <div style={{position:'relative',display:'inline-block'}}>
                        <img onClick={()=> this.addImgList()} src={addImg} style={{display:'block',cursor:'pointer'}} width={200} height={80} alt="添加图片"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default imgList;