import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getList(data){
        return _mm.POST({
            url:'/admin/search/getCgryByTypeAndCheckview',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    // 添加词条
    addWord(data){
        return _mm.POST({
            url:'/admin/search/addCategory',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //删除词条
    removeWord(data){
        return _mm.POST({
            url:'/admin/search/deleteCtgyById',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    updateWord(data){
        return _mm.POST({
            url:'/admin/search/updateCgryName',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;