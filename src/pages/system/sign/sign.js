import React,{Component} from 'react';
import style from '../common/common.scss';
import NavBar from './common/nav.js';
import TableList from 'components/global/tableList';
import IconHandle from 'components/global/icon';
import {Pagination} from 'antd';
class Sign extends Component{
    constructor(props){
        super(props)
        console.log(Pagination)
        this.state={
            pageNum : 1,
            total : 5,
            pageSize : 10
        }
        //mock数据
        this.data = [
            {
                name:'热门话题'
            },{
                name:'直播'
            }
        ]
    }
    clickDel(index){
        console.log(index);
    }
    changePage(pageNum){
        this.setState({
            pageNum
        })
    }
    render(){
        return (
            <div className={style.container}>
                <NavBar/>
                <div className={style.content}>
                    <TableList
                        thead={[{width:'5%',name:' '},{width:'75%',name:'标签名'},{width:'20%',name:'操作'}]}
                        tdHeight = '56px'
                    >
                        {
                            this.data.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                       <td>{index+1}</td>
                                       <td>
                                           {item.name}
                                       </td>
                                       <td>
                                           <IconHandle type='2' id={index} iconClick={(id)=>this.clickDel(id)} />
                                       </td>
                                    </tr>
                                )
                            })
                        }
                    </TableList>
                    <div className='clearfix'>
                        <div className='fr'>
                            <Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} hideOnSinglePage={false}
                            current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
                            total={this.state.total} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Sign;