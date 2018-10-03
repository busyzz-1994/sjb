import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getBannerList(data){
        return _mm.POST({
            url:'/admin/banner/bannerlist',
            data:{
                token:getToken(),
                currPage:data.currPage,
                pageSize:data.pageSize,
                checkview:data.checkview,
                type:data.type
            }
        })
    },
    search(data){
        return _mm.POST({
            url:'/admin/news/banner/select',
            data:{
                token:getToken(),
                title:data.title,
                type:data.type
            }
        })
    },
    getBannerDetai(data){
        return _mm.POST({
            url:'/admin/banner/bannerdetails',
            data:{
                token:getToken(),
                id:data.id
            }
        })
    },
    addBanner(data){
        return _mm.POST({
            url:'/admin/banner/addbanner',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    delBanner(data){
        return _mm.POST({
            url:'/admin/banner/deletebanner',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    updateBanner(data){
        return _mm.POST({
            url:'/admin/banner/saveeditbanner',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    auditBanner(data){
        return _mm.POST({
            url:'/admin/banner/saveexaminebanner',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getAuditBannerList(data){
        return _mm.POST({
            url:'/admin/banner/bannerrelatedlist',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //发布banner
    issueBanner(data){
        console.log(data);
        return _mm.POST({
            url:'/admin/banner/updatereleasebanner',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //审核状态模糊查询
    auditSearch(data){
        return _mm.POST({
            url:'/admin/banner/findstatusbannerlike',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //发布状态模糊查询
    issueSearch(data){
        return _mm.POST({
            url:'/admin/banner/findrelatedbannerlike',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    bannerTop(data){
        return _mm.POST({
            url:'/admin/banner/topreleasebanner',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;