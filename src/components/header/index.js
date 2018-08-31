import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Menu, Icon,Dropdown } from 'antd';
import {Link} from 'react-router-dom';
import _mm from 'util/mm.js';
import Logo from 'images/logo.png';
// import { connect } from 'react-redux';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import style from  './index.scss';
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName:'未登陆'
    }
  }
  componentWillMount(){
    let body = document.documentElement.getElementsByTagName('body')[0];
    let html = document.documentElement;
    html.style.width = html.style.height = body.style.width = app.style.height = 'auto';
    let admin = _mm.getStorage('userInfo');
    admin && ( admin = JSON.parse(admin))
    this.setState({
      userName:admin.name?admin.name:'未登陆'
    })
  }
  logout(){
    _mm.removeStorage('token');
    _mm.removeStorage('userInfo');
    this.props.history.push('/login');
    // location.href = '/login';
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={()=>{this.logout()}} >退出登录 <Icon type="logout"/></a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className = {style.headerContainer}>
        <div className={style.headLogo}>
           <img src={Logo} width='140px' height="49px"/>
        </div>
        <div className={style.headHandle + ' fr'}>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            <Icon type="user"/> {this.state.userName} <Icon type="down" />
          </a>
        </Dropdown>
        </div>
      </div>
    )
  }
}
export default withRouter(Header);