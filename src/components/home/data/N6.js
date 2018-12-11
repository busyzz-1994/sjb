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
import self from './N6.scss';
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
            format:'YYYY-MM-DD',
            arData:[],
            indexData:[],
            lifeData:[],
            liveData:[]
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
        api.getN6({startTime,endTime}).then(res=>{
            let {arData,indexData,lifeData,liveData} = res[0];
            console.log(res[0])
            this.setState({arData,indexData,lifeData,liveData})
            // let {modelData} = res[0];
            // console.log(modelData);
            // this.setState({list:arr})
            // let {pv,uv,jumpCount,newVisitorCount} = res[0];
            // this.setState({pv,uv,jumpCount,newVisitorCount})
        })
    }
    render(){
        let {dateType,startTime,endTime,format,arData,indexData,lifeData,liveData} = this.state;
        // let tableLength = list.length + 1;
        return (
            <div className={style.panelItem}>
                <div className={style.panelTitle}>
                    模块报表数据
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
                       <table className={style.mytable+' ' + self.modelTable}>
                            <thead>
                                <tr>
                                    <td>一级模块</td>
                                    <td>二级模块</td>
                                    <td>浏览量</td>
                                    <td>评论量</td>
                                    <td>下线内容量</td>
                                    <td>上线内容量</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td  rowSpan={indexData.length?indexData.length+1:indexData.length+2} >首页</td>
                                </tr>
                                {   indexData.length?
                                    indexData.map((item,index)=>{
                                        return (
                                            <tr key={index} >
                                                <td>{item.name}</td>
                                                <td>{item.pv}</td>
                                                <td>{item.commentCount}</td>
                                                <td>{item.outlineCount}</td>
                                                <td>{item.onlineCount}</td>
                                            </tr>
                                        )
                                    }):
                                    <tr>
                                        <td>暂无数据</td>
                                    </tr>
                                }
                                <tr>
                                    <td  rowSpan={lifeData.length?lifeData.length+1:lifeData.length+2} >生活</td>
                                </tr>
                                {   lifeData.length?
                                    lifeData.map((item,index)=>{
                                        return (
                                            <tr key={index} >
                                                <td>{item.name}</td>
                                                <td>{item.pv}</td>
                                                <td>{item.commentCount}</td>
                                                <td>{item.outlineCount}</td>
                                                <td>{item.onlineCount}</td>
                                            </tr>
                                        )
                                    }):
                                    <tr>
                                        <td>暂无数据</td>
                                    </tr>
                                }
                                <tr>
                                    <td  rowSpan={liveData.length?liveData.length+1:liveData.length+2} >媒体</td>
                                </tr>
                                {   liveData.length?
                                    liveData.map((item,index)=>{
                                        return (
                                            <tr key={index} >
                                                <td>{item.name}</td>
                                                <td>{item.pv}</td>
                                                <td>{item.commentCount}</td>
                                                <td>{item.outlineCount}</td>
                                                <td>{item.onlineCount}</td>
                                            </tr>
                                        )
                                    }):
                                    <tr>
                                        <td>暂无数据</td>
                                    </tr>
                                }
                                <tr>
                                    <td  rowSpan={arData.length?arData.length+1:arData.length+2} >AR</td>
                                </tr>
                                {   arData.length?
                                    arData.map((item,index)=>{
                                        return (
                                            <tr key={index} >
                                                <td>{item.name}</td>
                                                <td>{item.pv}</td>
                                                <td>{item.commentCount}</td>
                                                <td>{item.outlineCount}</td>
                                                <td>{item.onlineCount}</td>
                                            </tr>
                                        )
                                    }):
                                    <tr>
                                        <td>暂无数据</td>
                                    </tr>
                                }
                            </tbody>
                       </table>
                    </Row>    
                </div>
            </div>
        )
    }
}
export default N1;