import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getVerifyCode(data){
        return _mm.POST({
            url:'/admin/login/sendCode',
            data:data
        })
    },
    login(data){
        return _mm.POST({
            url:'/admin/login/dologin',
            data:data
        })
    }
}
export default Api;