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
    //添加关联文件
    addRelFile(data){
        return _mm.POST({
            url:'/admin/video/editVideoType',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //视频文件开始
    addFile(data){
        return _mm.POST({
            url:'/admin/video/editVideo',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getFileList(data){
        return _mm.POST({
            url:'/admin/video/videoList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    delFile(data){
        return _mm.POST({
            url:'/admin/video/deleteVideo',
            data:{
                ...data,
                token:getToken()
            }
        })
    }

}
export default Api;