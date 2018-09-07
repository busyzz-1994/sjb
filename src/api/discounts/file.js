import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
    // return 'a083e8435af9b4c7f3ebc5cbe2a0e16ec0e0763b';
}
const Api = {
    getFileList(data){
        console.log(data)
        return _mm.POST({
            url:'/admin/Merchandise/queryCheckLists',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;