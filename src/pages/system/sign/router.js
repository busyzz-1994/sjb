import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Sign from './sign.js';
import SignDetail from './signDetail.js';
class newsRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/system/sign/:type'  render={(props)=><Sign {...props}  key={props.match.params.type}/>}/>
                    <Route  path='/system/sign/:type/detail'  render={props=><SignDetail {...props} key={props.match.params.type} />}/>
                </Switch>
            </div>
        )
    }
}
export default newsRouter;