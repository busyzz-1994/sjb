import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getBannerList(){
        return _mm.POST({
            url:'/admin/news/banner/list',
            data:{
                token:getToken()
            }
        })
    },
    search(data){
        return _mm.POST({
            url:'/admin/news/banner/select',
            data:{
                token:getToken(),
                title:data.title,
                type:data.type
            }
        })
    }
}
export default Api;