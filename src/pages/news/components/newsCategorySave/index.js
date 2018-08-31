import React,{Component} from 'react';
import _mm from 'util/mm.js';
import { Input , Button ,message,Breadcrumb,Row, Col} from 'antd';
import {withRouter} from 'react-router-dom';
class NewsCategorySave extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            isChecked:false
        }
    }
    //判断是添加、查看、还是修改；
    componentDidMount(){
       this.checkHandle();
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
    Input(value){
        this.setState({
            name:value
        })
    }
    save(){
        console.log(111)
    }
    render(){
        return (
            <div>
               <div className='form-item'>
                    <Row>
                        <Col span='4'>新闻类型</Col>
                        <Col offset='1' span='12'>
                        <Input maxLength='6' onChange = {(e) => this.Input(e.target.value)} value={this.state.name}   placeholder ='请输入2~6个字的新闻类型' />
                        </Col>
                    </Row>
                </div>
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
