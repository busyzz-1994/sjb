import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Banner from './banner.js';
import BannerDetail from './bannerDetail.js';
// import BannerAdd from './bannerAdd.js';
class newsRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/news/newsAudit/banner' component={Banner}/>
                    <Route exact path='/news/newsAudit/banner/detail/:id?' component={BannerDetail}/>
                    {/* <Route path='/news/newsEdit/banner/add' component={BannerAdd}/> */}
                </Switch>
            </div>
        )
    }
}
export default newsRouter;