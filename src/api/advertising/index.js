import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
    // return 'a083e8435af9b4c7f3ebc5cbe2a0e16ec0e0763b';
}
const Api = {
    getList(data){
        return _mm.POST({
            url:'/admin/adv/advList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    addDetail(data){
        return _mm.POST({
            url:'/admin/adv/editAdv',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getDetail(data){
        return _mm.POST({
            url:'/admin/adv/advInfo',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    delDetail(data){
        return _mm.POST({
            url:'/admin/adv/deleteAdv',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    authDetail(data){
        return _mm.POST({
            url:'/admin/adv/checkAdv',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    issue(data){
        return _mm.POST({
            url:'/admin/adv/theissueAdv',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //置顶
    top(data){
        return _mm.POST({
            url:'/admin/adv/placedstickAdv',
            data:{
                ...data,
                token:getToken()
            }
        })
    }

}
export default Api;