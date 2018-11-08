import React,{Component} from 'react';
import _mm from 'util/mm.js';
import { Input , Button ,message,Breadcrumb,Row, Col,Checkbox,Icon } from 'antd';
import {withRouter} from 'react-router-dom';
import config from 'base/config.json';
import ImgUpload from 'components/global/uploadImg';
import newsApi from 'api/news/category.js';
// import style from './index.scss';
// 上传图片文件
import ImgUrl from 'images/upload.png';
//引入选择标签组件
// import SignListComponent from 'components/global/signList';
import SignList from 'components/global/signList/indexNew.js';
const { TextArea } = Input;
class NewsCategorySave extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:_mm.getParam('id'),
            name:'',
            isChecked:false,
            imgUrl:'',
            textArea:'',
            signChecked:false,
            signList:[],
            specialId:this.props.match.params.id
        }
    }
    //判断是添加、查看、还是修改；
    componentDidMount(){
        let {specialId} = this.state;
        if(specialId){
            this.getDetail()
        }
    }
    getDetail(){
        let {specialId} = this.state;
        newsApi.getCategoryDetail({specialId}).then(res=>{
            let {specialName,specialImage,specialDesc,tagList,isShow} = res[0];
            this.setState({
                name:specialName,
                imgUrl:specialImage,
                textArea:specialDesc,
                signList:tagList,
                signChecked:isShow =='0'?false:true
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    //判断是添加、查看、还是修改；
    checkHandle(){
        let categoryId = this.props.match.params.id ;
        if(categoryId === undefined ){
            //该状态为添加
        }else{
            let checked = _mm.getParam('checked');
            if(checked){
                //该状态为查看
                this.setState({
                    isChecked:true
                })
            }
            //发送请求
        }
    }
    
    Input(e){
        let name = e.target.name,
            value = e.target.value
        this.setState({
            [name]:value
        })
    }
    save(){
       this.addFile()
    }
    addFile(){
        let {name,imgUrl,textArea,signChecked,signList,id,specialId} = this.state;
        newsApi.addCategory({
            specialId,
            categoryId:id,
            specialName: name,
            specialImage:imgUrl,
            specialDesc:textArea,
            tagList:signList,
            isShow:signChecked?'1':'0'
        }).then(res=>{
            message.success('保存成功！')
            this.props.history.goBack();
        }).catch(err=>{
            message.error(err);
        })
    }
    getImgUrl(res){
        let url = res[0].attachFilenames;
        this.setState({
            imgUrl:url
        })
    }
   //获取signList
   getSignList(arr){
    this.setState({
        signList:arr
    })
    }
    //获取选中状态
    getChecked(value){
        this.setState({
            signChecked:value
        })
    }
    render(){
        let { signList ,signChecked } = this.state;
        
        return (
            <div>
               <div className='form-item'>
                    <Row>
                        <Col span='4'>专题名称*</Col>
                        <Col offset='1' span='12'>
                        <Input maxLength='10' name='name' onChange = {(e) => this.Input(e)} value={this.state.name}   placeholder ='请输入2~10个字的专题名称' />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>专题图片*</Col>
                        <Col offset='1' span='12'>
                            <ImgUpload
                             aspectRatio = {280 / 120}
                            defaultImgUrl={ImgUrl} 
                            imgUrl={this.state.imgUrl? config.server +this.state.imgUrl:'' }
                            imgWidth ={280}
                            imgHeight = {120}
                            getUrl = {(res)=>{this.getImgUrl(res)}}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>专题导读*</Col>
                        <Col offset='1' span='12'>
                            <TextArea name='textArea' onChange = {(e) => this.Input(e)} value={this.state.textArea} rows={5} placeholder='请输入不超过300个字的专题导读' />
                        </Col>
                    </Row>
                </div>
                <SignList
                    signList = {signList}
                    checked = {signChecked}
                    getList = {(list)=>this.getSignList(list)}
                    getStatus = {(val)=>this.getChecked(val)}
                />
                {
                    this.state.isChecked ? 
                    null :
                    <div className='form-item btn-item'>
                        <Row>
                            <Col offset='5' span='10'>
                                <Button onClick={()=>{this.save()}} type='primary' size='large'>保存</Button>
                                <Button onClick={()=>{this.props.history.goBack()}} size='large'>取消</Button>
                            </Col>
                        </Row>
                    </div> 
                }
            </div>
        )
    }
}
export default withRouter(NewsCategorySave);
