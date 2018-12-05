import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
    // return 'a083e8435af9b4c7f3ebc5cbe2a0e16ec0e0763b';
}
const Api = {
    //获取浏览数据N1
    getN1(data){
        return _mm.POST({
            url:'/admin/op/browseData',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //获取注册用户N2
    getN2(data){
        return _mm.POST({
            url:'/admin/op/registerData',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //获取活跃用户
    getN2_2(data){
        return _mm.POST({
            url:'/admin/op/registerActiveData',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getN3(data){
        return _mm.POST({
            url:'/admin/op/editData',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getN4(data){
        return _mm.POST({
            url:'/admin/op/specialData',
            data:{
                ...data,
                token:getToken()
            }
        })

    },
    getN5(data){
        return _mm.POST({
            url:'/admin/op/tagsData',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getG1(){
        return _mm.POST({
            url:'/admin/op/sexData',
            data:{
                token:getToken()
            }
        })
    },
    getG2(){
        return _mm.POST({
            url:'/admin/op/ageData',
            data:{
                token:getToken()
            }
        })
    },
    getG3(){
        return _mm.POST({
            url:'/admin/op/provenceData',
            data:{
                token:getToken()
            }
        })
    },
    getG4(){
        return _mm.POST({
            url:'/admin/op/cityData',
            data:{
                token:getToken()
            }
        })
    },
    getG5(){
        return _mm.POST({
            url:'/admin/op/systemData',
            data:{
                token:getToken()
            }
        })
    },
    getG6(){
        return _mm.POST({
            url:'/admin/op/phoneTypeData',
            data:{
                token:getToken()
            }
        })
    },

}
export default Api;