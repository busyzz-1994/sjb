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
                    <Route exact path='/search/searchAuth/recommend/:type?' render={(props)=><Recommend key={props.match.params.type}/>}  />
                    <Route path='/search/searchAuth/recommend/:type?/wordDetail/:id?' render={(props)=><WordDetail key={props.match.params.type}/>} />
                    <Route path='/search/searchAuth/recommend/:type?/fileList/:id?' render={(props)=><FileList key={props.match.params.type}/>} />
                </Switch>
            </div>
        )
    }
}
export default EditRouter;