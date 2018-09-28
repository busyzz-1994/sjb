import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
// import Banner from './banner.js';
import Type from './type.js';
import TypeList from './typeList.js';
import File from './file.js';
import FileDetail from './fileDetail.js';
import typeDetail from './typeDetail.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/discounts/discountsIssue/type' component={Type}/>
                    <Route  path='/discounts/discountsIssue/type/typeList/:id' component={TypeList}/>
                    <Route  path='/discounts/discountsIssue/type/typeDetail/:id?' component={typeDetail}/>
                    <Route exact path='/discounts/discountsIssue/file' component={File}/>
                    <Route  path='/discounts/discountsIssue/file/fileDetail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;