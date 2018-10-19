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
    getAuthList(data){
        return _mm.POST({
            url:'/admin/news/sjbreleasenewslist',
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
    },
    //审核状态的模糊查询
    searchAudit(data){
        return _mm.POST({
            url:'/admin/news/findstatusnewslike',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //发布状态的模糊查询
    searchIssue(data){
        return _mm.POST({
            url:'/admin/news/findrelatednewslike',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //获取新闻详情
    getNewsDetail(data){
        return _mm.POST({
            url:'/admin/news/showsjbnews',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //添加新闻文件
    addFile(data){
        return _mm.POST({
            url:'/admin/news/addsjbnews',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //修改新闻文件
    updateFile(data){
        return _mm.POST({
            url:'/admin/news/updatesjbnews',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //审核新闻文件
    authFile(data){
        return _mm.POST({
            url:'/admin/news/updateexaminenews',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //发布上线  或者 下线
    fileOnline(data){
        return _mm.POST({
            url:'/admin/news/updatereleasenews',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
    
}
export default Api;