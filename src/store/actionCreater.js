// export const CHANGE_NAME = (name) => ({
//     type:'CHANGE_NAME',
//     value:name
// })
// export const ADD_USERINFO = (userInfo) => ({
//     type:'ADD_USERINFO',
//     value:userInfo
// })
export const SHOW_MODAL = (fn,aspectRatio)=>({
    type:'show_modal',
    value:fn,
    aspectRatio
})
export const HIDE_MODAL = ()=>({
    type:'hide_modal'
})