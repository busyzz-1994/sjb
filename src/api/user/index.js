import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getCommentList(data){
        return _mm.POST({
            url:'/admin/manage/getCommentListByIsShow',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //点击审核
    auditComment(data){
        return _mm.POST({
            url:'/admin/manage/updateComment',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //删除评论
    delComment(data){
        return _mm.POST({
            url:'/admin/manage/deleteCommentById',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //模糊查询评论
    searchComment(data){
        return _mm.POST({
            url:'/admin/manage/getCommentByKeyword',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;


