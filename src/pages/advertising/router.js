import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import AdvertisingEditRouter from './advertisingEdit/router.js';
import AdvertisingAuthRouter from './advertisingAuth/router.js';
import AdvertisingIssueRouter from './advertisingIssue/router.js';

class AdvertisingRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/advertising/advertisingEdit' component={AdvertisingEditRouter}/>
                    <Route path='/advertising/advertisingAuth' component={AdvertisingAuthRouter}/>
                    <Route path='/advertising/advertisingIssue' component={AdvertisingIssueRouter}/>
                </Switch>
            </div>
        )
    }
}
export default AdvertisingRouter;