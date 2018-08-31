import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import style from '../common/common.scss';
import NavBar from './common/nav.js';
import TableList from 'components/global/tableList';
import IconHandle from 'components/global/icon';
import {Pagination,Row,Col,Input,Select,Button} from 'antd';
const Option = Select.Option;
class Sign extends Component{
    constructor(props){
        super(props)
        this.state = {
            value:0
        }
    }
    select(value){
        this.setState({
            value
        })
    }
    save(){

    }
    render(){
        return (
            <div className={style.container}>
                <NavBar/>
                <div className={style.content}>
                    <div className='form-container'>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>密码修改周期*</Col>
                                <Col offset='1' span='8'>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        optionFilterProp="children"
                                        defaultValue = '无修改周期'
                                        onChange={(value)=>{this.select(value)}}
                                    >
                                        <Option value="0">无修改周期</Option>
                                        <Option value="1">一个月</Option>
                                        <Option value="2">三个月</Option>
                                        <Option value="3">六个月</Option>
                                        <Option value="4">一年</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item'>
                            <Row>
                                <Col span='4'>注释</Col>
                                <Col offset='1' span='12'>
                                    选择密码修改周期并保存后，所有账户将需要在每个周期内修改密码，
                                    周期结束前的最后10天系统将自动在账户登录时提醒修改密码，如果
                                    超过周期时间未修改密码，账号将停用；选择无修改周期则所有账户
                                    不需要修改密码，如果在已设置周期内再次设置修改周期，将以最新
                                    设置周期为准。
                                </Col>
                            </Row>
                        </div>
                        <div className='form-item btn-item'>
                            <Row>
                                <Col offset='5' span='10'>
                                    <Button onClick={()=>{this.save()}} type='primary' size='large'>保存</Button>
                                    <Button onClick={()=>{this.props.history.goBack()}} size='large'>取消</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Sign) ;