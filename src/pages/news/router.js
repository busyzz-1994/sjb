import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import NewsEditRouter from './newsEdit/router.js';
import NewsIssueRouter from './newsIssue/router.js';
import NewsAuditRouter from './newsAudit/router.js';
class newsRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/news/newsEdit' component={NewsEditRouter}/>
                    <Route path='/news/newsIssue' component={NewsIssueRouter} />
                    <Route path='/news/newsAudit' component={NewsAuditRouter} />
                </Switch>
            </div>
        )
    }
}
export default newsRouter;