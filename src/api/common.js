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
    uploadImg(data){
        return _mm.POST({
            url:'/admin/common/upload',
            data:{
                token:getToken(),
                attachFilenames:data.data
            }
        })
    },
    // 获取关联新闻列表
    getOtherNewsList(data){
        return _mm.POST({
            url:'/admin/news/newsListOther',
            data:{
                token:getToken(),
                categoryId:'e6e86887dbf146bfb1689b34778cd2d3',
                currPage:data.currPage,
                pageSize:data.pageSize
            }
        })
    },
    //获取标签列表
    getSignList(data){
        return _mm.POST({
            url:'/admin/tags/getTagsList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //获取modal弹出框信息
    getModalList(data){
        return _mm.POST({
            url:'/admin/search/getUnrelatedContentListByCaryId',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //添加未关联的文件 （多选）
    addFileList(data){
        return _mm.POST({
            url:'/admin/search/addContent',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;