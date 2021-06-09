export default {
	/**
	 * @param {Array}  rows
	 * @param {Object} filter
	 */
	find_rows(rows, filter, return_index = true) {
		for (let i = 0; i < rows.length; i ++) {
			let res = true
			let item = rows[i]
			for (let key in filter) {
				if (item[key] != filter[key]) res = false
			}
			if (res) return return_index ? index : item
		}
		return return_index ? -1 : null
	},
	
	//设置cookie
	setCookie: function (cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
		console.info(document.cookie);
	},
	//获取cookie
	getCookie: function (cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		}
		return "";
	},
	//清除cookie
	clearCookie: function (cname) {
		this.setCookie(cname, "", -1);
	},
	getPlatform: function() {
		let platform = uni.getSystemInfoSync().platform;
		
		// #ifdef H5 
		if (window.navigator && window.navigator.userAgent) {
			const ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				platform = 'WX-H5'
			} else platform = 'H5'
		}
		// #endif
		// #ifdef MP-WEIXIN
		platform = 'MP-WEIXIN'
		// #endif
		// #ifdef MP-ALIPAY
		platform = 'MP-ALIPAY'
		// #endif
		// #ifdef MP-BAIDU
		platform = 'MP-BAIDU'
		// #endif
		return platform
	},
	has_addon(name) {
		let appInfo = uni.getStorageSync('appInfo')
		if (!appInfo) return false
		if (!appInfo.plugins) return false
		if (appInfo.plugins.indexOf(name) != -1) return true
		return false
	},
	queryStringify(obj) {
		let res = []
		for (let k in obj) {
			res.push(`${k}=${obj[k]}`)
		}
		return res.join('&')
	},
	quchong(data2) { // 去重
	   let map = new Map()
	   data2.forEach((item,index)=>{
	     if (!map.has(item['note'])){
	       map.set(item['note'],item)
	     }
	   })
	   let data4 = [...map.values()]
	   let data3 = JSON.stringify(data2);
	  data4.forEach((item,index)=>{
	    item.img = JSON.parse(data3).filter(a => item.note === a.note); 
	  })
	  return data4
	},
	// 监听网络状态
	On(){
		// 网络状态
		var isConnect = false
		// 获取当前网络状态
		uni.getNetworkType({
			success: (res) => {
				if(res.networkType!=='none'){ isConnect=true; return;}
				uni.showToast({
					icon:"none",
					title: '请先连接网络重新尝试ss',
					duration: 3000
				});
			}
		})
		// 监听网络状态变化
		uni.onNetworkStatusChange((res)=>{
			if(!res.isConnected){
				uni.showToast({
					icon:"none",
					title: '您目前处于断网状态',
				});
				// 获取当前页
				let pages = getCurrentPages();
				let route = pages[pages.length - 1].route;
						console.log(route)
			} else if(!isConnect && res.isConnected) {
				uni.showToast({
					icon:"none",
					title: '网络已恢复',
				});
			}
			isConnect = res.isConnected;
		})
	},
	/**
	 * 格式化日期 
	 * @param date 日期 
	 * @param format 格式化样式,例如yyyy-MM-dd HH:mm:ss E 
	 * @return 格式化后的金额 
	 */
	formatDate(date, format) { 
	  var v = ""; 
	  if (typeof date == "string" || typeof date != "object") { 
		return; 
	  } 
	  var year  = date.getFullYear(); 
	  var month  = date.getMonth()+1; 
	  var day   = date.getDate(); 
	  var hour  = date.getHours(); 
	  var minute = date.getMinutes(); 
	  var second = date.getSeconds(); 
	  var weekDay = date.getDay(); 
	  var ms   = date.getMilliseconds(); 
	  var weekDayString = ""; 
		
	  if (weekDay == 1) { 
		weekDayString = "星期一"; 
	  } else if (weekDay == 2) { 
		weekDayString = "星期二"; 
	  } else if (weekDay == 3) { 
		weekDayString = "星期三"; 
	  } else if (weekDay == 4) { 
		weekDayString = "星期四"; 
	  } else if (weekDay == 5) { 
		weekDayString = "星期五"; 
	  } else if (weekDay == 6) { 
		weekDayString = "星期六"; 
	  } else if (weekDay == 7) { 
		weekDayString = "星期日"; 
	  } 
  
	  v = format; 
	  //Year 
	  v = v.replace(/yyyy/g, year); 
	  v = v.replace(/YYYY/g, year); 
	  v = v.replace(/yy/g, (year+"").substring(2,4)); 
	  v = v.replace(/YY/g, (year+"").substring(2,4)); 
  
	  //Month 
	  var monthStr = ("0"+month); 
	  v = v.replace(/MM/g, monthStr.substring(monthStr.length-2)); 
  
	  //Day 
	  var dayStr = ("0"+day); 
	  v = v.replace(/dd/g, dayStr.substring(dayStr.length-2)); 
  
	  //hour 
	  var hourStr = ("0"+hour); 
	  v = v.replace(/HH/g, hourStr.substring(hourStr.length-2)); 
	  v = v.replace(/hh/g, hourStr.substring(hourStr.length-2)); 
  
	  //minute 
	  var minuteStr = ("0"+minute); 
	  v = v.replace(/mm/g, minuteStr.substring(minuteStr.length-2)); 
  
	  //Millisecond 
	  v = v.replace(/sss/g, ms); 
	  v = v.replace(/SSS/g, ms); 
		
	  //second 
	  var secondStr = ("0"+second); 
	  v = v.replace(/ss/g, secondStr.substring(secondStr.length-2)); 
	  v = v.replace(/SS/g, secondStr.substring(secondStr.length-2)); 
		
	  //weekDay 
	  v = v.replace(/E/g, weekDayString); 
	  return v; 
	},
	/**
	 * @param {Object} uid 用户id 
	 */
	roomNumberRadom(uid) {
		return uid+'_'+new Date().getTime()+'_'
	},
	setMinHeight(){
		uni.getSystemInfo().then( res => {
			var phoneHeight = res[1].windowHeight + "px"
			console.log(phoneHeight)
			// content.style.['text-align']  = '1000px'
		})
	},
	/**
	 * 手机号正则验证1
	 * @param {Object}  
	 */
	checkPhone(phone){
	    if(!(/^1[3456789]\d{9}$/.test(phone))){
	        return false; 
	    } 
		return true
	},
	/**
	 * 密码正则验证 8-16位密码,同时包含字母和数字
	 * @param {Object}  
	 */
	checkPassword(value){
	    if((/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value))){
	        return false; 
	    } 
		return true
	},
	yanzhengma(value){
		if((/[0-9]{6}/.test(value))){
		    return false; 
		} 
		return true
	},
	 //startDateStr(2017-02-22) endDateStr(2018-02-21) 计算两个日期相差的年数
	getDateYearSub(startDateStr, endDateStr) {
		var day = 24 * 60 * 60 *1000; 
		var sDate = new Date(Date.parse(startDateStr.replace(/-/g, "/")));
		var eDate = new Date(Date.parse(endDateStr.replace(/-/g, "/")));

		//得到前一天(算头不算尾)
		sDate = new Date(sDate.getTime() - day);

		//获得各自的年、月、日
		var sY  = sDate.getFullYear();     
		var sM  = sDate.getMonth()+1;
		var sD  = sDate.getDate();
		var eY  = eDate.getFullYear();
		var eM  = eDate.getMonth()+1;
		var eD  = eDate.getDate();

		if(eY > sY && sM == eM && sD == eD) {
			return eY - sY;
		} else {
			console.log(eY - sY)
			// alert("两个日期之间并非整年，请重新选择");
			return 0;
		}
	},
	/**
	 * 邮箱正则验证
	 * @param {Object}  
	 */
	emailReg(email){
		var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if(reg.test(email)){
			console.log("邮箱格式正确");
			return true
		}else{
			console.log("邮箱格式不正确");
			return false
		}
	},
	// 身份证
	
	identity(value){
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(reg.test(value)){
			console.log("邮箱格式正确");
			return true
		}else{
			console.log("邮箱格式不正确");
			return false
		}
	},
	// 姓名
	nameUser(value){
		var reg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{2,20})$/;
		if(reg.test(value)){
			console.log("姓名格式正确");
			return true
		}else{
			console.log("姓名格式不正确");
			return false
		}
	},
	// 验证码
	codeUser(value){
		var reg = /[0-9]{6}/;
		if(reg.test(value)){
			console.log("验证码格式正确");
			return true
		}else{
			console.log("验证码格式不正确");
			return false
		}
	},
	
	/**
	 * 出生年月正则验证
	 * @param {Object}  
	 */
	checkBirth(val){
		var pattern = /^((19[2-9]\d{1})|(20((0[0-9])|(1[0-8]))))\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2][0-9])|30|31)$/;
		if(pattern.test(val)) {
			var date = new Date(val);
			var month = val.substring(val.indexOf("-")+1,val.lastIndexOf("-"));
			return date && (date.getMonth()+1 == parseInt(month));
		}
			return false;
	},
	/**
	 * 正则验证是否是日期
	 * @param {Object}  
	 */
	checkDate(cl_qk){
		if(!cl_qk){
		   console.log('时间不可为空！');return false;
		}else{
		   var r = new RegExp("^[1-2]\\d{3}-(0?[1-9]||1[0-2])-(0?[1-9]||[1-2][1-9]||3[0-1])$");
		   if(r.test(cl_qk)==false){
		      console.log('时间格式不对！');return false;
		   }
		}
	},
	/**
	 * 验证是否大于当前日期
	 * @param {Object}  
	 */
	judgeDate(tomodifyDate){
		return new Date().getTime()-new Date(tomodifyDate).getTime();
	},
	/**
	 * 计算传入日期和当前日期相差多少年(可计算年龄)
	 * @param {Object}  
	 */
	ges(strBirthday) {
		strBirthday = new Date(strBirthday).Format('yyyy-MM-dd')
		var returnAge;
		var strBirthdayArr = strBirthday.split("-");
		var birthYear = strBirthdayArr[0];
		var birthMonth = strBirthdayArr[1];
		var birthDay = strBirthdayArr[2];
		
		var d = new Date();
		var nowYear = d.getFullYear();
		var nowMonth = d.getMonth() + 1;
		var nowDay = d.getDate();
		
		if (nowYear == birthYear) {
		    returnAge = 0; //同年 则为0岁
		} else {
		    var ageDiff = nowYear - birthYear; //年之差
		    if (ageDiff > 0) {
		        if (nowMonth == birthMonth) {
		            var dayDiff = nowDay - birthDay; //日之差
		            if (dayDiff < 0) {
		                returnAge = ageDiff - 1;
		            } else {
		                returnAge = ageDiff;
		            }
		        } else {
		            var monthDiff = nowMonth - birthMonth; //月之差
		            if (monthDiff < 0) {
		                returnAge = ageDiff - 1;
		            } else {
		                returnAge = ageDiff;
		            }
		        }
		    } else {
		        // returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
		        returnAge = 0; //返回-1 表示出生日期输入错误 晚于今天
		    }
		}
		return returnAge; //返回周岁年龄
	},
	/**
	 * 获取数组中距离当前日期最近的数组下标
	 * @param {Object}  
	 */
	getIndexOfLatestDate(dateArr) {
		var minMs = new Date(dateArr[0]).getTime() - new Date().getTime()
		var index = 0
		for (let i in dateArr) {
		   var ms = new Date(dateArr[i]).getTime() - new Date().getTime()
		   if (ms > 0 && ms < minMs) {
			   minMs = ms
			   index = i
		   }
		}
		return parseInt(index)
	},
	
	/**  
	 * 通过经纬度计算当前位置与给出位置之间直线距离(千米)
	 * @param float $lon1    经度  
	 * @param float $lat1    维度  
	 * @param float $lon2    经度  
	 * @param float $lat2    维度  
	 * @return float         浮点数  
	 */ 
	getDistance (lat1, lng1) {
		if(!uni.getStorageSync('location')){
			uni.getLocation({
				type: 'wgs84',
				success: function (res) {
					uni.setStorageSync('location', res)
				}
			})	
		}
		var location = uni.getStorageSync('location')
		var radLat1 = lat1*Math.PI / 180.0;
		var radLat2 = location.latitude*Math.PI / 180.0;
		var a = radLat1 - radLat2;
		var b = lng1*Math.PI / 180.0 - location.longitude*Math.PI / 180.0;
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
		s = s *6378.137 ;// 地球半径;
		s = Math.round(s * 10000) / 10000;
		return s
	},
	/**
	 * 文字超出省略号
	 * @param {Object}  
	 */
	wordlimit(cname, wordlength) {
		if(cname.length>=wordlength) {
			return cname.substring(0,wordlength)+'...'
		} else {
			return cname
		}
	},
	/**
	 * 隐藏手机号中间四位
	 * @param {Object}  
	 */
	hidePhone(phone) {
		var tel = phone;
		var reg = /^(\d{3})\d{4}(\d{4})$/;
		tel = tel.replace(reg, "$1****$2");
		return tel
	},
	/**
	 * 放大缩小反馈动画
	 * @param {Object}  
	 */
	mbAnimation() {
		var animation = uni.createAnimation({
		  transformOrigin: "50% 50%",
		  duration: 500,
		  timingFunction: "ease",
		  delay: 0
		})
		animation.scale(1.06, 1.06).step()
		animation.scale(1, 1).step()
		return animation.export()
	},
	/**
	 * 淡入淡出反馈动画
	 * @param {Object}  
	 */
	fadeInOut(type) {
		var animation = uni.createAnimation({
		  transformOrigin: "50% 50%",
		  duration: 500,
		  timingFunction: "ease",
		  delay: 0
		})
		if(type == 1) {
			animation.opacity(0).step()
			animation.opacity(1).step()
		} else {
			animation.opacity(1).step()
			animation.opacity(0).step()
		}
		return animation.export()
	},
	/**
	 * 判断undefined, 判断null, 判断NaN
	 * @param {Object}  
	 */
	verIllegal(tmp) {
		if((typeof(tmp) == "undefined")||(!tmp && typeof(tmp)!="undefined" && tmp!=0)||(isNaN(tmp))) {
			return ''
		} else {
			return tmp
		}
	},
	/*
	 * 中断当前所有请求
	 */
	abort() {
		var { Http } = require('@/common/request/Http.js')
		const http = new Http()
		http.abort()
	}
}