import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Banner from './banner.js';
import BannerDetail from './bannerDetail'
import FileList from './fileList.js';
import FileDetail from './fileDetail.js';
import Type from './type.js';
import TypeList from './typeList.js';
import SpecialList from './specialList.js';
import SpecialDetail from './specialDetail.js';
import SpecialNewsList from './specialNewsList.js';
// import BannerAdd from './bannerAdd.js';
class newsRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/news/newsIssue/banner' component={Banner}/>
                    <Route path='/news/newsIssue/banner/detail/:id' component={BannerDetail}/>
                    <Route exact path='/news/newsIssue/type' component={Type}/>
                    <Route path='/news/newsIssue/type/list/:id?' component={TypeList}/>
                    <Route path='/news/newsIssue/type/specialList/:id?' component={SpecialList}/>
                    <Route path='/news/newsIssue/type/SpecialDetail/:id?' component={SpecialDetail}/>
                    <Route path='/news/newsIssue/type/SpecialNewsList/:id?' component={SpecialNewsList}/>
                    <Route exact path='/news/newsIssue/file' component={FileList}/>
                    <Route exact path='/news/newsIssue/file/fileDetail/:id' component={FileDetail}/>
                    {/* <Route path='/news/newsEdit/banner/add' component={BannerAdd}/> */}
                </Switch>
            </div>
        )
    }
}
export default newsRouter;