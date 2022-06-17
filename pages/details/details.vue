<template>
	<view>
		<view class="top">
			<view class="title">{{ title }}</view>
			<view style="display: flex;">
				<view class="time">{{ time }}</view>
				<view class="views">
					<text class="cuIcon-attention margin-right-xs"></text>
					{{ views }}
				</view>
			</view>
		</view>
		<view class="content">
				<towxml :nodes="htmlContent"/>
		</view>
		
		<view class="new_ad" v-if="isPay == '1'" @click="unlockContent">观看一则视频广告，查看全部...</view>
		<view class="encryption" v-if="encrypted != ''">
			<view v-if="!decrypt">
				<view class="encryption_title">该文章有加密内容</view>
				<!-- #ifndef MP-QQ -->
				<view class="msiaosu">
					您可以关注公众号发送关键词：
					<text class="text-red">{{ keyword }}</text>
				</view>
				<input type="number" v-model="vcode" placeholder="请输入密钥" placeholder-style="color:#484848;font-size: 25rpx;" />
				<!-- #endif -->
				<view class="flexa">
					<!-- #ifndef MP-QQ -->
				<!-- 	<button class="copy" @click="copy(keyword)">复制关键词</button> -->
					<button class="get" @click="getEncrypted">获取资源</button>
					<!-- #endif -->
					<button class="adget" @click="adGet">广告解锁</button>
				</view>
			</view>
			<view v-else>
				<view class="encryption_title">恭喜您解锁了该内容</view>
				<view class="encrypted_content">{{ encrypted }}</view>
				<button class="copy" @click="copy(encrypted)">复制内容</button>
			</view>
		</view>
		<view class="mask" @touchmove.prevent catchtouchmove="ture" v-if="showLogin">
			<view class="login">
				<view class="login_title">用户登录</view>
				<view class="login_content">博客部分操作需要您登录后才可以进行，点击登录按钮即可登录</view>
				<image src="../../static/login.png" mode="widthFix"></image>
				<view class="login_btn">
					<button @click="colseLogin">算了</button>
					<!-- #ifdef MP-WEIXIN -->
					<button @click="getuserinfo">点击登录</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<button open-type="getUserInfo" @getuserinfo="getuserinfo">登录</button>
					<!-- #endif -->
					
				</view>
			</view>
		</view>
		<view class="ad"><ad unit-id="adunit-aeed43498ec75860" ad-type="video" ad-theme="white"></ad></view>
		<view class="copyright" :style=" commentsNum == '0' ? 'margin-bottom: 100rpx;' : ''">
			<!-- #ifndef MP-QQ -->
			<view class="account">{{ account }}</view>
			<!-- #endif -->
			<view class="website">{{ website }}</view>
		</view>

		<view >
			<view class="comments" v-if="commentsNum != '0'">
				<view class="comments_title">评论列表</view>
				<view class="comments_des" v-for="(item, index) in comments" :key="index">
					<view class="comments_flex">
						<image :src="item.authorImg" mode="widthFix" v-if="item.authorImg != null && item.authorImg != 'undefined'"></image>
						<view class="author" v-else>A</view>
						<view class="comments_name">{{ item.author }}</view>
						<view class="time">{{ formatDate(item.created) }}</view>
					</view>
					<view class="comment">{{ item.text }}</view>
					<view class="replays" v-if="item.replays">
						<view class="replays_author">{{ item.replays[0].author }}</view>
						<view class="replays_text">{{ item.replays[0].text }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="btm">
			<button class="likes" @click="fabulous">
				<image src="../../static/details/dianzan.png" mode="widthFix" v-if="isLike == 'false'"></image>
				<image src="../../static/details/dianzan_c.png" mode="widthFix" v-else></image>
				<view>{{ likes }}</view>
			</button>
			<button @click="showInp" v-if="showshare == '1'">
				<image src="../../static/details/pinglun.png" mode="widthFix" v-if="!showCmt"></image>
				<image src="../../static/details/pinglun_c.png" mode="widthFix" v-else></image>
			</button>
			<button open-type="share"><image src="../../static/details/fenxiang.png" mode="widthFix"></image></button>
			<button @click="getPoster"><image src="../../static/details/haibao.png" mode="widthFix"></image></button>
		</view>
		<view class="cmt_input" v-if="showCmt"><input v-model="commentText" placeholder="请输入评论内容" placeholder-class="placeholder" @confirm="addComment" /></view>
		<view class="canvas-box"><canvas canvas-id="canvas" class="canvas" style="width: 350px; height: 450px;"></canvas></view>
		<view class="mask_poster" v-if="showPoster" @touchmove.prevent catchtouchmove="ture">
			<image :src="poster" v-if="poster" mode="widthFix" class="poster"></image>
			<view class="poster_btn">
				<button class="close" @click="closePoster">还是算了</button>
				<button class="save_poster" @click="savePoster">立即保存</button>
			</view>
		</view>
	</view>
</template>

<script>
var videoAd = null;
var videoContentAd = null;
import marked from 'marked';
import jyfParser from '@/components/jyf-parser/jyf-parser';
import API from '../../utils/api.js';
import CFG from '../../utils/config.js';
import towxml from '../../static/towxml/towxml'

export default {
	data() {
		return {
			cid: '145',
			title: '',
			htmlContent:"",
			content: '',
			encryptionContent: '',
			thumb: '',
			time: '',
			likes: '',
			views: '',
			mid: '',
			author: '',
			website: '',
			account: '',
			keyword: '',
			isPay: '',
			code: '',
			encrypted: '',
			showshare: '',
			commentsNum: '0',
			comments: [],
			commentText: '',
			vcode: '',
			decrypt: false,
			showLogin: false,
			userInfo: [],
			isLike: 'false',
			showCmt: false,
			showPoster: false,
			poster: '',
			description: '',
		};
	},
	components: {
	    jyfParser,
		towxml
	},

	onLoad(e) {
		this.cid = e.cid;
		console.log(this.cid);
		this.getArticle();
		this.getComments();
		this.getUserLike();
		this.userInfo = uni.getStorageSync('userInfo');
		//#ifndef H5
		this.adLoad();
		//#endif
		console.log(this.userInfo);
	},
	onShareAppMessage: function() {
		return {
			title: this.title,
			path: '/pages/details/details?cid=' + this.cid
		};
	},
	onShareTimeline: function() {
		return {
			title: this.title
		};
	},
	methods: {
		getArticle: function() {
			var that = this;
			var cid = this.cid;
			uni.request({
				url: API.GetPostsbyCID(cid),
				success: function(res) {
					var a = res.data.data[0];
					console.log(a);
					that.isPay = a.isPay[0].str_value;
					let content_parse = that.towxml(a.text.replace(/!!!/g,""),'markdown');
					that.content = content_parse;
					//that.encryptionContent = that.content.substr(0, parseInt(that.content.length * 0.2));
					that.encryptionContent = towxml(a.text.substr(0, parseInt(that.content.length * 0.2)).replace(/!!!/g, ""),'markdown');
					if(that.isPay=='1'){
						that.htmlContent = that.encryptionContent
					}else{
						that.htmlContent = that.content
					}
					that.title = a.title;
					that.showshare = a.showshare;
					that.thumb = a.thumb[0].str_value;
					that.time = a.year + '年' + a.month + '月' + a.day + '日';
					that.likes = a.likes[0].likes;
					that.views = a.views[0].views;
					that.commentsNum = a.commentsNum;
					that.mid = a.categories[0].mid;
					that.author = a.author;
					that.website = a.website;
					that.account = a.account;
					that.keyword = a.keyword[0].str_value;
					
					that.code = a.code[0].str_value;
					that.encrypted = a.encrypted[0].str_value;
					that.description = a.description[0].str_value;
					that.getPostsbyMIDLimit(that.mid);
					that.getComments(cid);
					console.log(that.description);
				}
			});
		},
		showInp: function() {
			this.showCmt = !this.showCmt;
		},
		closePoster: function() {
			this.showPoster = false;
		},
		savePoster: function() {
			var that = this;
			uni.saveImageToPhotosAlbum({
				filePath: this.poster,
				success(res) {
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					});
					that.showPoster = false;
				},
				fail(res) {
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					});
				}
			});
		},
		getuserinfo: function() {
			var that = this;
			// #ifdef MP-WEIXIN
			let code = '';
			uni.login({
				success: res => {
					console.log(res);
					code = res.code;
				}
			});
			uni.getUserProfile({
				desc: '用于完善会员资料',
				success: res => {
					console.log(res);
					res.userInfo.code = code;
					that.userInfo = res.userInfo;
					uni.request({
						url: API.WXLogin(that.userInfo),
						success: res => {
							that.userInfo.openid = res.data.data;
							uni.setStorageSync('isLogin', true);
							uni.setStorageSync('userInfo', that.userInfo);
							uni.setStorageSync('openid', that.userInfo.openid);
							that.showLogin = false;
						}
					});
				}
			});
			// #endif
			//其他登录
			// #ifndef MP-WEIXIN
			uni.login({
				success(res) {
					// console.log(res)
					if (res.code) {
						//发起网络请求
						var code = res.code;
						// 获取微信用户信息
						uni.getUserInfo({
							success: function(res) {
								res.userInfo.code = code;
								that.userInfo = res.userInfo;
								uni.request({
									// #ifdef MP-WEIXIN
									url: API.WXLogin(that.userInfo),
									// #endif
									// #ifdef MP-QQ
									url: API.QQLogin(that.userInfo),
									// #endif
									success: function(res) {
										// console.log(res);
										that.userInfo.openid = res.data.data;
										uni.setStorageSync('isLogin', true);
										uni.setStorageSync('userInfo', that.userInfo);
										uni.setStorageSync('openid', that.userInfo.openid);
										that.showLogin = false;
										// console.log(that.userInfo);
									}
								});
							},
							fail: res => {
								// 获取失败的去引导用户授权
							}
						});
					} else {
					}
				}
			});
			// #endif
		},
		getPoster: function() {
			uni.showLoading({
				title: '海报生成中'
			});
			var that = this;
			uni.downloadFile({
				url: that.thumb,
				success: res => {
					// console.log(res)
					var localimg = res.tempFilePath;
					var ctx = uni.createCanvasContext('canvas');
					ctx.setFillStyle('white'); //填充白色
					ctx.fillRect(0, 0, 350, 600);
					ctx.drawImage(localimg, 0, 0, 350, 200);

					ctx.setFontSize(16);
					ctx.setFillStyle('#1e1e1e');
					const title = that.title;
					ctx.fillText(title, 10, 230);
					//#ifndef MP-QQ
					let xcxm = '../../static/wxcxm.png';
					//#endif
					//#ifdef MP-QQ
					let xcxm = '../../static/qxcxm.png';
					//#endif
					ctx.drawImage(xcxm, 130, 300, 100, 100);

					ctx.draw(false, res => {
						uni.canvasToTempFilePath({
							canvasId: 'canvas',
							width: 350,
							height: 450,
							success: function(res) {
								uni.hideLoading();
								that.showPoster = true;
								that.poster = res.tempFilePath;
								// console.log(that.poster);
							}
						});
					});
				}
			});
		},
		adLoad: function() {
			if (wx.createRewardedVideoAd) {
				videoAd = wx.createRewardedVideoAd({
					adUnitId: CFG.adId.createRewardedVideoAd
				});
				videoAd.onLoad(() => {});
				videoAd.onError(err => {});
				videoAd.onClose(status => {
					if ((status && status.isEnded) || status === undefined) {
						this.decrypt = true;
					} else {
					}
				});
			}
			if (wx.createRewardedVideoAd) {
				videoContentAd = wx.createRewardedVideoAd({
					adUnitId: CFG.adId.createRewardedVideoAd
				});
				videoContentAd.onLoad(() => {});
				videoContentAd.onError(err => {});
				videoContentAd.onClose(status => {
					if ((status && status.isEnded) || status === undefined) {
						this.isPay = "0";
						this.htmlContent = this.content
					}else{
						
					}
				});
			}
		},
		adGet: function() {
			if (videoAd) {
				videoAd.show().catch(() => {
					// 失败重试
					videoAd
						.load()
						.then(() => videoAd.show())
						.catch(err => {
							console.log('激励视频 广告显示失败');
						});
				});
			}
		},
		unlockContent:function(){
			if (videoContentAd) {
				videoContentAd.show().catch(() => {
					// 失败重试
					videoContentAd
						.load()
						.then(() => videoContentAd.show())
						.catch(err => {
							console.log('激励视频 广告显示失败');
						});
				});
			}
		},
		addComment: function() {
			var that = this;
			var openid = uni.getStorageSync('openid');
			var a = that.userInfo;
			var cmt = that.commentText;
			if (openid) {
				if (cmt == '') {
					uni.showToast({
						icon: 'none',
						title: '总得写些什么吧'
					});
				} else {
					uni.request({
						url: API.Postcomment(that.cid, a.nickName, cmt, that.replaycoid, a.avatarUrl),
						success: function(res) {
							that.getComments(that.cid);
							that.commentText = '';
							uni.showToast({
								title: '评论需要审核才可以显示',
								icon: 'none'
							});
						}
					});
				}
			} else {
				this.showLogin = true;
			}
		},
		colseLogin: function() {
			this.showLogin = false;
		},
		getUserLike: function() {
			var cid = this.cid;
			var openid = uni.getStorageSync('openid');
			uni.request({
				url: API.Getuserlikedinfo(cid, openid),
				success: res => {
					this.isLike = res.data.data;
					// console.log(res.data.data)
				}
			});
		},
		fabulous: function() {
			var cid = this.cid;
			var openid = uni.getStorageSync('openid');
			if (openid) {
				uni.request({
					url: API.PostLike(cid, openid),
					success: res => {
						var status = res.data.data.status;
						if (status == 'like') {
							this.isLike = 'true';
							this.likes = this.likes + 1;
						} else {
							this.isLike = 'false';
							this.likes = this.likes - 1;
						}
					}
				});
			} else {
				this.showLogin = true;
			}
		},

		getPostsbyMIDLimit: function(mid) {
			var that = this;
			uni.request({
				url: API.GetPostsbyMIDLimit(mid, 3, that.cid),
				success: function(res) {
					if (res.data.data.length == 0) {
					} else {
						that.relatedShow = true;
						that.related = res.data.data;
						// console.log(that.related)
					}
				}
			});
		},
		copy: function(a) {
			uni.setClipboardData({
				data: a,
				success() {
					uni.showToast({
						icon: 'none',
						title: '复制成功'
					});
				}
			});
		},
		getEncrypted: function() {
			if (this.vcode == this.code) {
				this.decrypt = true;
			} else {
				uni.showToast({
					icon: 'none',
					title: '口令错误'
				});
			}
		},
		formatDate(datetime) {
			var datetime = new Date(parseInt(datetime * 1000));
			// 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
			var year = datetime.getFullYear(),
				month = ('0' + (datetime.getMonth() + 1)).slice(-2),
				date = ('0' + datetime.getDate()).slice(-2),
				hour = ('0' + datetime.getHours()).slice(-2),
				minute = ('0' + datetime.getMinutes()).slice(-2);
			//second = ("0" + date.getSeconds()).slice(-2);
			// 拼接
			var result = year + '-' + month + '-' + date;
			// 返回
			return result;
		},
		getComments: function() {
			var that = this;
			uni.request({
				url: API.GetPostsCommentbyCID(that.cid),
				success: function(res) {
					that.comments = res.data.data;
					console.log(that.comments);
				}
			});
		}
	}
};
</script>

