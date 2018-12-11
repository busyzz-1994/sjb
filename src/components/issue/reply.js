import React,{Component} from 'react';
import {withRouter}  from 'react-router-dom';
import {Input ,Row, Col} from 'antd';
const {TextArea} = Input;
/**
 * @params type 0->内容 1->回复
 */
class Reply extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let {type} = this.props;
        return (
            <div className='form-item'>
                <Row>
                    <Col span='4'>{type == 0 ? '内容' : '回复'}</Col>
                    <Col offset='1' span='12'>
                        <TextArea disabled={true} rows={4} />
                        {/* <Input disabled={true} maxLength='30' onChange={(e)=>this.onInput(e)} name='title' /> */}
                    </Col>
                </Row>
            </div>
        )
    }
}
Reply.defaultProps = {
    type:0
}
export default withRouter(Reply);