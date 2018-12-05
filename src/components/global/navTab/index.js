import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import style from './index.scss';
class navTab extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className={style.container}>
                <ul className='clearfix'>
                    {
                        this.props.navList.map((item,index)=>{
                            return (
                                <li key={index}>
                                     <NavLink exact={this.props.exact} to={item.url} className={style.nav}  activeClassName={style.active}>{item.name}</NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
navTab.defaultProps = {
    exact:false
}
export default navTab;