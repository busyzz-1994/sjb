import React,{Component} from 'react';
import { Card ,Select,DatePicker,Col,Row,message} from 'antd'
import ReactEcharts from 'echarts-for-react';
import api from 'api/home/data.js';
import mm from 'util/mm.js';
import formatUtil from '../format.js';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
// import 'echarts/lib/component/markPoint';
import style from '../common.scss';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const {RangePicker} = DatePicker;
const Option = Select.Option;
class Line extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {xAxisData,check,edit,thessie} = this.props;
        var option = {
            legend: {
                data:['编辑','审核','发布']
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis:{
                type:'value'
            },
            xAxis :{
                type: 'category',
                data: xAxisData
            },
            yAxis : {type:'value'},
            series : [
                {
                    name:'编辑',
                    type:'bar',
                    barWidth: '20%',
                    data:edit,
                    itemStyle: {
                        normal: {
                            color: '#6EADF4'
                        }
                    }
                },
               {
                    name:'审核',
                    type:'bar',
                    barWidth: '20%',
                    data:check,
                    itemStyle: {
                        normal: {
                            color: '#5BF3B5'
                        }
                    }
                },
                 {
                    name:'发布',
                    type:'bar',
                    barWidth: '20%',
                    data:thessie,
                    itemStyle: {
                        normal: {
                            color: '#EBEF98'
                        }
                    }
                },
            ]
        };
        return (
            <div>
                <ReactEcharts
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{height:'300px'}}
                    />
            </div>
        )
    }
}
Line.defaultProps = {
    xAxisData:formatUtil.get7(),
    value:0,
    name:'浏览量(PV)'
}
class N1 extends Component{
    constructor(props){
        super(props)
        this.state = {
            dateType:'0',
            startTime:formatUtil.getFormat(formatUtil.getDayTime(-6),'0'),
            endTime:formatUtil.getFormat(formatUtil.getDayTime(1),'0'),
            newRegister:0,
            register:0,
            format:'YYYY-MM-DD',
            type:'0',
            xAxisData:formatUtil.get7(),
            check:[],
            edit:[],
            thessie:[]
        }
    }
    //选择时间类型
    selectDataType(value){
        let {format,startTime,endTime} = formatUtil.getDefault(value);
        let xAxis = formatUtil.getXAxis(startTime+'',endTime+'',value);
        this.setState({
            dateType:value,
            format,startTime,endTime,xAxisData:xAxis
        },()=>{
            this.loadData();
        })
    }
    //时间选择
    selectTime(date,dateString){
        let startTime = dateString[0],
            endTime = dateString[1];
        this.setState({
            startTime,endTime
        })
    }
    //确认时间选择
    confirmTime(data){
        let {startTime,endTime,dateType} = this.state;
        let res =  formatUtil.checkTime(startTime,endTime,dateType);
        if(!res.result){
            message.error(res.message)
        }else{
            let  xAxis =formatUtil.getXAxis(startTime,endTime,dateType);
            this.setState({
                xAxisData:xAxis
            })
            this.loadData();
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        let {startTime,endTime,format,dateType,xAxisData} = this.state;
        startTime = mm.mapFormatToDateString(format,startTime);
        endTime = mm.mapFormatToDateString(format,endTime);
        api.getN3({startTime,endTime,dateType}).then(res=>{
            let {checkData,editData,thessieData} = res[0];
            let {check,edit,thessie} = formatUtil.getN3Data(xAxisData,checkData,editData,thessieData);
            this.setState({check,edit,thessie})
        })
    }
    render(){
        let {dateType,startTime,endTime,format,type,xAxisData,check,edit,thessie} = this.state;
        return (
            <div className={style.panelItem}>
                <div className={style.panelTitle}>
                    编审发统计
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
                    <div>
                        <Line check={check} edit={edit} thessie={thessie} xAxisData={xAxisData} />
                    </div>
                </div>
            </div>
        )
    }
}
export default N1;