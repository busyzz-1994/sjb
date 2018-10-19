var rule = {
	//不为空
	notEmpty:function(value,msg){
		if(!value){
			return msg;
		}
	},
	//不是空数组
	notEmptyArray:function(arr,msg){
		let type = typeof arr;
		if(type !='object'){
			return msg ;
		}else{
			let length = arr.length;
			if(length<1){
				return msg;
			}
		}
	},
	//不能为空数组，且里面的内容不能为空
	notEmptyArrayWithItem:function(arr,msg){
		let type = typeof arr;
		if(type !='object'){
			return msg ;
		}else{
			let length = arr.length;
			if(length<1){
				return msg;
			}else{
				for(var i = 0 ;i<length;i++){
					if(!arr[i]) return msg;
				}
			}
		}
	},
	//手机号码
	isPhone:function(value,msg){
		if(!(/^1\d{10}$/.test(value))){
			return msg;
		};
	},
	//是否相同  支持传入多个数据
	isSame:function(){
		var arg = [].slice.call(arguments);
		var argLength = arg.length;
		var value = arg[0],
			msg   = arg[argLength-1],
			param = arg.slice(1,argLength-1);
		for(var i = 0 , len = param.length;i<len;i++){
			if(value != param[i]){
				return msg;
			}
		}
	},
	//数字范围
	numberRange:function(value,min,max,msg){
		let val = +value;
		if(!val && val!=0){
			return msg;
		}else{
			if(val<min || val>max){
				return msg;
			}
		}
	},
	//长度范围
	lengthRange:function(value,min,max,msg){
		var valLength = value.length;
		if(valLength < min || valLength>max){
			return msg;
		}
	},
	//邮箱
	isEmail:function(value,msg){
		if(!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value))){
			return msg;
		}
	},
	//身份证
	isIDcard:function(value,msg){
		let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		if(!reg.test(value)){
			return msg;
		}
	},
	//固定电话
	isFixedPhone:function(value,msg){
		let reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
		if(!reg.test(value)){
			return msg;
		}
	},
	//用户名 大写字母加数字
	isUserName: function(value,msg){
		let reg = /^[0-9A-Z]+$/;
		if(!reg.test(value)){
			return msg;
		}
	},
	//用户密码 6位的纯数字
	isUserPassword:function(value,msg){
		let reg = /^\d{6}$/;
		if(!reg.test(value)){
			return msg;
		}
	},
	//正整数 不包括0
	isPositiveInteger:function(value,msg){
		let reg = /^[1-9][0-9]*$/;
		if(!reg.test(value)){
			return msg;
		}
	},
	//非负数 (0+正整数)
	notMinus:function(value,msg){
		let reg = /(^0$|^[1-9][0-9]*$)/;
		if(!reg.test(value)){
			return msg;
		}
	},
	//非负的浮点数  包括0和整数
	notFloatMinus:function(value,msg){
		let reg = /^\d+(\.\d+)?$/;
		if(!reg.test(value)){
			return msg;
		}
	}
}
class Validate{
	constructor(){
		this.taskList = [];
	}
	add(value,r,msg){
		this.taskList.push(function(){
			var arg = [];
			arg.push(value);
			var rules = r.split(':');
			var type = rules[0];
			rules.shift();
			[].push.apply(arg,rules);
			arg.push(msg);
			return rule[type].apply(this,arg);
		})
	}
	addFn(fn){
		this.taskList.push(fn)
	}
	start(){
		for(var i = 0,len = this.taskList.length;i<len;i++ ){
			var error = this.taskList[i]();
			if(error){
				return error;
			}
		}
	}
}
module.exports = Validate
