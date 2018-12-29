import React,{Component} from 'react';
import {Modal,message} from 'antd';
import api from 'api/common.js';
const confirm = Modal.confirm;
class FilterWord extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:false
        }
    }
    checkWord(string,submit,noSubmit){
        api.authKeyWord({keyword:string}).then(data =>{
            let {message,result} = data[0];
            if(result){
                submit(message)
            }else{
                confirm({
                    title:'提交内容存在敏感词，是否继续提交？',
                    onOk:()=>{
                        submit(message)
                    },
                    onCancel:()=>{
                        noSubmit && noSubmit(message)
                    },
                    okText:'确认',
                    cancelText:'取消'
                })
            }
        }).catch(err=>{
            message.error(err);
        })
    }
    render(){
        return null;
    }
}
export default FilterWord;