import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Recommend from './recommend.js';
import WordDetail from './wordDetail.js';
import FileList from './fileList.js';
import FileDetail from './fileDetail.js';
class EditRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/search/searchEdit/recommend' component={Recommend}/>
                    <Route path='/search/searchEdit/recommend/wordDetail/:id?' component={WordDetail}/>
                    <Route path='/search/searchEdit/recommend/fileList/:id?' component={FileList}/>
                    <Route path='/search/searchEdit/recommend/fileDetail/:id?' component={FileDetail}/>
                </Switch>
            </div>
        )
    }
}
export default EditRouter;