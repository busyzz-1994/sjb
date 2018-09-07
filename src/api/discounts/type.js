import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
    // return 'a083e8435af9b4c7f3ebc5cbe2a0e16ec0e0763b';
}
const Api = {
    getTypeList(data){
        return _mm.POST({
            url:'/admin/Merchandise/categorylist',
            data:{
                token:getToken(),
                currPage:data.currPage,
                pageSize:data.pageSize,
                type:data.type
            }
        })
    },
    //添加商品类型
    addType(data){
        return _mm.POST({
            url:'/admin/category/category2add',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //编辑商品类型
    editType(data){
        return _mm.POST({
            url:'/admin/category/category2edit',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //删除商品类型
    delType(data){
        return _mm.POST({
            url:'/admin/category/category2delet',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //模糊查询
    searchType(data){
        return _mm.POST({
            url:'/admin/category/selectCategory',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;