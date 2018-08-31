import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Banner from './banner.js';
import Type from './type.js';
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
                    <Route path='/service/serviceEdit/banner' component={Banner}/>
                    <Route path='/service/serviceEdit/type' component={Type}/>
                    <Route exact path='/service/serviceEdit/file' component={File}/>
                    <Route path='/service/serviceEdit/file/fileDetail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;