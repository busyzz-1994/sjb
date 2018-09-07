import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
// import Banner from './banner.js';
import Type from './type.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/discounts/discountsIssue/type' component={Type}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;