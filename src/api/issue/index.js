import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
    // return 'a083e8435af9b4c7f3ebc5cbe2a0e16ec0e0763b';
}
const Api = {
    //开始
    getList(data){
        return _mm.POST({
            url:'/admin/complaints/getComplaintsByTypeAndStatus',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //获取用户详情
    getReply(data){
        return _mm.POST({
            url:'/admin/complaints/getComplaintsDetail',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //提交回复内容
    submitReply(data){
        return _mm.POST({
            url:'/admin/complaints/replyComplaints',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //撤销回复
    repeal(data){
        return _mm.POST({
            url:'/admin/complaints/deleteComplaints',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;