import React,{Component} from 'react';
import { Card ,Select,DatePicker,Col,Row} from 'antd'
import ReactEcharts from 'echarts-for-react';
import api from 'api/home/data.js';
import mm from 'util/mm.js';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';
import style from '../common.scss';
class G5 extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        api.getG5().then(res=>{
            console.log(res);

            let {android,ios} = res[0];
            this.setState({
                data:[
                    {name:'安卓',value:android},
                    {name:'iOS',value:ios}
                ]
            })
        })
    }
    render(){
        let {data} = this.state;
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: ['安卓','iOS'],
                tooltip : {
                    show:true
                }
            },
            series : [
                {
                    name: '系统',
                    type: 'pie',
                    radius: ['30%', '70%'],
                    center: ['30%', '50%'],
                    label:{
                        show:false
                    },
                    data:data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return (
            <div className={style.panelItem}>
                <div className={style.panelTitle}>手机系统分布</div>
                <div className={style.panelBody}>
                    <Row>
                        <ReactEcharts
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{height:'300px'}}
                        />
                    </Row>    
                </div>
            </div>
        )
    }
}
export default G5;