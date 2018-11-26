import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Banner from './banner.js';
import BannerDetail from './bannerDetail.js';
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
                    <Route exact path='/live/liveIssue/banner' component={Banner}/>
                    <Route path='/live/liveIssue/banner/detail/:id?' component={BannerDetail}/>
                    <Route exact path='/live/liveIssue/type' component={Type}/>
                    <Route path='/live/liveIssue/type/detail/:id?' component={TypeDetail}/>
                    <Route path='/live/liveIssue/type/list/:id?' component={TypeList}/>
                    <Route exact path='/live/liveIssue/file' component={File}/>
                    <Route path='/live/liveIssue/file/detail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;