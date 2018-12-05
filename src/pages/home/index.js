import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import _mm  from 'util/mm.js';
import NavBar from './nav.js';
import Data from './data.js';
import Graph from './graph.js';
class Home extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div style={{padding:'20px 0'}}>
				<h3 style={{paddingLeft:'50px'}}>数据分析</h3>
				<NavBar/>
				<Switch>
					<Route exact path='/' component = {Data} />
					<Route path='/graph' component = {Graph} />
				</Switch>
			</div>
		)
	}
}
export default Home;
