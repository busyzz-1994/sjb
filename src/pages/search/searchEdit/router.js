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
                    <Route exact path='/search/searchEdit/recommend/:type?' render={(props)=><Recommend key={props.match.params.type}/>}/>
                    <Route path='/search/searchEdit/recommend/:type?/wordDetail/:id?' render={(props)=><WordDetail key={props.match.params.type}/>}/>
                    <Route path='/search/searchEdit/recommend/:type?/fileList/:id?'  render={(props)=><FileList key={props.match.params.type}/>}/>
                    <Route path='/search/searchEdit/recommend/:type?/fileDetail/:id?' render={(props)=><FileDetail key={props.match.params.type}/>}/>
                </Switch>
            </div>
        )
    }
}
export default EditRouter;
