import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Start from './start.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/advertising/advertisingEdit/start' component={Start}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;