import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Banner from './banner.js';
import BannerDetail from './bannerDetail.js';
// import File from './file.js';
// import FileDetail from './fileDetail.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/video/videoIssue/banner' component={Banner}/>
                    <Route path='/video/videoIssue/banner/detail/:id?' component={BannerDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;