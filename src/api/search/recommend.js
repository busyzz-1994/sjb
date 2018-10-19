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
        console.log(data);
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
    //修改词条
    updateWord(data){
        return _mm.POST({
            url:'/admin/search/updateCgryName',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //查询词条
    searchWord(data){
        return _mm.POST({
            url:'/admin/search/getCgryByTypeAndCheckview',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getFileList(data){
        return _mm.POST({
            url:'/admin/search/getContentListByCaryId',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //审核文件
    authList(data){
        return _mm.POST({
            url:'/admin/search/checkSearch',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //删除文件
    delFile(data){
        return _mm.POST({
            url:'/admin/search/deleteCtgyContentById',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //查询发布状态下的词条
    getListByIssue(data){
        return _mm.POST({
            url:'/admin/search/getCaryByTheissue',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //词条的上线
    getOnline(data){
        return _mm.POST({
            url:'/admin/search/changeTheissue',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //词条置顶
    top(data){
        return _mm.POST({
            url:'/admin/search/setTop',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;