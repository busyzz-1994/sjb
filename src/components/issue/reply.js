import React,{Component} from 'react';
import {withRouter}  from 'react-router-dom';
import {Input ,Row, Col,Button,message} from 'antd';
const {TextArea} = Input;
import api from 'api/issue/index.js';
/**
 * @params type 0->内容 1->回复
 */
class Reply extends Component {
    constructor(props){
        super(props)
    }
    repeal(id){
        let {fn} = this.props;
        api.repeal({id,isShow:'0'}).then(res=>{
            fn();
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        let {type,content,isShow,id} = this.props;
        return (
            <div className='form-item'>
                <Row>
                    <Col span='4'>{type === '0' ? '内容' : '回复'}</Col>
                    <Col offset='1' span='18'>
                        <Row>
                            <Col span='16'>
                                <TextArea value={content} disabled={true} rows={4} />
                            </Col>
                            {
                                type === '0' ? null : 
                                <div>
                                    {
                                        isShow === '1' ? <Col  offset='1' span='2'>
                                                            <Button onClick={()=>{this.repeal(id)}}>撤销回复</Button>
                                                        </Col>
                                        : <Col  offset='1' span='4'>
                                                <span style={{color:'#f00'}}>回复已撤销</span>
                                        </Col>
                                    }
                                </div>
                            }
                        </Row> 
                        {/* <Input disabled={true} maxLength='30' onChange={(e)=>this.onInput(e)} name='title' /> */}
                    </Col>
                </Row>
            </div>
        )
    }
}
Reply.defaultProps = {
    type:'0',
    content:'',
    isShow:'1'
}
export default withRouter(Reply);