/*===========================
 工具对象
 ===========================*/
var Utils = Utils || {};

/**
 * 获取浏览器内核
 * */
Utils.browser = function() {
	var versions = '';
	return {
		getVersion: function() {
			if (!versions) {
				var u = window.navigator.userAgent;
				versions = {
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
					iPad: u.indexOf('iPad') > -1, //是否为iPad
					webApp: u.indexOf('Safari') == -1, //是否为web应用程序，没有头部与底部
					weixin: u.indexOf('MicroMessenger') !== -1 //是否为微信浏览器
				};
			}
			return versions;
		}
	};
}();
/**
 * 获取浏览器终端
 * */
Utils.mobileForm = function() {
	var appType = '';
	return {
		getMobileForm: function() {
			if (!appType) {
				var browser = Utils.browser.getVersion();
				//  1. 是否为移动终端
				if (browser.mobile) {
					if (browser.ios || browser.iPhone || browser.iPad) {
						//  3. 是否为ios移动终端
						appType = "ios";
					} else if (browser.android) {
						//  4. 是否为android移动终端
						appType = "android";
					} else {
						appType = "web";
					}
				} else {
					// 2. 是否为web 端
					appType = "web";
				}
			}
			return appType;
		}
	};
}();

/**
 * rem实现页面自适应
 * */
Utils.adaptive = function () {
    !function () {
        function e() {
            var e = document.documentElement.clientWidth, t = document.querySelector("html"),
                f = (e > 750 ? 750 : e) / 20;
            window.fontSize = f;
            t.style.fontSize = f + "px"
        }

        e(), window.addEventListener("resize", e);
    }();
};

/**
 * 获取url链接上的参数
 * */
Utils.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return "";
};
/**
 * 生成链接url，params
 * */
Utils.createUrl = function (serviceURL, obj) {
    var url = serviceURL + "?";
    for (var key in obj) {
        url += key + '=' + obj[key] + '&';
    }
    return url.substring(0, url.lastIndexOf('&'));
};
/**
 * 倒计时
 * @param time 倒计时间多少秒
 * @param secondsCallback 每秒回调
 * @param callBack 倒计时结束回调
 * */
Utils.countdown = function (time, secondsCallback, callBack) {
    var time = parseInt(time);
    secondsCallback && secondsCallback(time);
    var timer = setInterval(function () {
        time--;
        secondsCallback && secondsCallback(time);
        if (time <= 0) {
            callBack && callBack();
            clearInterval(timer);
        }
    }, 1000);
};

/**
 * cookie
 * */
Utils.cookie = {
    /**
     * 设置cookie元素
     * @param cname
     * @param cvalue
     * @param exdays
     * @return
     */
    set: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    },
    /**
     * 获取cookie元素
     * @param cname
     * @return
     */
    get: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    /**
     * 删除cookie元素
     * @param name
     * @return
     */
    del: function (name) {
        setCookie(name, "", -1);
    }
};

/**
 * sessionStorage
 * */
Utils.sessionStorage = {
	setItem: function(key, value) {
		try {
			sessionStorage.setItem(key, value);
		} catch (error) {}
	},
	getItem: function(key) {
		try {
			return sessionStorage.getItem(key);
		} catch (error) {}
	}
};

/**
 * 事件
 * */
var eventUtil = {
	/**
	 * 添加事件
	 * @param element 事件对象
	 * @param type 事件类型
	 * @param handler 事件方法
	 * @param data 当一个事件被触发时要传递event.data给事件处理函数
	 * 格式 {element:"",type:"",handler:function,data:{}}
	 * */
	addHandler: function(obj) {
		var element = obj.element;
		var type = obj.type;
		var handler = obj.handler;
		var data = obj.data;
		$(element).on(type, data, handler);
	},

	/**
	 * 获取事件
	 * */
	getEvent: function(event) {
		return event ? event : window.event;
	},

	/**
	 * 获取目标源
	 * */
	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	/**
	 *  移除事件
	 * @param element 事件对象
	 * @param type 事件类型
	 * @param handler 事件方法
	 * 格式 {element:"",type:"",handler:function}
	 * */
	removeHandler: function(obj) {
		var element = obj.element;
		var type = obj.type;
		var handler = obj.handler;
		$(element).off(type, handler);
	},

	/**
	 * 阻止默认事件
	 * */
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	/**
	 * 阻止事件冒泡
	 * */
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};

/**
 * 生成32位随机码
 * */
function randomCode() {
	var timestamp = new Date().getTime().toString();
	var arr = 'abcdefghijklmnopqrstuvwsyz0123456789'.split('');
	var nonce = '',
		len = 32 - timestamp.length;
	for (var i = 0; i < timestamp.length; i++) {
		nonce += arr[timestamp[i]];
	}
	for (var j = 0; j < len; j++) {
		var num = Math.round(Math.random() * 35);
		nonce += arr[num];
	}
	return nonce;
}

/**
 * 获取随机数
 * */
function getRandom(length) {
	var res = Math.random().toString().slice(2);
	if (res.length > length) return res.slice(0, length);
	while (res.length < length) {
		res += Math.floor(Math.random() * 10)
	}
	return res;
}
