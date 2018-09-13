import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getSignList(data){
        return _mm.POST({
            url:'/admin/tags/getTagsList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    delSign(data){
        return _mm.POST({
            url:'/admin/tags/deleteTags',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    addSign(data){
        return _mm.POST({
            url:'/admin/tags/addTags',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;