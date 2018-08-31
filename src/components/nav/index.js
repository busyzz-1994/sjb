import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import style from  './index.scss';
import menuConfig from 'config/menuConfig.js';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuTreeNode:[]
        }
    }
    componentDidMount(){
        let menuTreeNode = this.renderMenu(menuConfig);
        this.setState({menuTreeNode});
    }
    //菜单渲染
    renderMenu(menuConfig){
        return menuConfig.map((item)=>{
            if(item.children){
                return (<SubMenu  key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} >
                    {this.renderMenu(item.children)}
                </SubMenu>)
            }else{
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                        {
                            item.icon ? <span><Icon type={item.icon} />{item.title}</span> : item.title
                        }
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }
    render() {
        return (
            <div className={style.navContainer}>
                <Menu
                    // onClick={this.handleClick.bind(this)}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['/']}
                    defaultOpenKeys={['sub4']}
                    mode="inline"
                    theme="dark"
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}
export default Nav;