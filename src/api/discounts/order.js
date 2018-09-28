import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    search(data){
        return _mm.POST({
            url:'/admin/Order/listLikeOrder',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getOrderList(data){
        return _mm.POST({
            url:'/admin/Order/listOrder',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;