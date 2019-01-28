const config = require('../config.json');
import imgLoading from 'images/loading.gif';
import { Modal } from 'antd';
const confirm = Modal.confirm;
function createLoading(){
	var html = `<div id='loading-wrapper' ><div id="request-loading"><img src=${imgLoading}></div></div>`;
	$('body').append(html);
}
function hideLoading(){
	$('#loading-wrapper').hide();
	$('#loading-wrapper').remove();
}
const mm = {
    GET:function(obj){
        createLoading();
        let _this = this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:config.server + obj.url,
                type:'get',
                async:(typeof obj.async)===undefined?true:obj.async,
                beforeSend:function(xhr){
                    var token = _this.getToken();
                    if(token){
                        xhr.setRequestHeader("x-auth-token", token);
                    }
                },
                data:obj.data?obj.data:'',
                success:function(data){
                    
                    if(data.statusCode == 7700 || data.statusCode == 200){
                        resolve(data.data,data.message)
                    }else if(data.statusCode ===7701 || data.statusCode === 407){
                        _this.doLogin();
                    }else{
                        reject(data.message);
                    }
                },
                error:function(err,hx){
                    let responseText = err.responseText;
                    if(responseText) {
                        responseText = JSON.parse(responseText);
                        reject(responseText.message);
                    } else {
                        alert('系统发生未知异常');
                        reject();
                    }
                },
                complete:function(){
                    obj.complete && obj.complete();
                    hideLoading();
                }
            })
        })
    },
    POST:function(obj){
        createLoading();
        let _this = this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:config.server + obj.url,
                type:'post',
                datatype:'text',
			    contentType:'application/json',
                async:(typeof obj.async)===undefined?true:obj.async,
                beforeSend:function(xhr){
                    var token = _this.getToken();
                    if(token){
                        xhr.setRequestHeader("x-auth-token", token);
                    }
                },
                data:obj.data?JSON.stringify(obj.data):'',
                success:function(data){
                    if(typeof data =='string'){
                        data = JSON.parse(data);
                    }
                    if(data.statusCode == 7700 || data.statusCode == 200){
                        resolve(data.data)
                    }else if(data.statusCode ===7701 || data.statusCode == 407 ){
                        _this.doLogin();
                    }else{
                        reject(data.message);
                    }
                },
                error:function(err,hx){
                    let responseText = err.responseText;
                    if(responseText) {
                        responseText = JSON.parse(responseText);
                        reject(responseText.message);
                    } else {
                        alert('系统发生未知异常');
                        reject();
                    }
                },
                complete:function(){
                    obj.complete && obj.complete();
                    hideLoading();
                }
            })
        })
    },
     // 跳转登录
    doLogin(){
        // window.location.href = '#/login?redirect=' + window.location.hash;
        window.location.href = '#/login';
    },
    //获取url参数
	getParam:function(name){
        let reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let result  = window.location.href.split('?').length > 1 ? window.location.href.split('?')[1].match(reg) : null;
        return result ? decodeURIComponent(result[2]) : null;
    },
    setStorage(name, data){
        let dataType = typeof data;
        // json对象
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else{
            alert('该类型不能用于本地存储');
        }
    },
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return data;
        }
        else{
            return '';
        }
    },
    removeStorage(name){
        window.localStorage.removeItem(name);
    },
    // element.style[prefix('transform')] = 'rotate(30deg)'
    prefix(style){
        let ele = document.createElement('div');
        let transformType = {
            webkit: 'webkitTransform',
            Moz: 'MozTransform',
            O: 'OTransform',
            ms: 'msTransform',
            standard: 'transform'
        }
        let type = (function(){
            for(let key in transformType){
                if(ele.style[transformType[key]] !== undefined){
                    return key;
                }
            }
        })()
        if(type == 'standard') return style;
        return type + style.charAt(0).toUpperCase() + style.substr(1)
    },
    checkFile:function(file,arr,size){
		var msg = {
			message:'',
			status:true
		}
		var byteSize = size * 1024 * 1024;
		var filename = file.name;
		var ext = filename.toLowerCase().split('.').splice(-1)[0];
		var fileSize = file.size;
		var tipString = '';
		arr.forEach(function(item){
			tipString+=item+'/'
		})
		if(arr.indexOf(ext) == -1){
			msg.message = '只能上传'+tipString + '格式的文件';
			msg.status = false;
			return msg;
		}
		if(byteSize < fileSize){
			msg.message = '上传文件不超过' + size + 'MB';
			msg.status = false;
			return msg;
		}
		msg.message = filename;
		return msg;
    },
    fileToBase64(file,callback){
        if(file){
            var reader = new FileReader();
            var img = reader.readAsDataURL(file);
            reader.onload = function(e){
                callback(e.target.result);
            }
        }
    },
    htmlFilter(htmlString){
        return htmlString.replace('<','&lt;')
                         .replace('>','&gt;')
    },
    getToken(){
        // return '2129d21664fb7a7c0165037dfbdabbeb8416f273';
        return this.getStorage('token');
        // this.getStorage('token')
    },
    confirm(options){
        confirm({
            title:options.title,
            onOk(){
                options.ok && options.ok()
            },
            okText:'确认',
            cancelText:'取消'
        })
    },
    //处理imgUrl  http://xxxxx/sjb/Upload/xxx.png -> /Upload/xxx.png;
    processImgUrl(data){
        let type = typeof data;
        let reg = /(\/Upload\/.*)/;
        console.log(data);
        if(type == 'object'){
            let newData = data.map((item)=>{
                return item.match(reg)[0];
            })
            return newData;
        }else{
            return data.match(reg)[0];
        }
    },
    //将type 0 ， 1， 2, 转换成 新闻，商家，，
    mapTypeToString(type){
        let map = {
            '0':'新闻',
            '1':'商家',
            '2':'商品',
            '3':'直播',
            '4':'视频',
            '5':'音乐',
            '6':'广告'
        }
        return map[type];
    },
    //过滤用户输入的链接
    filterLink(url){
        var reg = /^(http:\/\/)|(https:\/\/)/;
        return url.replace(reg,'');
    },
    //将状态0,1,2 转换成 所属区域
    mapStatusToString(type){
        let map = {
            '0':'首页',
            '1':'生活',
            '2':'媒体',
            '3':'AR'
        }
        return map[type];
    },
    //将不同类型的时间格式  转换为  标砖的  2018-01-01 00：00:00
    mapFormatToDateString(format,dateString){
        var map = {
            'YYYY': dateString + '-01-01 00:00:00',
            'YYYY-MM': dateString + '-01 00:00:00',
            'YYYY-MM-DD': dateString + ' 00:00:00'
        }
        return map[format];
    },
    //获取当天的年月日 ， 和 前一天  前一个月 前一年
    getTimeAndFormat(type){
        var map_1 = {
            '0':'YYYY-MM-DD',
            '1':'YYYY-MM',
            '2':'YYYY'
        },
        format = map_1[type],
        date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        preYear = new Date(date.valueOf() + 1000*60*60 *24 * 365).getFullYear(),
        preMonth = new Date(date.valueOf() + 1000*60*60 * 24 * 30).getMonth()+1,
        preYear_1 = new Date(date.valueOf() + 1000*60*60 * 24 * 30).getFullYear(),
        preDay = new Date(date.valueOf() + 1000*60*60 * 24 ).getDate(),
        preMonth_2 = new Date(date.valueOf() + 1000*60*60 * 24 ).getMonth()+1,
        preYear_2 = new Date(date.valueOf() + 1000*60*60 * 24 ).getFullYear();
        var map_2 = {
            '0':`${year}-${month}-${day}`,
            '1':`${year}-${month}`,
            '2':`${year}`
        }
        var map_3 = {
            '0':`${preYear_2}-${preMonth_2}-${preDay}`,
            '1':`${preYear_1}-${preMonth}`,
            '2':`${preYear}`
        }
        return {
            format,
            startTime:map_2[type],
            endTime:map_3[type]
        }
    },
    //通过时间搓 返回 2018-06-04 格式日期
    getDateByTime(time){
        var date = new Date(time),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();
        return year+'-'+month+'-'+day
    },
    getTomorrowDateByTime(time){
        var date = new Date(time + 1000*60*60 * 24),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();
        return year+'-'+month+'-'+day
    },
    //替换span标签的红色标记
    replaceSpan(string){
        var reg = /\<span\s{1}style=['"]background-color:red['"]>/img;
        console.log(string)
        return string.replace(reg,'').replace(/\<a><\/a><\/span>/img,'');
    },
    getFullDate(time){
        var date = new Date(time),
            year = date.getFullYear(),
            month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1 ,
            day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            sec = date.getSeconds()< 10 ? '0' + date.getSeconds() : date.getSeconds();
        return  `${year}-${month}-${day} ${hours}:${min}:${sec}`; 
    },
    //判断是否为外地用户
    isOuter(){
        var userInfo = this.getStorage('userInfo');
        userInfo && ( userInfo = JSON.parse(userInfo));
        if(!userInfo){
            return ''
        }
        let {isAdmin,isInternal} = userInfo;
        if(isAdmin == '1' && isInternal=='1'){
            return true;
        }else{
            return false;
        }
    }

}
export default mm;