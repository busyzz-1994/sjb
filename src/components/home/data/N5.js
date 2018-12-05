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
        let {startTime,endTime,format,dateType} = this.state;
        startTime = mm.mapFormatToDateString(format,startTime);
        endTime = mm.mapFormatToDateString(format,endTime);
        api.getN5({startTime,endTime,dateType}).then(res=>{
            console.log(res)
            // let {pv,uv,jumpCount,newVisitorCount} = res[0];
            // this.setState({pv,uv,jumpCount,newVisitorCount})
        })
    }
    render(){
        let {dateType,startTime,endTime,pv,uv,jumpCount,newVisitorCount,format} = this.state;
        return (
            <div className={style.panelItem}>
                <div className={style.panelTitle}>
                    热门标签
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
                       <table className={style.mytable}>
                            <thead>
                                <tr>
                                    <td style={{width:'20%'}}>排名</td>
                                    <td style={{width:'20%'}}>1</td>
                                    <td style={{width:'20%'}}>2</td>
                                    <td style={{width:'20%'}}>3</td>
                                    <td style={{width:'20%'}}>4</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>标签</td>
                                    <td>时事</td>
                                    <td>军事</td>
                                    <td>民生</td>
                                    <td>房屋</td>
                                </tr>
                                <tr>
                                    <td>选择量</td>
                                    <td>时事</td>
                                    <td>军事</td>
                                    <td>民生</td>
                                    <td>房屋</td>
                                </tr>
                                <tr>
                                    <td>新增选择量</td>
                                    <td>时事</td>
                                    <td>军事</td>
                                    <td>民生</td>
                                    <td>房屋</td>
                                </tr>
                            </tbody>
                       </table>
                    </Row>    
                </div>
            </div>
        )
    }
}
export default N1;