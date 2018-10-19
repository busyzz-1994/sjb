import React,{Component} from 'react';
import './index.scss';
import _mm  from 'util/mm.js';
import WillOpenImg from 'images/willOpen.png';
class Home extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
	}
	render(){
		return(
			<div style={{backgroundColor:'#fff',textAlign:'center',padding:'20px 0'}}>
				<img src={WillOpenImg} />
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
