import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
// import Banner from './banner.js';
import File from './file.js';
import FileDetail from './fileDetail.js';
import Banner from './banner.js';
import BannerDetail from './bannerDetail.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/discounts/discountsAudit/banner' component={Banner}/>
                    <Route path='/discounts/discountsAudit/banner/detail/:id?' component={BannerDetail}/>
                    <Route exact path='/discounts/discountsAudit/file' component={File}/>
                    <Route exact path='/discounts/discountsAudit/file/fileDetail/:id' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;