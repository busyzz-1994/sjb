import React,{Component} from 'react';
import _mm from 'util/mm.js';
import typeApi from 'api/discounts/type.js';
// import self from './bannerAdd.scss';
import {Link} from 'react-router-dom';
import { Select , Input , Button ,message,Pagination,Breadcrumb,Row, Col} from 'antd';
import { withRouter } from 'react-router-dom';
import Validate from 'util/validate';
class TypeSave extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked:_mm.getParam('checked'),
            name:_mm.getParam('name'),
            type:_mm.getParam('type'),
            id:this.props.match.params.id
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
        let {checked} = this.state;
        let msg = this.validate();
        if(msg){
            message.error(msg);
        }else{
           switch(checked){
               case '1':
               this.update();
               break;
               default:
               this.add();
               break;
           }
        }
    }
    add(){
        let {name,type} = this.state;
        typeApi.addType({name,type}).then(res=>{
            message.success('添加成功！')
            this.props.history.goBack();
        }).catch(res=>{
            message.error(res);
        })

    }
    update(){
        let {id,name} = this.state;
        typeApi.editType({
            id,
            name
        }).then(res=>{
            message.success('修改成功！')
            this.props.history.goBack();
        }).catch(res=>{
            message.error(res);
        })
    }
    validate(){
        let validate = new Validate();
        let {name} = this.state ; 
        validate.add(name,'lengthRange:2:6','商品类型为2-6个字符！');
        return validate.start();
    }
    render(){
        return (
            <div className='form-container'>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>商品类型*</Col>
                        <Col offset='1' span='12'>
                            <Input maxLength='10' name='name' onChange = {(e) => this.Input(e)} value={this.state.name}   placeholder ='请输入2~6个字的商品类型' />
                        </Col>
                    </Row>
                </div>
                {
                    this.state.checked == 0 ? 
                    null
                    : 
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
export default withRouter(TypeSave);