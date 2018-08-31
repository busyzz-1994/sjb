import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Sign from './sign/router.js';
import Auth from './auth/router.js';
class SystemRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/system/sign' component={Sign}/>
                    <Route path='/system/auth' component={Auth}/>
                </Switch>
            </div>
        )
    }
}
export default SystemRouter;