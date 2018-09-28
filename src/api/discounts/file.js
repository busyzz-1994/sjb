import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
    // return 'a083e8435af9b4c7f3ebc5cbe2a0e16ec0e0763b';
}
const Api = {
    getFileList(data){
        return _mm.POST({
            url:'/admin/Merchandise/queryCheckLists',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getFileListIssue(data){
        return _mm.POST({
            url:'/admin/Merchandise/queryReleaseLists',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getFileDetail(data){
        return _mm.POST({
            url:'/admin/Merchandise/selectMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //添加商品文件
    addFile(data){
        return _mm.POST({
            url:'/admin/Merchandise/addMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //删除商品文件(一般商品的删除)
    removeFile(data){
        return _mm.POST({
            url:'/admin/Merchandise/deletMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //删除商品文件（发布的商品）
    removeIssueFile(data){
        return _mm.POST({
            url:'/admin/Merchandise/deletMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //商品的模糊查询(审核)
    searchFileAudit(data){
        return _mm.POST({
            url:'/admin/Merchandise/likeCheckMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //商品的模糊查询（发布）
    searchFileIssue(data){
        return _mm.POST({
            url:'/admin/Merchandise/likeReleaseMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //修改商品文件
    updataFile(data){
        return _mm.POST({
            url:'/admin/Merchandise/editMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //提交审核信息
    auditFile(data){
        return _mm.POST({
            url:'/admin/Merchandise/checkMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //发布上线 和 下线
    onlineFile(data){
        return _mm.POST({
            url:'/admin/Merchandise/releaseMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //文件置顶
    topFile(data){
        console.log(data)
        return _mm.POST({
            url:'/admin/Merchandise/topRelease',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
    
}
export default Api;