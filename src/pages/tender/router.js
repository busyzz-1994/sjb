import React,{Component} from 'react';
import TenderDetail from './detail.js';
import { Switch,Route } from 'react-router-dom';
class TenderRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Switch>
                <Route path = '/tender/:id' component={TenderDetail}/>
            </Switch>
        )
    }
}
export default TenderRouter;