import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import ServiceEditRouter from './serviceEdit/router.js';
import ServiceAuthRouter from './serviceAuth/router.js';
import ServiceIssueRouter from './serviceIssue/router.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/service/serviceEdit' component={ServiceEditRouter}/>
                    <Route path='/service/serviceAudit' component={ServiceAuthRouter}/>
                    <Route path='/service/serviceIssue' component={ServiceIssueRouter}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;