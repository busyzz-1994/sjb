import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Input ,Pagination , Button ,Modal ,Form,message } from 'antd';
const Search = Input.Search;
import './index.scss';
import { connect } from 'react-redux';
import userApi from 'api/user.js';
import Validate from 'util/validate';
class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			name : 'busyzz',
			boxShow:false,
			list:[],
			pageNum:1,
			pageSize:10,
			total:10,
			//公司信息modal
			companyInfoModal:false,
			//确认按钮的loading状态
			companyConfirmLoading:false,
			companyErrorMsg:'',
			companyInfo:{
				company:'',
				address:'',
				creditCode:'',
				email:'',
				phone:'',
				name:''
			},
			AccountModal:false,
			AccountModalLoading:false,
			AccountErrorMsg:'',
			addAcount:{
				loginName:'',
				name:'',
				mobile:'',
				idCard:'',
				tenderAgencyId:''
			}
		}
		this.formItemLayout={
            labelCol: {
                xs: { span: 4 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 20 }
            }
        }
	}
	search(value){
		if(value){
			userApi.searchTender(value).then(res=>{
				this.setState({
					list:res
				})
			})
		}else{
			this.loadList();
		}
		
	}
	componentDidMount(){
		this.loadList();
	}
	loadList(){
		let param = {
			pageSize:this.state.pageSize,
			pageNum:this.state.pageNum
		}
		userApi.getTenderList(param).then(res=>{
			this.setState({
				total:res.total,
				list:res.list
			})
		})
	}
	changePage(pageNum){
		this.setState({
			pageNum:pageNum
		},()=>{
			this.loadList();
		})
	}
	handleCompany(e){
		let name = e.target.name;
		let value = e.target.value;
		this.state.companyInfo[name] = value;
		this.setState({
			companyInfo:this.state.companyInfo
		})
	}
	handleAccount(e){
		let name = e.target.name;
		let value = e.target.value;
		this.state.addAcount[name] = value;
		this.setState({
			addAcount:this.state.addAcount
		})
	}
	validateCompany(){
		let validate = new Validate();
		let {company,address,creditCode,email,phone,name} = this.state.companyInfo;
		validate.add(company,'notEmpty','公司名称不能为空！');
		validate.add(address,'notEmpty','公司地址不能为空！');
		validate.add(creditCode,'notEmpty','社会信用代码不能为空！');
		validate.add(email,'isEmail','邮箱格式不正确！');
		validate.add(phone,'isFixedPhone','固定电话号码格式不正确！');
		validate.add(name,'notEmpty','法人名字不能为空！');
		return validate.start();
	}
	addCompany(){
		let msg = this.validateCompany();
		if(msg){
			this.setState({
				companyErrorMsg:msg
			})
		}else{
			this.setState({
				companyConfirmLoading:true
			})
			console.log(this.state.companyInfo)
			userApi.addTender(this.state.companyInfo).then(res=>{
				this.loadList();
				let newAddAcount = Object.assign({},this.state.addAcount,{tenderAgencyId:res.id})
				this.setState({
					companyConfirmLoading:false,
					companyInfoModal:false,
					addAcount:newAddAcount
				},()=>{
					this.confirm()
				})
			}).catch(res=>{
				this.setState({
					companyConfirmLoading:false,
					companyErrorMsg:res
				})
			})
		}
	}
	confirm(){
		Modal.confirm({
			title: '添加账号',
			content: '创建代理机构成功，是否需要为改机构添加账号？',
			okText: '确认',
			cancelText: '取消',
			onOk:()=>{
				this.setState({
					AccountModal:true
				})
			}
		});
	}
	addAccount(){
		let msg = this.validateAccount();
		if(msg){
			this.setState({
                AccountErrorMsg:msg
            })
		}else{
			this.setState({
                AccountModalLoading:true
			})
			console.log(this.state.addAcount)
			userApi.addTenderAccount(this.state.addAcount).then(res=>{
				message.success('添加账户成功！');
				
                this.setState({
                    AccountModal:false,
                    AccountModalLoading:false,
                    addAcount:{
                        loginName:'',
                        name:'',
                        mobile:'',
                        idCard:'',
                        tenderAgencyId:''
					}
					
                })
                // this.getData(this.state.id);
            }).catch(res=>{
                this.setState({
                    AccountErrorMsg:res,
                    AccountModalLoading:false
                })
            })
		}
	}
	validateAccount(){
        let validate = new Validate();
        let {loginName,name,mobile,idCard} = this.state.addAcount;
        validate.add(name,'notEmpty','姓名不能为空！');
        validate.add(loginName,'notEmpty','账户不能为空！');
        validate.add(idCard,'isIDcard','请输入正确的身份证格式！');
        validate.add(mobile,'isPhone','请输入正确的手机号！');
        return validate.start();
    }
	render(){
		const {companyInfoModal,companyConfirmLoading,companyInfo,addAcount} = this.state;
		return(
			<div>
				<div className='clearfix'>
					<div className='search clearfix fl'>
						<Search
							placeholder="输入招标机构关键字"
							onSearch={value => this.search(value)}
							enterButton
						/>
					</div>
					<div className='fr'>
						{/* 添加代理机构 */}
						<Button type="primary" onClick={()=>{this.setState({companyInfoModal:true})}} icon="plus">添加</Button>
						<Modal title="添加代理机构信息"
							visible={companyInfoModal}
							onOk={()=>{this.addCompany()}}
							confirmLoading={companyConfirmLoading}
							onCancel={()=>{this.setState({companyInfoModal:false})}}
							okText = '添加'
							cancelText='取消'
							>
							<Form.Item
							{...this.formItemLayout}
							label="公司名称"
							>
							<Input placeholder='请输入公司名称' value={companyInfo.company} name='company' onChange={(e)=>{this.handleCompany(e)}}/>
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label="公司地址"
								>
								<Input placeholder='请输入公司注册地址' value={companyInfo.address} name='address' onChange={(e)=>{this.handleCompany(e)}}/>
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label="信用代码"
								>
								<Input placeholder='请输入公司统一社会信用代码' maxLength='18' value={companyInfo.creditCode} name='creditCode' onChange={(e)=>{this.handleCompany(e)}}/>
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label="邮箱"
								>
								<Input placeholder='请输入公司邮箱' value={companyInfo.email} name='email' onChange={(e)=>{this.handleCompany(e)}}/>
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label="联系电话"
								>
								<Input placeholder='请输入固定电话，例如：010-77702864' value={companyInfo.phone} name='phone' onChange={(e)=>{this.handleCompany(e)}}/>
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label="法人"
								>
								<Input placeholder='请输入公司法人姓名' value={companyInfo.name} name='name' onChange={(e)=>{this.handleCompany(e)}}/>
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label=""
								>
								<span style={{marginLeft:'81px'}} className='error-message'>{this.state.companyErrorMsg}</span>
							</Form.Item>
						</Modal>
						{/* 添加账户 */}
						<Modal title="添加账户"
							visible={this.state.AccountModal}
							confirmLoading={this.state.AccountModalLoading}
							onCancel = {()=>{this.setState({AccountModal:false})}}
							onOk = {()=>{this.addAccount()}}
							okText='添加'
							cancelText = '取消'
						>
							<Form.Item
								{...this.formItemLayout}
								label="姓名"
								>
							<Input placeholder='请输入注册人真实姓名' value={addAcount.name} name='name' onChange={(e)=>{this.handleAccount(e)}}/>
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label="账户"
								>
							<Input placeholder='请输入注册人登录名' value={addAcount.loginName} name='loginName' onChange={(e)=>{this.handleAccount(e)}} />
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label="身份证"
								>
							<Input placeholder='请输入注册人身份证号码' value={addAcount.idCard} name='idCard' onChange={(e)=>{this.handleAccount(e)}}/>
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label="联系方式"
								>
							<Input placeholder='请输入注册人手机号码' value={addAcount.mobile} name='mobile' onChange={(e)=>{this.handleAccount(e)}} />
							</Form.Item>
							<Form.Item
								{...this.formItemLayout}
								label=""
								>
							<span style={{marginLeft:'81px'}} className='error-message'>{this.state.AccountErrorMsg}</span>
							</Form.Item>
						</Modal>
					</div>
				</div>
				
				<table id='tender-list' className="table table-hover table-striped table-list">
					<thead>
						<tr>
							<th>序号</th>
							<th>公司名称</th>
							<th>公司地址</th>
							<th>创建时间</th>
							<th>信用代码</th>
							<th>邮箱</th>
							<th>联系电话</th>
							<th>法人</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody id='tbody'>
						{
							this.state.list.map((item,index) => {
								return (
									<tr key={item.id}>
										<td>{index+1}</td>
										<td>{item.company}</td>
										<td>{item.address}</td>
										<td>{item.createTime}</td>
										<td>{item.creditCode}</td>
										<td>{item.email}</td>
										<td>{item.phone}</td>
										<td>{item.name}</td>
										<td>
											<Link to={`/tender/${item.id}`}>编辑</Link>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				<Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} hideOnSinglePage={true}
				 current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
				 total={this.state.total} />
			</div>
		)
	}
}

export default connect(null,null)(Home);
