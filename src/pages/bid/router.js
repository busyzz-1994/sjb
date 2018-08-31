import React,{Component} from 'react';
import { Route ,Switch} from 'react-router-dom';
import BidIndex from './index.js';
import BidDetail from './detail.js';
import BidAudit from './audit.js';
class BidRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Switch>
                <Route exact path='/bid' component={BidIndex} />
                <Route path='/bid/detail/:id' component={BidDetail} />
                <Route path='/bid/audit/:uid' component={BidAudit} />
            </Switch>
        )
    }
}
export default BidRouter;