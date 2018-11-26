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
                    <Route exact path='/live/liveEdit/banner' component={Banner}/>
                    <Route path='/live/liveEdit/banner/detail/:id?' component={BannerDetail}/>
                    <Route exact path='/live/liveEdit/type' component={Type}/>
                    <Route path='/live/liveEdit/type/detail/:id?' component={TypeDetail}/>
                    <Route path='/live/liveEdit/type/list/:id?' component={TypeList}/>
                    <Route exact path='/live/liveEdit/file' component={File}/>
                    <Route path='/live/liveEdit/file/detail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;