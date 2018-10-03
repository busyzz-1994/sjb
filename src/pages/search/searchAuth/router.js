import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Recommend from './recommend.js';
import WordDetail from './wordDetail.js';
import FileList from './fileList.js';
class EditRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/search/searchAuth/recommend' component={Recommend}/>
                    <Route path='/search/searchAuth/recommend/wordDetail/:id?' component={WordDetail}/>
                    <Route path='/search/searchAuth/recommend/fileList/:id?' component={FileList}/>
                </Switch>
            </div>
        )
    }
}
export default EditRouter;