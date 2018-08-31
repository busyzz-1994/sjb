import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
//banner
import Banner from './banner.js';
import BannerAdd from './bannerAdd.js';
// 新闻类别
import Type from './type.js';
import TypeSave from './typeSave.js';
import TypeList from './typeList.js';
// 专题
import SpecialList from './specialList.js'; 
import SpecialNewsList from './specialNewsList.js';
import SpecialDetail from './specialDetail.js';
//新闻文件
import FileList from './fileList.js';
import FileDetail  from './fileDetail.js';
class newsRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/news/newsEdit/banner' component={Banner}/>
                    <Route path='/news/newsEdit/banner/add/:id?' component={BannerAdd}/>
                    <Route exact path='/news/newsEdit/type' component={Type}/>
                    <Route path='/news/newsEdit/type/save/:id?' component={TypeSave}/>
                    <Route path='/news/newsEdit/type/list' component={TypeList}/>
                    <Route path='/news/newsEdit/type/SpecialList' component={SpecialList}/>
                    <Route path='/news/newsEdit/type/SpecialNewsList' component={SpecialNewsList}/>
                    <Route path='/news/newsEdit/type/SpecialDetail' component={SpecialDetail}/>
                    <Route exact path='/news/newsEdit/file' component={FileList} />
                    <Route  path='/news/newsEdit/file/fileDetail' component={FileDetail} />
                </Switch>
            </div>
        )
    }
}
export default newsRouter;