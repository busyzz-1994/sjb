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
                    <Route exact path='/video/videoEdit/banner' component={Banner}/>
                    <Route path='/video/videoEdit/banner/detail/:id?' component={BannerDetail}/>
                    <Route exact path='/video/videoEdit/type' component={Type}/>
                    <Route path='/video/videoEdit/type/detail/:id?' component={TypeDetail}/>
                    <Route path='/video/videoEdit/type/list/:id?' component={TypeList}/>
                    <Route exact path='/video/videoEdit/file' component={File}/>
                    <Route path='/video/videoEdit/file/detail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;