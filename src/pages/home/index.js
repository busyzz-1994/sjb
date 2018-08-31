import React,{Component} from 'react';
import './index.scss';
import _mm  from 'util/mm.js';
class Home extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
	}
	render(){
		return(
			<div>
				Home
			</div>
		)
	}
}
// const mapStateToProps = (state) =>{
// 	return {
// 		storeName : state.name,
// 		storeAge  : state.age
// 	}
// }
// const mapActionToProps = (dispath,ownState) =>{
// 	return {
// 		change : (component) => {
// 			dispath(CHANGE_NAME(component.name))
// 		}
// 	}
// }
export default Home;
