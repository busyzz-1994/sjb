import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
    // return 'a083e8435af9b4c7f3ebc5cbe2a0e16ec0e0763b';
}
const Api = {
    //视频类型开始
    getTypeList(data){
        return _mm.POST({
            url:'/admin/video/videoTypeList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //添加视频类型
    addRelFile(data){
        return _mm.POST({
            url:'/admin/video/editVideoType',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //发布类型上线
    OnlineType(data){
        return _mm.POST({
            url:'/admin/video/theissueType',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //类型置顶
    topType(data){
        return _mm.POST({
            url:'/admin/video/placedstickType',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //视频文件开始**********
    addFile(data){
        return _mm.POST({
            url:'/admin/live/editLive',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getFileList(data){
        return _mm.POST({
            url:'/admin/live/liveList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    delFile(data){
        return _mm.POST({
            url:'/admin/live/deleteLive',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getVideoDetail(data){
        return _mm.POST({
            url:'/admin/live/liveInfo',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    authVideoFile(data){
        return _mm.POST({
            url:'/admin/live/checkLive',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    issueVideoFile(data){
        return _mm.POST({
            url:'/admin/live/theissueLive',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    topVideoFile(data){
        return _mm.POST({
            url:'/admin/live/placedstickLive',
            data:{
                ...data,
                token:getToken()
            }
        })
    }

}
export default Api;