// 该程序为阳光艺创站小创果独立开发 
// 小程序使用教程请访问www.i4qq.com进行查看 
// 官方唯一指定交流群：927510477 
// 删除上述文字将不会获得维护 


var domain = "www.anhaowu.com";
var apisec = "480839154";
var API_URL = 'https://' + domain + '/api/';


module.exports = {
	GetDomain: function() {
		return 'https://' + domain + '/';
	},
	GetPosts: function() {
		return this.appendAPISEC(API_URL + 'posts?&pageSize=10');
	},
	GetFriend:function() {
		return this.appendAPISEC(API_URL + 'getfriend?');
	},
	GetRankedPosts: function(idx) {
		return this.appendAPISEC(API_URL + 'posts?&pageSize=30' + '&idx=' + idx);
	},
	GetPostsList: function(page) {
		return this.appendAPISEC(API_URL + 'posts?&pageSize=10' + '&page=' + page);
	},
	GetAboutCid: function() {
		return this.appendAPISEC(API_URL + 'getaboutcid?');
	},
	GetSwiperPost:function() {
		return this.appendAPISEC(API_URL + 'getswiperpost?');
	},

	GetCat: function() {
		return this.appendAPISEC(API_URL + 'getcat?');
	},	
	GetRecommend:function() {
		return this.appendAPISEC(API_URL + 'getrecommend?');
	},
	GetAccessCode: function(url) {
		return this.appendAPISEC(API_URL + 'getaccesscode?path=' + url);
	},
	GetPostsbyCID: function(cid) {
		return this.appendAPISEC(API_URL + 'posts?cid=' + cid);
	},
	GetPagebyCID: function(cid) {
		return this.appendAPISEC(API_URL + 'posts?cid=' + cid + '&getpage=1');
	},
	GetPostsbyMID: function(mid) {
		return this.appendAPISEC(API_URL + 'getpostbymid?mid=' + mid);
	},
	GetPostsbyMIDLimit: function(mid, limit, except) {
		return this.appendAPISEC(API_URL + 'getpostbymid?mid=' + mid + '&pageSize=' + limit + '&except=' + except);
	},
	PostLike: function(cid, openid) {
		return this.appendAPISEC(API_URL + 'likePost?cid=' + cid + '&openid=' + openid);
	},
	GetPostsCommentbyCID: function(cid) {
		return this.appendAPISEC(API_URL + 'getcomment?cid=' + cid);
	},
	GetPostsReplybyCID: function(cid, parent) {
		return this.appendAPISEC(API_URL + 'getcomment?cid=' + cid + '&parent=' + parent);
	},
	Postcomment: function(cid, author, text, parent, icon) {
		return this.appendAPISEC(API_URL + 'addcomment?cid=' + cid + '&author=' + author + '&text=' + text + '&parent=' +
			parent + '&icon=' + icon);
	},
	WXLogin: function(userInfo) {
		return this.appendAPISEC(API_URL + 'WXlogin?code=' + userInfo.code + '&nickname=' + userInfo.nickName +
			'&avatarUrl=' +
			userInfo.avatarUrl + '&city=' + userInfo.city + '&country=' + userInfo.country + '&gender=' + userInfo.gender +
			'&province=' + userInfo.province);
	},
	QQLogin: function(userInfo) {
		return this.appendAPISEC(API_URL + 'login?code=' + userInfo.code + '&nickname=' + userInfo.nickName + '&avatarUrl=' +
			userInfo.avatarUrl + '&city=' + userInfo.city + '&country=' + userInfo.country + '&gender=' + userInfo.gender +
			'&province=' + userInfo.province);
	},
	Getuserlikedinfo: function(cid, openid) {
		return this.appendAPISEC(API_URL + 'getuserlikedinfo?cid=' + cid + '&openid=' + openid);
	},
	Getuserlikedlist: function(cid) {
		return this.appendAPISEC(API_URL + 'getuserlikedlist?cid=' + cid);
	},
	GetServerStat: function() {
		return this.appendAPISEC(API_URL + 'get_stat?');
	},
	Search: function(key) {
		return this.appendAPISEC(API_URL + 'search?keyword=' + key);
	},
	loginsuccess: function(app) {
		return (app.Data.userInfo != null && typeof(app.Data.userInfo.openid) != 'undefined' && app.Data.userInfo.openid !=
			undefined && app.Data.userInfo.openid.length >= 28)
	},
	IsNull(obj) {
		return (obj != null && obj != undefined);
	},

	appendAPISEC: function(url) {
		var request = url + "&apisec=" + apisec;
		return (request);
	},
	randomHexColor() { //随机生成十六进制颜色
		var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
		while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
			hex = '0' + hex;
		}
		return '#' + hex; //返回‘#'开头16进制颜色
	},
	//获取距今天数
	getcreatedtime(created) {
		var now = Date.parse(new Date()) / 1000;
		console.log(now)
		var span = (now - created) > 0 ? (now - created) : 0;
		if (span <= 3600) {
			var ts = Math.round(span / 60);
			return (ts + '分钟前');
		} else if (span < 86400) {
			var ts = Math.round(span / 3600);
			return (ts + '小时前');
		} else {
			var ts = Math.round(span / 86400);
			return (ts + '天前');
		}
	},
	//获取日期
	formatDate(datetime) {
		var datetime = new Date(parseInt(datetime * 1000));
		// 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
		var year = datetime.getFullYear(),
			month = ("0" + (datetime.getMonth() + 1)).slice(-2),
			date = ("0" + datetime.getDate()).slice(-2),
			hour = ("0" + datetime.getHours()).slice(-2),
			minute = ("0" + datetime.getMinutes()).slice(-2);
		//second = ("0" + date.getSeconds()).slice(-2);
		// 拼接
		var result = year + "-" + month + "-" + date + " " + hour + ":" + minute;
		// 返回
		return result;
	},
}
