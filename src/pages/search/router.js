import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import SearchEditRouter from './searchEdit/router.js';
import SearchAuthRouter from './searchAuth/router.js';
import SearchIssueRouter from './searchIssue/router.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/search/searchEdit' component={SearchEditRouter}/>
                    <Route path='/search/searchAuth' component={SearchAuthRouter}/>
                    <Route path='/search/searchIssue' component={SearchIssueRouter}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;