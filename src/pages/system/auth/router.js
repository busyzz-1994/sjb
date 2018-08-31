import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Inner from './inner.js';
import InnerDetail from './innerDetail.js';
import Outer from './outer.js';
import OuterDetail from './outerDetail.js'
import Update from './update.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/system/auth/inner' component={Inner}/>
                    <Route path='/system/auth/inner/detail/:id?' component={InnerDetail}/>
                    <Route exact path='/system/auth/outer' component={Outer}/>
                    <Route path='/system/auth/outer/detail/:id?' component={OuterDetail}/>
                    <Route path='/system/auth/update' component={Update}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;