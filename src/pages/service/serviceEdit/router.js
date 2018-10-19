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
                    <Route exact path='/service/serviceEdit/banner' component={Banner}/>
                    <Route path='/service/serviceEdit/banner/detail/:id?' component={BannerDetail}/>
                    <Route exact path='/service/serviceEdit/type' component={Type}/>
                    <Route path='/service/serviceEdit/type/detail/:id?' component={TypeDetail}/>
                    <Route path='/service/serviceEdit/type/list/:id?' component={TypeList}/>
                    {/* <Route path='/service/serviceEdit/type' component={Type}/> */}
                    <Route exact path='/service/serviceEdit/file' component={File}/>
                    <Route path='/service/serviceEdit/file/detail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;