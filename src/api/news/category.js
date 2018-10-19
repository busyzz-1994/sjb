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
    },
    //专题开始***************
    addCategory(data){
        console.log(data);
        return _mm.POST({
            url:'/admin/topic/editTopIc',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //查询专题下面的列表
    getCategoryList(data){
        return _mm.POST({
            url:'/admin/topic/topicList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //获取专题详情
    getCategoryDetail(data){
        return _mm.POST({
            url:'/admin/topic/topicInfo',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //专题的删除
    delCategory(data){
        console.log(data);
        return _mm.POST({
            url:'/admin/topic/deleteTopic',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //查询专题文件
    getCategoryFlieList(data){
        return _mm.POST({
            url:'/admin/topic/topicContentList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //删除素材
    delCategoryFlie(data){
        return _mm.POST({
            url:'/admin/topic/deleteTopicContent',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
}
export default Api;