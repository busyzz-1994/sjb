import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import VideoEditRouter from './videoEdit/router.js';

class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/video/videoEdit' component={VideoEditRouter}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;