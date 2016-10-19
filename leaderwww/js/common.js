var _Global = {
	webRoot: "/leader",
	/**
	 * 公用ajax get 方法
	 * @param {Object} url
	 * @param {Object} dataType  default text
	 * @param {Object} callbackSuccess
	 * @param {Object} callbackError
	 */
	get: function(url, dataType, callbackSuccess, callbackError) {
		var options = {
			url: url,
			type: "get",
			dataType: dataType || "text",
			success: function(rs) {
				if(callbackSuccess) {
					callbackSuccess(rs);
				}
			},
			error: function(a, b, c) {
				if(callbackError) {
					callbackError(a);
				}
			}
		};
		$.ajax(options);
	},
	/**
	 * 公用ajax post 方法
	 * @param {Object} url
	 * @param {Object} dataType
	 * @param {Object} data
	 * @param {Object} callbackSuccess
	 * @param {Object} callbackError
	 */
	post: function(url, dataType, data, callbackSuccess, callbackError) {
		var options = {
			url: url,
			type: "post",
			data: data,
			dataType: dataType || "text",
			success: function(rs) {
				if(callbackSuccess) {
					callbackSuccess(rs);
				}
			},
			error: function(a, b, c) {
				if(callbackError) {
					callbackError(a);
				}
			}
		};
		$.ajax(options);
	},
	/**
	 * 
	 * @param {Object} paramName
	 */
	getUrlParam: function(paramName) {
		var url = window.location.href;
		var oRegex = new RegExp('[\?&]' + paramName + '=([^&]+)', 'i');
		var oMatch = oRegex.exec(url);
		if(oMatch && oMatch.length > 1) {
			return decodeURI(oMatch[1]);
		} else {
			return "";
		}
		return this;
	}
};

Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, // month
		"d+": this.getDate(), // day
		"h+": this.getHours(), // hour
		"m+": this.getMinutes(), // minute
		"s+": this.getSeconds(), // second
		"q+": Math.floor((this.getMonth() + 3) / 3), // quarter
		"S": this.getMilliseconds()
			// millisecond
	}

	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}