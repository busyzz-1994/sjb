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
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const {RangePicker} = DatePicker;
const Option = Select.Option;
class Loop extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.data)
       var option = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            data: this.props.legendData,
            tooltip : {
                show:true
            }
        },
        series : [
            {
                name: '地区',
                type: 'pie',
                radius: ['30%', '80%'],
                center: ['20%', '50%'],
                label:{
                    show:false
                },
                data:this.props.data,
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
            <div>
                <ReactEcharts
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{height:'200px'}}
                    />
            </div>
        )
    }
}
Loop.defaultProps = {
    color:'#71adf0',
    value:0,
    name:'浏览量(PV)'
}
class N1 extends Component{
    constructor(props){
        super(props)
        this.state = {
            dateType:'0',
            startTime:mm.getDateByTime(Date.now()),
            endTime:mm.getTomorrowDateByTime(Date.now()),
            legendData:[],
            data:[],
            newVisitorCount:0,
            jumpCount:0,
            format:'YYYY-MM-DD'
        }
    }
    selectDataType(value){
        let {format,startTime,endTime} = mm.getTimeAndFormat(value);
        this.setState({
            dateType:value,
            format,startTime,endTime
        },()=>{
            this.loadData();
        })
    }
    selectTime(date,dateString){
        let startTime = dateString[0],
            endTime = dateString[1];
        this.setState({
            startTime,endTime
        })
    }
    confirmTime(data){
        this.loadData();
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        let {startTime,endTime,format} = this.state;
        startTime = mm.mapFormatToDateString(format,startTime);
        endTime = mm.mapFormatToDateString(format,endTime);
        api.getN4({startTime,endTime}).then(res=>{
            console.log('*********************')
            console.log(res)
            let list = res[0].specialData;
            let data = list.map((item)=>{
                let obj = {};
                obj.value = item.pv;
                obj.name = item.name.length>4?item.name.substring(0,2):item.name;
                return obj;
            })
            let legendData = list.map(item=>{
                return item.name.length>4?item.name.substring(0,2):item.name;
            })
            this.setState({legendData,data})
            // let {pv,uv,jumpCount,newVisitorCount} = res[0];
            // this.setState({pv,uv,jumpCount,newVisitorCount})
        })
    }
    render(){
        let {dateType,startTime,endTime,data,legendData,format} = this.state;
        return (
            <div className={style.panelItem}>
                <div className={style.panelTitle}>
                    党政参考
                    <div style={{display:'inline-block'}}>
                        <Select
                            showSearch
                            style={{ width: 50 }}
                            optionFilterProp="children"
                            // defaultValue = {this.state.selectValue}
                            defaultValue = {dateType}
                            onChange={(value)=>{this.selectDataType(value)}}
                        >
                            <Option value="0">日</Option>
                            <Option value="1">月</Option>
                            <Option value="2">年</Option>
                        </Select>
                    </div>
                    <div style={{display:'inline-block',float:'right'}}>
                        <RangePicker locale={locale} showTime={true} allowClear= {false}
                            onChange = {(date,dateString)=>{this.selectTime(date,dateString)}}
                            onOk = {(data,dateString)=>{this.confirmTime(data,dateString)}} 
                            format={format}
                            value = {[moment(`${startTime}`, format),moment(`${endTime}`, format)]}
                            />
                    </div>
                </div>
                <div className={style.panelBody}>
                    <Row>
                        <Loop data={data} legendData = {legendData}  />
                    </Row>    
                </div>
            </div>
        )
    }
}
export default N1;