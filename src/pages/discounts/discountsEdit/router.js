import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
// import Banner from './banner.js';
import Type from './type.js';
import TypeDetail from './typeDetail.js';
import TypeList from './typeList.js';
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
                    <Route exact path='/discounts/discountsEdit/type' component={Type}/>
                    <Route path='/discounts/discountsEdit/type/typeList/:id' component={TypeList}/>
                    <Route path='/discounts/discountsEdit/type/typeDetail/:id?' component={TypeDetail}/>
                    <Route exact path='/discounts/discountsEdit/file' component={File}/>
                    <Route path='/discounts/discountsEdit/file/fileDetail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;