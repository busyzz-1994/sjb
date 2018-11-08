
let defaultState = {
    //这个是裁剪弹出框的全局属性
    isShow : false,
    fn:()=>{},
    aspectRatio:1334 / 750
}
export default (state=defaultState,action) =>{
    let newState = JSON.parse(JSON.stringify(state)),
        type = action.type;
    switch(type){
        case 'show_modal':
        newState.isShow = true;
        newState.fn = action.value;
        newState.aspectRatio = action.aspectRatio;
        return newState;
        case 'hide_modal':
        newState.isShow = false;
        return newState;
        default :
        return state;
    }
}