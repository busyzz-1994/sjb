import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import LiveEditRouter from './liveEdit/router.js';
import LiveAuthRouter from './liveAuth/router.js';
import LiveIssueRouter from './liveIssue/router.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/live/liveEdit' component={LiveEditRouter}/>
                    <Route path='/live/liveAudit' component={LiveAuthRouter}/>
                    <Route path='/live/liveIssue' component={LiveIssueRouter}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;