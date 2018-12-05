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
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}"
            },
            series: [
                {
                    name: this.props.name,
                    type: 'pie',
                    radius: ['75%', '90%'],
                    center: [
                        '50%', '50%'
                    ],
                    hoverAnimation:false,
                    data: [
                        {
                            value: this.props.value,
                            name:this.props.name
                        }
                    ],
                    avoidLabelOverlap: false,
                    color:this.props.color,
                    label: {
                        show:true,
                        position: 'center',
                        formatter:'{b}\n{c}',
                        lineHeight:30,
                        fontSize:13,
                        color:this.props.color
                    }
                   
                }
            ]
        }
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
            pv:0,
            uv:0,
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
        api.getN1({startTime,endTime}).then(res=>{
            let {pv,uv,jumpCount,newVisitorCount} = res[0];
            this.setState({pv,uv,jumpCount,newVisitorCount})
        })
    }
    render(){
        let {dateType,startTime,endTime,pv,uv,jumpCount,newVisitorCount,format} = this.state;
        return (
            <div className={style.panelItem}>
                <div className={style.panelTitle}>
                    浏览统计
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
                        <Col span={6}>
                            <Loop  color='#71adf0' value={pv} name='浏览量(PV)' />
                        </Col>
                        <Col span={6}>
                            <Loop  color='#5cf2b3' value={uv} name='访客数(UV)' />
                        </Col>
                        <Col span={6}>
                            <Loop  color='#ecf097' value={newVisitorCount} name='新增访客数' />
                        </Col>
                        <Col span={6}>
                            <Loop  color='#fba3a2' value={jumpCount} name='跳出次数' />
                        </Col>
                    </Row>    
                </div>
            </div>
        )
    }
}
export default N1;