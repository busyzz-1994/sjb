import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Banner from './banner.js';
import BannerDetail from './bannerDetail.js';
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
                    <Route exact path='/video/videoAudit/banner' component={Banner}/>
                    <Route path='/video/videoAudit/banner/detail/:id?' component={BannerDetail}/>
                    <Route exact path='/video/videoAudit/file' component={File}/>
                    <Route path='/video/videoAudit/file/detail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;