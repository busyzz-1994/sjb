import React,{Component} from 'react';
import {Button,message} from 'antd';
import {withRouter} from 'react-router-dom';
import userApi from 'api/user.js';
import _mm from 'util/mm.js';
import Title from 'components/title';
class BidAudit extends Component{
    constructor(props){
        super(props)
        this.state = {
            uid:this.props.match.params.uid,
            bidAuth:{},
            bidAuthVerify:{},
            verifyStatus:2,
            verifyText:'',
            //为true代表可以操作
            handleShow:true
        }
    }
    componentWillMount(){
        let check = _mm.getParam('check');
        if(check){
            this.setState({
                handleShow:false
            })
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        userApi.getUserAccount(this.state.uid).then(res=>{
            this.setState(res);
        })
    }
    selectStatus(e){
        this.setState({
            verifyStatus:e.target.value
        })
    }
    handleText(e){
        this.setState({
            verifyText:e.target.value
        })
    }
    save(){
        let {verifyStatus,verifyText} = this.state;
        let id = this.state.bidAuthVerify.id;
        console.log(verifyStatus)
        userApi.saveAuditResult({id,verifyStatus,verifyText}).then(res=>{
            message.success('审核完成！');
            this.props.history.goBack();
        })
    }
    render(){
        const {bidAuth,bidAuthVerify,handleShow} = this.state;
        let handle = (
            <table className='table table-bordered bidDetail-table'>
                <tbody>
                    <tr>
                        <td>审核</td>
                        <td colSpan='3'>
                            <select onChange={(e)=>{this.selectStatus(e)}} className='form-control' value={this.state.verifyStatus}>
                                <option value="3">审核失败</option>
                                <option value="2">审核成功</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>审核反馈</td>
                        <td colSpan='3'>
                            <textarea value={this.state.verifyText} onChange={(e)=>{this.handleText(e)}} className='form-control' rows="5"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='4' className='text-center'>
                            <Button type="primary" onClick={()=>{this.save()}}>保存</Button>
                        </td>
                    </tr>
                </tbody>
               
            </table>
        )
        let showHandle = handleShow ? handle : null;
        return (
            <div>
                <Title title="账户详情" />
                <table className='table table-bordered bidDetail-table'>
                    <tbody>
                        <tr>
                            <th colSpan='4'>账户详情</th>
                        </tr>
                        <tr>
                            <td>公司名称</td>
                            <td>
                                <input type="text" defaultValue={bidAuth.company} readOnly className='form-control'/>
                            </td>
                            <td>姓名</td>
                            <td>
                                <input type="text" defaultValue={bidAuth.name} readOnly className='form-control'/>
                            </td>
                        </tr>
                        <tr>
                            <td>身份证号</td>
                            <td>
                                <input type="text" defaultValue={bidAuth.idcard} readOnly className='form-control'/>
                            </td>
                            <td>联系电话</td>
                            <td>
                                <input type="text" defaultValue={bidAuth.mobile} readOnly className='form-control'/>
                            </td>
                        </tr>
                        <tr>
                            <td>身份证正面照</td>
                            <td>
                                {bidAuthVerify.userFrontIdCard?<img style={{width:'255px',height:'162px'}} src={bidAuthVerify.userFrontIdCard}></img>:'未上传'}
                            </td>
                            <td>身份证反面照</td>
                            <td>
                                {bidAuthVerify.userBehindIdCard?<img style={{width:'255px',height:'162px'}} src={bidAuthVerify.userBehindIdCard}></img>:'未上传'}
                            </td>
                        </tr>
                        <tr>
                            <td>法人委托书</td>
                            <td colSpan='3'>
                                {bidAuthVerify.proxyLicense?<img style={{width:'255px',height:'162px'}} src={bidAuthVerify.proxyLicense}></img>:'未上传'}  
                            </td>
                        </tr>
                    </tbody>
                </table>
                {showHandle}
            </div>
        )
    }
}
export default withRouter(BidAudit);