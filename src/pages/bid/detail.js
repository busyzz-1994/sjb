import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Switch} from 'antd';
import userApi from 'api/user.js';
import moreApi from 'api/more.js';
import './detail.scss';
import Title from 'components/title';
class BidDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            bidAuthSummary:[],
            bidCompany:{}
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        userApi.getBidDetail(this.state.id).then(res=>{
            console.log(res)
            this.setState(res)
            this.fillAddress(res.bidCompany.companyAddr)
        })
    }
    fillAddress(str){
        let arr = str.split('/');
        let provinceCode = arr[0],
            cityCode     = arr[1],
            areaCode     = arr[2],
            street       = arr[3],
            address      = ''
        moreApi.getNameByCode(provinceCode,(name)=>{
            address+=name;
            moreApi.getNameByCode(cityCode,(name)=>{
                address+=name;
                moreApi.getNameByCode(areaCode,(name)=>{
                    address+=name;
                    address +=street;
                    this.state.bidCompany.companyAddr = address;
                    this.setState({
                        bidCompany:this.state.bidCompany
                    })
                })
            })
        })
        
    }
    Switch(status,index,id){
        this.state.bidAuthSummary[index].bidAuth.userStatus = status;
        userApi.updateBidAccountStatus({id:id,state:status}).then(res=>{
            this.setState({
                bidAuthSummary:this.state.bidAuthSummary
            })
        })
        
    }
    render(){
        const {bidCompany,bidAuthSummary} = this.state;
        return (
            <div>
                <Title title='投标机构详情' />
                <table className='table table-bordered bidDetail-table'>
                    <tbody>
                        <tr>
                            <th colSpan='4'>投标机构详情</th>
                        </tr>
                        <tr>
                            <td>公司名称</td>
                            <td>
                                <input type="text" defaultValue={bidCompany.company} readOnly className='form-control'/>
                            </td>
                            <td>公司地址</td>
                            <td>
                                <input type="text" defaultValue={bidCompany.companyAddr} readOnly className='form-control'/>
                            </td>
                        </tr>
                        <tr>
                            <td>注册时间</td>
                            <td>
                                <input type="text" defaultValue={bidCompany.registerTime} readOnly className='form-control'/>
                            </td>
                            <td>经营期限</td>
                            <td>
                                <input type="text" defaultValue={bidCompany.operatePeriod === null ? '永久' : bidCompany.operatePeriod} readOnly className='form-control'/>
                            </td>
                        </tr>
                        <tr>
                            <td>法人</td>
                            <td>
                                <input type="text" defaultValue={bidCompany.corporation} readOnly className='form-control'/>
                            </td>
                            <td>信用代码</td>
                            <td>
                                <input type="text" defaultValue={bidCompany.creditCode} readOnly className='form-control'/>
                            </td>
                        </tr>
                        <tr>
                            <td>联系方式</td>
                            <td>
                                <input type="text" defaultValue={bidCompany.fixedPhone} readOnly className='form-control'/>
                            </td>
                            <td>邮箱</td>
                            <td>
                                <input type="text" defaultValue={bidCompany.email} readOnly className='form-control'/>
                            </td>
                        </tr>
                        <tr>
                            <td>营业执照</td>
                            <td colSpan='3'>
                                {
                                    bidCompany.businessLicense ? <img src={bidCompany.businessLicense} style={{width:'200px',height:'400px'}}/> :<span>暂无上传营业执照</span>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='table table-bordered account-list'>
                    <thead>
                        <tr>
                            <th style={{textAlign:'left'}} colSpan='8'>
                                <span>登录账户</span>
                            </th>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <th>公司</th>
                            <th>身份证号码</th>
                            <th>联系方式</th>
                            <th>注册时间</th>
                            <th>账户状态</th>
                            <th>认证状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bidAuthSummary.map((item,index) => {
                                const {bidAuth,bidAuthVerify} = item;
                                let verifyStatus,
                                    handle;
                                switch(bidAuthVerify.verifyStatus){
                                    case 0 :
                                    verifyStatus = '未审核';
                                    handle = <Link to={`/bid/audit/${bidAuthVerify.uid}`}>去审核</Link>
                                    break;
                                    case 1 :
                                    verifyStatus = '待审核';
                                    handle = <Link  to={`/bid/audit/${bidAuthVerify.uid}`} >去审核</Link>
                                    break;
                                    case 2 :
                                    verifyStatus = '审核成功';
                                    handle = <Link to={{
                                                pathname:`/bid/audit/${bidAuthVerify.uid}`,
                                                search:'?check=true'
                                            }}>查看</Link>
                                    break;
                                    case 3 :
                                    verifyStatus = '审核失败';
                                    handle = <Link to={{
                                            pathname:`/bid/audit/${bidAuthVerify.uid}`,
                                            search:'?check=true'
                                        }}>查看</Link>
                                    break;
                                    default:
                                    verifyStatus = '未知状态';
                                    break;
                                }
                                return (
                                    <tr key={index}>
                                        <td>{bidAuth.name}</td>
                                        <td>{bidAuth.company}</td>
                                        <td>{bidAuth.idcard}</td>
                                        <td>{bidAuth.mobile}</td>
                                        <td>{bidAuth.registerTime}</td>
                                        <td>
                                            <Switch checked={bidAuth.userStatus}
                                            unCheckedChildren='禁用'
                                            checkedChildren='可用'
                                            onChange={(status)=>{this.Switch(status,index,bidAuth.id)}} />
                                        </td>
                                        <td>
                                            {verifyStatus}
                                        </td>
                                        <td>
                                            {handle}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default BidDetail;