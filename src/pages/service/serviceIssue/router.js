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
                    <Route exact path='/service/serviceIssue/banner' component={Banner}/>
                    <Route path='/service/serviceIssue/banner/detail/:id?' component={BannerDetail}/>
                    <Route exact path='/service/serviceIssue/type' component={Type}/>
                    <Route path='/service/serviceIssue/type/detail/:id?' component={TypeDetail}/>
                    <Route path='/service/serviceIssue/type/list/:id?' component={TypeList}/>
                    {/* <Route path='/service/serviceEdit/type' component={Type}/> */}
                    <Route exact path='/service/serviceIssue/file' component={File}/>
                    <Route path='/service/serviceIssue/file/detail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;