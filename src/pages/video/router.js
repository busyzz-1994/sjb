import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import VideoEditRouter from './videoEdit/router.js';
import VideoAuthRouter from './videoAuth/router.js';
import VideoIssueRouter from './videoIssue/router.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/video/videoEdit' component={VideoEditRouter}/>
                    <Route path='/video/videoAudit' component={VideoAuthRouter}/>
                    <Route path='/video/videoIssue' component={VideoIssueRouter}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;