import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getFileList(data){
        return _mm.POST({
            url:'/admin/news/sjbnewslist',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    delFile(data){
        return _mm.POST({
            url:'/admin/news/deletesjbnews',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //获取类型
    getTypeList(data){
        return _mm.POST({
            url:'/admin/category/categorylist',
            data:{
                token:getToken(),
                currPage:data.currPage,
                pageSize:data.pageSize,
                type:data.type
            }
        })
    }
    
}
export default Api;