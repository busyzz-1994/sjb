import React,{Component} from 'react';
import { Card ,Select,DatePicker,Col,Row} from 'antd'
import ReactEcharts from 'echarts-for-react';
import api from 'api/home/data.js';
import mm from 'util/mm.js';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';
import 'echarts/map/js/china.js'
import chinaMap from 'echarts/map/js/province/xianggang.js';
import style from '../common.scss';
class G1 extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[],
            min:0,
            max:0
        }
    }
    componentDidMount(){
        api.getG3().then(res=>{
            let {provincesData} = res[0];
            console.log(provincesData)
            let arr = [];
            let data = provincesData.map(item=>{
                var obj = {};
                obj.name = item.province;
                // var num = Math.floor(Math.random()*1000);
                var num =item.pv;
                arr.push(num);
                obj.value = num;
                return obj;
            })
            let min = Math.min(...arr),
                max = Math.max(...arr);
            this.setState({
                data,min,max
            })    
            // let {eighteen,fifty,fortyNine,thirtyNine,twentyFour,twentyNine} = res[0];
            // this.setState({data:[eighteen,twentyFour,twentyNine,thirtyNine,fortyNine,fifty]})
        })
    }
    render(){
        let {data,min,max} = this.state;
        var option = {
            title: {
                text: '全国用户分布区域图',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c}人'
            },
            visualMap: {
                min: min,
                max: max,
                text:['最高','最低'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue','yellow', 'orangered']
                }
            },
            series: [
                {
                    name: '全国用户分布区域',
                    type: 'map',
                    roam: true,
                    mapType: 'china', // 自定义扩展图表类型
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:data
                }
            ]
        }
        return (
            <div className={style.panelItem}>
                <div className={style.panelTitle}>全国分布</div>
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
export default G1;