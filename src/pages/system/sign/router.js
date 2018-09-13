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
                    <Route exact path='/system/sign' component={Sign}/>
                    <Route  path='/system/sign/detail' component={SignDetail}/>
                </Switch>
            </div>
        )
    }
}
export default newsRouter;