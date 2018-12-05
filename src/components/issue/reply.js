import React,{Component} from 'react';
import {withRouter}  from 'react-router-dom';
import {Input ,Row, Col} from 'antd';
class Reply extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='form-item'>
                <Row>
                    <Col span='4'>视频标题*</Col>
                    <Col offset='1' span='12'>
                        <Input disabled={true} maxLength='30' onChange={(e)=>this.onInput(e)} name='title' />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(Reply);