<style lang="less">
page {
	padding-bottom: 100rpx;
}
.ad {
	padding: 20rpx;
}
.new_ad {
	text-align: center;
	color: #55aaff;
	margin: 30rpx 0;
}

.btm {
	position: fixed;
	background-color: #ffffff;
	width: 750rpx;
	bottom: 0;
	height: 85rpx;
	display: flex;
	justify-content: space-around;
	padding: 10rpx 15rpx;
	z-index: 9999;
	image {
		width: 45rpx;
	}
	button::after {
		border: none;
	}
	button {
		background-color: #ffffff;
		height: 70rpx;
		// margin-top: 12rpx;
	}
	.likes {
		display: flex;
		background-color: #55aaff;
		width: 160rpx;
		padding-left: 35rpx;
		margin-top: 12rpx;
		border-radius: 30rpx;
		height: 50rpx;
		box-shadow: 0 0 30rpx #d4d4d4;
		view {
			padding-left: 15rpx;
			line-height: 50rpx;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}
.mask_poster {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 99999;
	background-color: rgba(0, 0, 0, 0.5);
	image {
		
		width: 500rpx;
		margin: 300rpx 125rpx 0 125rpx;
	}
	.poster_btn {
		display: flex;
		position: fixed;
		top: 1000rpx;
		button {
			width: 200rpx;
			font-size: 30rpx;
		}
		.close {
			margin-left: 125rpx;
			background-color: #d2f1f0;
		}
		.save_poster {
			margin-left: 100rpx;
			background-color: #0081ff;
			color: #ffffff;
		}
		button:after {
			border: none;
		}
	}
}
.canvas-box {
	position: fixed;
	top: 1000px;
	left: 1000px;
	z-index: -10;
}
.cmt_input {
	background-color: #ffffff;
	position: fixed;
	bottom: 80rpx;
	padding-top: 10rpx;

	input {
		box-shadow: 0 0 10rpx #f1f1f1;
		border-radius: 30rpx;
		width: 700rpx;
		margin: 0 25rpx;
		padding: 0 30rpx;
		height: 60rpx;
		font-size: 28rpx;
	}
	.placeholder {
		color: #626262;
	}
}
.mask {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 999;
	background: rgba(0, 0, 0, 0.5);
	overflow: hidden;

	.login {
		position: absolute;
		left: 125rpx;
		background-color: #ffffff;
		top: 200rpx;
		width: 500rpx;
		height: 700rpx;
		padding: 20rpx;

		.login_title {
			margin-top: 50rpx;
			text-align: center;
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}

		.login_content {
			text-align: center;
			font-size: 30rpx;
			margin: 20rpx;
		}

		.login_btn {
			display: flex;
			margin-top: 20rpx;

			button {
				width: 200rpx;
				font-size: 30rpx;
			}

			button:after {
				border: none;
			}

			button:last-child {
				background-color: #0081ff;
				color: #ffffff;
			}
		}
	}
}

.top {
	.title {
		font-size: 40rpx;
		font-weight: bold;
		padding: 20rpx;
	}

	.time {
		font-size: 30rpx;
		color: #8799a3;
		margin: 10rpx 30rpx;
	}

	.views {
		font-size: 30rpx;
		color: #8799a3;
		margin: 10rpx 30rpx;
		margin-left: auto;
	}
}

.content {
	margin: 20rpx;
	word-wrap:break-word; 
	word-break:normal;
	word-break:break-all;
}

.copyright {
	margin: 20rpx;
	display: flex;
	font-size: 20rpx;
	line-height: 40rpx;
	border-top: 1rpx solid #efefef;
	padding-top: 10rpx;
	color: #8799a3;

	.website {
		margin-left: auto;
	}
}

.comments {
	margin: 30rpx 20rpx 100rpx 20rpx;

	.comments_title {
		font-size: 35rpx;
		width: 140rpx;
		padding-bottom: 10rpx;
		border-bottom: 5rpx solid #000000;
		margin-bottom: 30rpx;
	}

	.comments_des {
		border-bottom: 1rpx solid #f5f5f5;

		.comments_flex {
			display: flex;
			margin-top: 20rpx;

			image {
				width: 70rpx;
				border-radius: 10rpx;
			}
		}

		.author {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			font-size: 20rpx;
			background-color: #888888;
			line-height: 70rpx;
			text-align: center;
			color: #ffffff;
		}

		.comments_name {
			line-height: 70rpx;
			margin-left: 20rpx;
			font-size: 30rpx;
			color: #8c8c8c;
		}

		.time {
			margin-left: auto;
			line-height: 60rpx;
			font-size: 28rpx;
			color: #8c8c8c;
		}

		.comment {
			margin: 30rpx;
			margin-left: 80rpx;
			font-size: 30rpx;
		}

		.replays {
			display: flex;
			margin: 20rpx;
			border: 1rpx solid #d5d5d5;
			font-size: 28rpx;
			padding: 10rpx;

			.replays_author {
				background-color: #b8d0dd;
				padding: 5rpx;
				margin-right: 10rpx;
			}

			.replays_text {
				line-height: 48rpx;
			}
		}
	}

	.comments_des:last-child {
		border: none;
	}
}

.encryption {
	margin: 30rpx;
	padding: 10rpx;
	box-shadow: 0 0 10rpx #f1f1f1;
	border-radius: 10rpx;
	text-align: center;

	.encryption_title {
		text-align: center;
		margin-bottom: 20rpx;
		font-weight: bold;
		font-size: 35rpx;
		padding: 20rpx;
	}

	.encrypted_content {
		font-size: 30rpx;
		line-height: 60rpx;
	}

	input {
		background-color: #eaeaea;
		border-radius: 20rpx;
		height: 60rpx;
		margin: 10rpx;
		color: #444444;
	}

	button::after {
		border: none;
	}

	button {
		background-color: #e8e8e8;
		font-size: 28rpx;
	}

	.flexa {
		display: flex;

		.adget {
			background-color: #5555ff;
			color: #ffffff;
		}
	}
}

// .bottom {
// 	position: fixed;
// 	display: flex;
// 	width: 750rpx;
// 	height: 90rpx;
// 	background-color: #ffffff;
// 	bottom: 0;
// 	padding-top: 10rpx;
// 	box-shadow: 0 0 1rpx #dedede;

// 	input {
// 		width: 400rpx;
// 		background-color: #e8e8e8;
// 		height: 60rpx;
// 		margin: 10rpx;
// 		border-radius: 30rpx;
// 		padding-left: 30rpx;
// 	}

// 	.placeholder {
// 		color: #8a8a8a;
// 	}

// 	image {
// 		width: 60rpx;
// 		margin: 10rpx;
// 	}

// 	button {
// 		background-color: #ffffff;

// 		image {
// 			width: 60rpx;
// 			margin: 10rpx;
// 		}
// 	}

// 	button:after {
// 		border: none;
// 	}
// }
</style>
