import React,{Component} from 'react';
import './index.scss';
import style from './index.scss';
import {Col,Row} from 'antd';
// import WillOpenImg from 'images/willOpen.png';
import N1 from 'components/home/data/N1.js';
import N2 from 'components/home/data/N2.js';
import N3 from 'components/home/data/N3.js';
import N4 from 'components/home/data/N4.js';
import N5 from 'components/home/data/N5.js';
import N6 from 'components/home/data/N6.js';
class Data extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
            <div className={style.panel}>
                <Row gutter={16}>
                    <Col span={12} >
                        <div className={style.item}>
                            <N1/>
                        </div>
                        <div className={style.item}>
                            <N3/>
                        </div>
                    </Col>
                    <Col span={12} >
                        <div  className={style.item} >
                            <N2/>
                        </div>
                        <div  className={style.item} >
                            <N4/>
                        </div>
                    </Col>
                </Row>
                <div className={style.item}>
                    <N5/>
                </div>
                <div className={style.item}>
                    <N6/>
                </div>
            </div>
		)
	}
}
export default Data;
