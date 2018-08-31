import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Recommend from './recommend.js';
class EditRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/search/searchIssue/recommend' component={Recommend}/>
                </Switch>
            </div>
        )
    }
}
export default EditRouter;