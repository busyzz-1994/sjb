import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getSignList(data){
        return _mm.POST({
            url:'/admin/tags/getTagsList',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    delSign(data){
        return _mm.POST({
            url:'/admin/tags/deleteTags',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    addSign(data){
        return _mm.POST({
            url:'/admin/tags/addTags',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getUserList(data){
        return _mm.POST({
            url:'/admin/managers/getAdminUser',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //获取地级市列表
    getAreaList(){
        return _mm.POST({
            url:'/admin/managers/getCityList',
            data:{}
        })
    },
    //改变用户账号状态
    changeUserStatus(){
        return _mm.POST({
            url:'/admin/managers/updateManagerUser',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    addOuterUser(data){
        return _mm.POST({
            url:'/admin/managers/addManager',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    updateUser(data){
        return _mm.POST({
            url:'/admin/managers/updateManager',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getOuterDetail(data){
        return _mm.POST({
            url:'/admin/managers/getAdminUserById',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    searchUser(data){
        return _mm.POST({
            url:'/admin/managers/getAdminUserByKeyword',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //定期修改密码
    autoUpdate(data){
         return _mm.POST({
            url:'/admin/managers/timingModification',
            data:{
                ...data,
                token:getToken()
            }
         })
    },
    //一键重置初始密码
    resetPassword(data){
        return _mm.POST({
            url:'/admin/managers/updateNumber',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //账户禁用/启动
    updateManagerUser(data){
        return _mm.POST({
            url:'/admin/managers/updateManagerUser',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;

