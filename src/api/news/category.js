import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getList(data){
        return _mm.POST({
            url:'/admin/category/categorylist',
            data:{
                token:getToken(),
                currPage:data.currPage,
                pageSize:data.pageSize
            }
        })
    }
}
export default Api;