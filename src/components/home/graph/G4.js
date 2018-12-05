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
import style from '../common.scss';
class G4 extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[],
            xAxisData:[]
        }
    }
    componentDidMount(){
        api.getG4().then(res=>{
            // let {eighteen,fifty,fortyNine,thirtyNine,twentyFour,twentyNine} = res[0];
            // this.setState({data:[eighteen,twentyFour,twentyNine,thirtyNine,fortyNine,fifty]})
            let {cityData} = res[0],
            xAxisData = [];
            let data = cityData.map((item,index)=>{
                let obj = {};
                xAxisData[index] = item.name.length>3?item.name.substring(0,2):item.name;
                obj.name =  item.name.length>3?item.name.substring(0,2):item.name;
                obj.value = item.pv;
                // obj.value = Math.floor(Math.random()*1000)
                return obj;
            })
            this.setState({data,xAxisData})
        })
    }
    render(){
        let {data,xAxisData} = this.state;
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}人",
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            yAxis:{
                type:'value'
            },
            xAxis :{
                type: 'category',
                data: xAxisData
            },
            dataZoom:[
                {
                    type:'slider',
                    show:true,
                    start:0,
                    end:100
                }
            ],
            series : [
                {
                    name: '人数',
                    type: 'bar',
                    barWidth: '40%',
                    data:data,
                    itemStyle: {
                        normal: {
                            color: '#6EADF4'
                        }
                    }
                }
            ]
        };
        return (
            <div className={style.panelItem}>
                <div className={style.panelTitle}>四川省分布</div>
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
export default G4;