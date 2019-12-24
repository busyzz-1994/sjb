import React,{Component} from 'react';
import { Input , Button ,message,Row, Col,Checkbox,Icon,Radio } from 'antd';
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
//参数必须传入
//1.status  boolean  2-> 通过 1 ->不通过
//2.getStatus -回调函数  获取status 值
//3.detail  string  审核备注
//4.getDetail -回调函数 获取detail值 
class AuditForm extends Component{
    constructor(props){
        super(props)
    }
   
    render(){
        return (
            <div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>审核结果*</Col>
                        <Col offset='1' span='5'>
                            <RadioGroup onChange={(e)=>this.props.getStatus(e.target.value)} value={this.props.status}>
                                <Radio value={2}>通过</Radio>
                                <Radio value={1}>未通过</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                    
                </div>
                <div className='form-item'>
                    <Row>
                        <Col span='4'>审核备注</Col>
                        <Col offset='1' span='12'>
                            <TextArea rows={5} value={this.props.detail} onChange={(e)=>this.props.getDetail(e.target.value)} /> 
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
AuditForm.defaultProps = {
    status:2,
    detail:'',
}
export default AuditForm;
