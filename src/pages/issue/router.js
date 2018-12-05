import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import List from './list.js';
import Detail from './detail.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/issue/list/:type' render={(props)=><List key={props.match.params.type} {...props} />}/>
                    <Route path='/issue/list/:type/:id' render={(props)=><Detail key={props.match.params.type} {...props} />}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;