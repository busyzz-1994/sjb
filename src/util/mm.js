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
                    console.log(data);
                    if(typeof data =='string'){
                        data = JSON.parse(data);
                    }
                    if(data.statusCode == 7700 || data.statusCode == 200){
                        resolve(data.data,data.message)
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
        window.location.href = '#/login?redirect=' + window.location.hash;
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
    }
}
export default mm;