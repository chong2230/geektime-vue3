/**
 * 按指定格式格式化时间戳
 * @param {Number} time 时间戳，以秒为单位 
 * @param {String} format YYYY-MM-DD H:m:s
 * @return {String}
 */
 export const formatTime = (time, formatStr='YYYY-MM-DD H:m:s') => {
	if (!time) return '';
	let date = new Date(time * 1000);
	let Y = date.getFullYear();
	let M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
	let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
	let h = date.getHours();
	h = h < 10 ? '0' + h : h;
	let m = date.getMinutes();
	m = m < 10 ? '0' + m : m;
	let s = date.getSeconds();
	s = s < 10 ? '0' + s : s;
	return formatStr.replace(/YYYY|MM|DD|H|m|s/ig, function (matches) {
		return ({
			YYYY: Y,
			MM: M,
			DD: D,
			H: h,
			m: m,
			s: s
		})[matches];
	});
}

/**
 * 格式化直播时间戳
 * @param {Number} time 时间戳，以秒为单位 
 * @param {String} format YYYY-MM-DD H:m:s
 * @return {String}
 */
 export const formatLiveTime = (time, formatStr='YYYY-MM-DD H:m:s') => {
	if (!time) return '';
	let date = new Date(time * 1000);
	let M = date.getMonth() + 1;
    let D = date.getDate();
    let days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let day = date.getDay();

	let h = date.getHours();
	h = h < 10 ? '0' + h : h;
	let m = date.getMinutes();
	m = m < 10 ? '0' + m : m;
	return M+'月'+D+'日'+'（'+days[day]+'）'+' '+h+':'+m;
}

/**
 * 通过link字符串获取url
 */
export const getLink = (link, name='url') => {
	let arr = link.split('?');
	if (arr.length > 1) {
		let str = arr[1];
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		let r = str.match(reg);
		if (r != null) {
			return decodeURIComponent(r[2])
		}
	}            
	return ''
}

/**
 * 防抖
 * @param {*} fn 需要防抖的函数
 * @param {*} delay 毫秒，防抖间隔时间
 */
export const debounce = (fn, delay = 500) => {
	let timer = null;	
	return function() {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(fn, delay);
	}
}

let _running = false;
/**
 * 节流
 * @param {*} fn 执行函数
 * @param {*} delay 毫秒，延时时间
 * @returns 
 */
export const throttle = (fn, delay = 500) => {
	if (_running) return;
	_running = true;
	fn();
	setTimeout(() => {
		_running = false;
	}, delay);
}

export const getSaleType = (saleType) => {
	let type = '限时';
	switch(saleType) {
		case 1:
			break;
		case 2:
			type = '限时';
			break;    
		case 3:
			type = '拼团';
			break; 
		default:
			break;

	}
	return type;
}

export const getSaleLabel = (price) => {
	let type = getSaleType(price.sale_type);/*'限时';
	switch(price.sale_type) {
		case 1:
			break;
		case 2:
			type = '限时';
			break;    
		case 3:
			type = '拼团';
			break; 
		default:
			break;

	}*/
	return type + ' ¥' + price.sale/100;
}