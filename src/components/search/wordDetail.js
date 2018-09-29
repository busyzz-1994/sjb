import React,{Component} from 'react';
import _mm from 'util/mm.js';
import { Input , Button ,message,Breadcrumb,Row, Col} from 'antd';
import {withRouter} from 'react-router-dom';
import recommendApi from 'api/search/recommend.js';
import Validate from 'util/validate';
class NewsCategorySave extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            checked:_mm.getParam('checked'),
            id:this.props.match.params.id,
            word:_mm.getParam('name')?_mm.getParam('name'):''
        }
    }
    //判断是添加、查看、还是修改；
    componentDidMount(){
       this.getDetail();
    }
    //判断是添加、查看、还是修改；
    getDetail(){
        let {checked,id} = this.state;
        if(checked === null ){
            //该状态为添加
        }else{
            
        }
    }
    Input(e){
        let name = e.target.name,
            value = e.target.value
        console.log(name)
        this.setState({
            [name]:value
        })
    }
    save(){
       let {checked} = this.state;
       if(checked === null){
           this.addWord()
       }else if(checked == '1'){
           this.updateWord()
       }
    }
    addWord(){
        let msg = this.validate();
        if(msg){
            message.error(msg)
        }else{
            let {word} = this.state;
            recommendApi.addWord({
                type:7,
                name:word
            }).then(res=>{
                message.success('添加成功')
                this.props.history.goBack();
            }).catch(err=>{
                message.error(err)
            })
        }
    }
    updateWord(){
        let msg = this.validate();
        if(msg){
            message.error(msg)
        }else{
            let {word,id} = this.state;
            recommendApi.updateWord({
                name:word,
                id
            }).then(res=>{
                message.success('修改成功！')
                this.props.history.goBack();
            }).catch(err=>{
                message.error(err)
            })
        }
    }
    validate(){
        let {word} = this.state;
        let validate = new Validate();
        validate.add(word,'lengthRange:2:6','请输入2~6个字的词条名称');
        return validate.start();
    }
    render(){
        return (
            <div className='form-container'>
               <div className='form-item'>
                    <Row>
                        <Col span='4'>新闻类型*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='6' onChange = {(e) => this.Input(e)} value={this.state.word} name='word'  placeholder ='请输入2~6个字的词条名称' />
                        </Col>
                    </Row>
                </div>
                {
                    this.state.checked == 0 ? 
                    null:
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
