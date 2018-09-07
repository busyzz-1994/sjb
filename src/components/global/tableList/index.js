import React,{Component} from 'react';
// import { NavLink } from 'react-router-dom';
import style from './index.scss';
//实例
{/* <TableList
    thead={[{width:'5%',name:' '},{width:'15%',name:'轮播图片'},{width:'35%',name:'标题'},{width:'15%',name:'类型'},{width:'15%',name:'创建时间'},{width:'15%',name:'操作'}]}
>
    {this.state.dataList.map((item,index)=>{
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <img src={config.server+item.titleImg} width='80%' height='80%'/>
                </td>
                <td>{item.title}</td>
                <td>{item.type == '0' ? '外链':'内链'}</td>
                <td>{item.createTime}</td>
                <td>操作</td>
            </tr>
        )
    })}
</TableList> */}
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
                return(
                    <th key={index} width={item.width} >{item.name}</th>
                )
            }
        })
         // 列表内容
         let listBody = this.props.children;
         // 列表的信息
         let listInfo = (
             <tr>
                 <td colSpan={this.props.thead.length} style={{textAlign:'center'}}>
                     {this.state.isFirstLoading ? '正在加载数据...' : '没有找到相应的结果~'}</td>
             </tr>
         );
         let tableBody = listBody ? listBody : listInfo;
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