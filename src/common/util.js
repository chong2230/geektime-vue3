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