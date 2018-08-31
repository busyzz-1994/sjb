import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const userApi = {
    login:function(data){
        return _mm.POST({
            url:'/admin/login',
            data:data
        })
    },
    //获取招标机构列表
    getTenderList:function(data){
        return _mm.GET({
            url:'/admin/tender/agency/listAgency',
            data:data,
            token:getToken()
        })
    },
    //搜索代理机构
    searchTender:function(key){
        return _mm.GET({
            url:'/admin/tender/agency/search?key='+key,
            token:getToken()
        })
    },
    //获取招标机构详情
    getTenderDetail:function(id){
        return _mm.GET({
            url:'/admin/tender/agency/query?id='+id,
            token:getToken()
        })
    },
    //添加招标机构
    addTender:function(data){
        return _mm.POST({
            url:'/admin/tender/agency/add',
            data:data,
            token:getToken()
        })
    },
    //添加代理机构账户
    addTenderAccount:function(data){
        return _mm.POST({
            url:'/admin/tender/agency/auth/add',
            data:data,
            token:getToken()
        })
    },
    //修改代理机构账号状态是否可用
    updateTenderAccountStatus:function(data){
        return _mm.POST({
            url:`/admin/tender/agency/enable/auth?id=${data.id}&state=${data.state}`,
            token:getToken()
        })
    },
    //获取投标机构信息列表
    getBidList:function(data){
        return _mm.GET({
            url:'/admin/bid/company/list',
            data:data,
            token:getToken()
        })
    },
    searchBid:function(key){
        return _mm.GET({
            url:'/admin/bid/company/search?key='+key,
            token:getToken()
        })
    },
    //获取投标机构详情
    getBidDetail:function(id){
        return _mm.GET({
            url:'/admin/bid/company/query?id='+id,
            token:getToken()
        })
    },
    //修改投标机构账号状态是否可用
    updateBidAccountStatus:function(data){
        return _mm.POST({
            url:`/admin/bid/company/account/enable?id=${data.id}&status=${data.state}`,
            token:getToken()
        })
    },
    //获取用户账号详情用于审核
    getUserAccount:function(uid){
        return _mm.GET({
            url:`/admin/bid/company/account/query?id=${uid}`,
            token:getToken()
        })
    },
    //保存审核结果
    saveAuditResult:function(data){
        return _mm.POST({
            url:'/admin/bid/company/account/examine',
            data:data,
            token:getToken()
        })
    }

}
export default userApi;