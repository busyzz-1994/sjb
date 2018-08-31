import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import DiscountsRouter from './discountsEdit/router.js';

class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/discounts/discountsEdit' component={DiscountsRouter}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;