import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Banner from './banner.js';
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
                    <Route path='/video/videoEdit/banner' component={Banner}/>
                    <Route exact path='/video/videoEdit/file' component={File}/>
                    <Route path='/video/videoEdit/file/fileDetail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;