import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Recommend from './recommend.js';
import WordDetail from './wordDetail.js';
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
                </Switch>
            </div>
        )
    }
}
export default EditRouter;