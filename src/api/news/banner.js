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
            url:'/admin/news/banner/editBanner',
            data:{
                token:getToken(),
                id:data.id
            }
        })
    },
    addBanner(data){
        return _mm.POST({
            url:'/admin/news/banner/addBanner',
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
    }
}
export default Api;