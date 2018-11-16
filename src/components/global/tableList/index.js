import React,{Component} from 'react';
// import { NavLink } from 'react-router-dom';
import style from './index.scss';
import NullImg from 'images/null.png';
import {Checkbox} from 'antd';
//实例

class tableList extends Component{
    constructor(props){
        super(props)
        this.state={
            isFirstLoading:true
        }
    }
    componentWillReceiveProps(nextProps){
        // 列表只有在第一次挂载的时候，isFirstLoading为true，其他情况为false
        this.setState({
            isFirstLoading : false
        });
    }
    componentDidMount(){
        $('tbody').find('td').css({height:this.props.tdHeight});
    }
    componentDidUpdate(){
        $('tbody').find('td').css({height:this.props.tdHeight});
    }
    render(){
        let thead = this.props.thead.map((item,index)=>{
            let type = typeof item;
            if(type =='string'){
                return (
                    <th key={index}>{item}</th>
                 )
            }else{
                if(item.checked){
                    return (
                        <th style={{textAlign:'center'}} key={index}><Checkbox checked={item.isChecked} onChange={item.checked}/></th>
                    )
                }else{
                    return(
                        <th key={index} width={item.width} >{item.name}</th>
                    )
                }
            }
        })
         // 列表内容
         let listBody = this.props.children;
         // 列表的信息
         let listInfo = (
             <tr>
                 <td colSpan={this.props.thead.length} style={{textAlign:'center'}}>
                     {this.state.isFirstLoading ? '正在加载数据...' : <img style={{display:'inline-block',margin:'10px 0'}} src={NullImg} />}</td>
             </tr>
         );
         let tableBody = listBody.length ? listBody : listInfo;
        return (
            <table className={style.tableList}>
                <thead>
                    <tr>
                        {thead}
                    </tr>
                </thead>
                <tbody ref={tbody => this.tbody = tbody}>
                    {tableBody}
                </tbody>
            </table>
        )
    }
}
tableList.defaultProps={
    tdHeight:'88px'
}
export default tableList;