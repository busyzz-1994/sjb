import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import ServiceEditRouter from './serviceEdit/router.js';

class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/service/serviceEdit' component={ServiceEditRouter}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;