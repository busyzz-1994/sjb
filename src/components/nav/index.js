import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import style from  './index.scss';
import menuCon from 'config/menuConfig.js';
import mapPathToNav from './mapPathToNav.js';
import _mm from 'util/mm.js';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuTreeNode:[],
            openKeys:['/news'],
            selectedKeys:['/news/newsEdit'],
            firstRender:true
        }
    }
    componentDidMount(){
        let menuTreeNode = this.renderMenu(this.getMenuConfig());
        this.setState({menuTreeNode});
        this.getHash();
    }
    processKey(key){
        let keyList = key.split('/');
        // console.log(keyList)
        keyList.pop();
        let openKey = keyList.join('/');
        openKey = openKey ? openKey :'/'
        return openKey;
    }
    //菜单渲染
    renderMenu(menuCon){
        return menuCon.map((item)=>{
            if(item.children){
                return (<SubMenu onTitleClick = {(e)=>{this.subClick(e)}}  key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} >
                    {this.renderMenu(item.children)}
                </SubMenu>)
            }else{
                return (
                    <Menu.Item key={this.processKey(item.key)}>
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
    getMenuConfig(){
        let userInfo = _mm.getStorage('userInfo');
        if(!userInfo){
            return menuCon;
        }else{
            let userInfo = JSON.parse(_mm.getStorage('userInfo'));
            let isAdmin = userInfo.isAdmin;
            let sjbPermissions = userInfo.sjbPermissions;
            let menuConfig  = isAdmin == 0 ? menuCon : sjbPermissions ;
            return menuConfig;
        }
    }
    subClick(e){
        let openKeys = e.key;
        this.setState({
            openKeys:[openKeys]
        })
    }
    changeBar(e){
        let openKeys = e.keyPath[1],
        selectedKeys = e.keyPath[0];
        this.setState({
            openKeys:[openKeys],
            selectedKeys:[selectedKeys]
        })
    }
    getHash(){
        let setS = (keys)=>{
            this.setState({
                openKeys:keys[0],
                selectedKeys:keys[1]
            })
        }
        window.onhashchange = function(e){
            let hash = window.location.hash.substring(1);
            let key = mapPathToNav(hash);
            setS(key)
        }
        let hash = window.location.hash.substring(1);
        mapPathToNav(hash);
        let key = mapPathToNav(hash);
        setS(key)
    }
    render() {
        let {selectedKeys,openKeys} = this.state;
        return (
            <div className={style.navContainer}>
                <Menu
                    onClick={(e)=>{this.changeBar(e)}}
                    openKeys = {openKeys}
                    selectedKeys = {selectedKeys}
                    style={{ width: 256 }}
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