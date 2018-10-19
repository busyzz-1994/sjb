import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    //服务文件开始
    getFileList(data){
        return _mm.POST({
            url:'/admin/business/businessList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //添加服务文件
    addFile(data){
        return _mm.POST({
            url:'/admin/business/editBusiness',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //获取服务文件详情
    getFileDetail(data){
        return _mm.POST({
            url:'/admin/business/businessInfo',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //删除服务文件
    delFileDetail(data){
        return _mm.POST({
            url:'/admin/business/deleteBusiness',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //审核服务文件
    authFile(data){
        return _mm.POST({
            url:'/admin/business/checkBusiness',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //发布服务文件
    issueFile(data){
        return _mm.POST({
            url:'/admin/business/theissueBusiness',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //服务文件置顶
    topFile(data){
        console.log(data);
        return _mm.POST({
            url:'/admin/business/placedstickBusiness',
            data:{
                ...data,
                token:getToken()
            }
        })
    },

}
export default Api;