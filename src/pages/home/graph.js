import React,{Component} from 'react';
import './index.scss';
import style from './index.scss';
import {Col,Row} from 'antd';
// import WillOpenImg from 'images/willOpen.png';
import G1 from 'components/home/graph/G1.js';
import G2 from 'components/home/graph/G2.js';
import G3 from 'components/home/graph/G3.js';
import G4 from 'components/home/graph/G4.js';
import G5 from 'components/home/graph/G5.js';
import G6 from 'components/home/graph/G6.js';
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
                            <G1/>
                        </div>
                        <div className={style.item}>
                            <G3/>
                        </div>
                        <div className={style.item}>
                            <G5/>
                        </div>
                    </Col>
                    <Col span={12} >
                        <div className={style.item}>
                            <G2/>
                        </div>
                        <div className={style.item}>
                            <G4/>
                        </div>
                        <div className={style.item}>
                            <G6/>
                        </div>
                    </Col>
                </Row>
            </div>
		)
	}
}
export default Data;
