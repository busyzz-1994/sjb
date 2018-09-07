import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
// import Banner from './banner.js';
import File from './file.js';
import FileDetail from './fileDetail.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/discounts/discountsAudit/file' component={File}/>
                    <Route exact path='/discounts/discountsAudit/file/fileDetail/:id' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;