import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import UserInfo from './userInfo.js';
import UserComment from './userComment.js';
class UserRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/user/info' component={UserInfo}/>
                    <Route path='/user/comment' component={UserComment}/>
                </Switch>
            </div>
        )
    }
}
export default UserRouter;