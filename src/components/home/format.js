const format = {
    //根据时间搓获取时间格式  2018-11-11
    getFormat:function(time,type){
        var date = new Date(time),
            year = date.getFullYear(),
            month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1): date.getMonth()+1,
            day = date.getDate() < 10 ? '0'+date.getDate():date.getDate();
        var map = {
            '0':year + '-' + month + '-' +day,
            '1': year + '-' + month ,
            '2':year+''
        }   
        return map[type]  ;
    },
    //获取最近7天的日期列表
    get7:function(){
        var date = new Date(),
            list = [] ,
            day6_ago = date.getTime() - 1000 * 60 * 60 * 24 * 6;
        for(var i = 0 ;i <8 ; i++){
            var nowDate = day6_ago + 1000 * 60 * 60 * 24 * i;
            list.push(this.getFormat(nowDate,'0')) 
        }
        return list;
    },
    getDayTime:function(num){
        var date = new Date(),
            newDate = date.getTime() + num * 1000 * 60 * 60 * 24 ;
        return  newDate;
    },
    //根据类型 和 +-数字获取时间戳
    getTime:function(type,num){
        var date = new Date();
        var map = {
            '0':function(){
                return date.getTime() + num * 1000 * 60 * 60 *24
            },
            '1':function(){
                return date.getTime() + num * 1000 * 60 * 60 *24 * 30
            },
            '2':function(){
                return date.getTime() + num * 1000 * 60 * 60 *24 *  365
            }
        }
        return map[type]();
    },
    //当选择 年 月 日的时候获取默认的 开始/结束/format格式
    getDefault:function(type){
        var _this = this;
        var format = 'YYYY-MM-DD',startTime,endTime;
        var map = {
            '0':function(){
                endTime = _this.getFormat(_this.getTime('0',1),'0');
                startTime = _this.getFormat(_this.getTime('0',-6),'0');
            },
            '1':function(){
                endTime = _this.getFormat(_this.getTime('1',1),'1');
                startTime = _this.getFormat(_this.getTime('1',-6),'1');
                format = 'YYYY-MM';
            },
            '2':function(){
                endTime = _this.getFormat(_this.getTime('2',1),'2');
                startTime = _this.getFormat(_this.getTime('2',-1),'2');
                format = 'YYYY';
            }
        }
        map[type]();
        return {format,startTime,endTime}
    },
    //验证所选时间是否符合规则
    checkTime(startTime,endTime,dateType){
        let s = new Date(startTime).getTime(),
            e = new Date(endTime).getTime();
        let map = {
            '0':function(){
                return {
                    result : (e-s) <= 7*1000*60*60*24,
                    message:'时间间隔不能大于7天！'
                }
            },
            '1':function(){
                return {
                    result : (e-s) <= 6*1000*60*60*24*31 ,
                    message:'时间间隔不能大于6个月！'
                }
            },
            '2':function(){
                return {
                    result: (e-s) <= 3*1000*60*60*24*366,
                    message:'时间间隔不能大于3年！'
                }
            }
        }
        return map[dateType]();    
    },
    //根据所选时间 生成X轴的坐标
    getXAxis:function(startTime,endTime,dateType){
        let s = new Date(startTime).getTime(),
            e = new Date(endTime).getTime(),
            length,list=[],_this = this;
        let map = {
            '0':function(){
                length = (e-s) / (1000*60*60*24) + 1;
                for(let i = 0 ; i <length ; i++){
                    var nowDate = s + 1000 * 60 * 60 * 24 * i;
                    list.push(_this.getFormat(nowDate,'0')) 
                }
            },
            '1':function(){
                length = Math.ceil((e-s) / (1000*60*60*24*31)) + 1;
                for(let i = 0 ; i <length ; i++){
                    var nowDate = s + 1000 * 60 * 60 * 24 * 31 * i;
                    list.push(_this.getFormat(nowDate,'1')) 
                }
            },
            '2':function(){
                length = Math.ceil((e-s) / (1000*60*60*24*366)) +1;
                for(let i = 0 ; i <length ; i++){
                    var nowDate = s + 1000 * 60 * 60 * 24 * 366 * i;
                    list.push(_this.getFormat(nowDate,'2')) 
                }
            }
        }
        map[dateType]();
        return list;
    },
    getData:function(xAxis,regList,activeList){
        let reg = [],
            newReg = [],
            active = [];
        for(let i = 0 ; i<xAxis.length;i++){
            reg[i] = 0 ;
            newReg[i] = 0;
            active[i] = 0;
        }
        if(regList.length>0){
            for(let i = 0 ;i<regList.length;i++){
               let  times =  regList[i].times,
                    newRegister= regList[i].newRegister,
                    register = regList[i].newRegister;
                let index = xAxis.indexOf(times);
                if(index!=-1){
                    reg[index] = register;
                    newReg[index] = newRegister;
                }
            }
        }
        if(activeList.length>0){
            for(let i =0 ;i<activeList.length;i++){
                let times = activeList[i].times,
                    activeRegister = activeList[i].acitveRegister;
                let index = xAxis.indexOf(times);
                if(index!=-1){
                    active[index] = activeRegister;
                }
            }
        }
        return {
            reg,newReg,active
        }  
    },
    getN3Data:function(xAxis,checkData,editData,thessieData){
        let check=[],
            edit=[],
            thessie=[];
        for(let i = 0 ; i<xAxis.length;i++){
            check[i] = 0 ;
            edit[i] = 0;
            thessie[i] = 0;
        }
        function get(originList,list,type){
            if(originList.length>0){
                for(let i = 0 ;i<originList.length;i++){
                   let  times =  originList[i].times,
                        edit = originList[i][type];
                    let index = xAxis.indexOf(times);
                    if(index!=-1){
                        list[index] = edit;
                    }
                }
            }
        }
        get(checkData,check,'checkview');
        get(editData,edit,'edit');
        get(thessieData,thessie,'theissue');
        return {
            check,edit,thessie
        }
    }
}
export default format;