import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Sign from './sign.js';
class newsRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route  path='/system/sign' component={Sign}/>
                </Switch>
            </div>
        )
    }
}
export default newsRouter;