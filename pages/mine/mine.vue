<template>
	<view>
		<image src="../../static/image/bg.png" class="bg"></image>
		<view class="head" v-if="isLogin">
			<image :src="userInfo.avatarUrl" class="avatar"></image>
			<view class="name">{{ userInfo.nickName }}</view>
			<image src="../../static/mine/submit.png" class="set"></image>
		</view>
		<view class="head" v-else>
			<!-- #ifndef MP-TOUTIAO -->
			<button @click="getuserinfo">点击登录</button>
			<!-- #endif -->
			<!--#ifdef MP-TOUTIAO-->
			<button @click="getUserInfo">点击登录</button>
			<!-- #endif -->
		</view>
		<view class="handle">
			<view class="submit" @click="goCollection">
				<image src="../../static/mine/collection.png" class="icon"></image>
				<view class="name">我的收藏</view>
			</view>
			<view class="submit" @click="goMore">
				<image src="../../static/mine/submit.png" class="icon"></image>
				<view class="name">更多好玩</view>
			</view>
		</view>
		<view class="menu">
			<view class="submenu" @click="goAccount">
				<image src="../../static/mine/about.png" class="icon"></image>
				公众号
				<image src="../../static/image/right.png" class="icon right"></image>
			</view>
			<view class="submenu" @click="goTreaty">
				<image src="../../static/mine/treaty.png" class="icon"></image>
				用户协议
				<image src="../../static/image/right.png" class="icon right"></image>
			</view>
			<button class="submenu" open-type="share">
				<image src="../../static/mine/share.png" class="icon"></image>
				分享应用
				<image src="../../static/image/right.png" class="icon right"></image>
			</button>
			<view class="submenu" @click="openSetting">
				<image src="../../static/mine/set.png" class="icon"></image>
				系统设置
				<image src="../../static/image/right.png" class="icon right"></image>
			</view>
			<view class="submenu" @click="clearStorageSync">
				<image src="../../static/mine/version.png" class="icon"></image>
				清理缓存
				<image src="../../static/image/right.png" class="icon right"></image>
			</view>
		</view>
	</view>
</template>

<script>
import CFG from '../../utils/config.js';
import API from '../../utils/api.js';
export default {
	data() {
		return {
			miniprogramlist: [],
			userInfo: [],
			isLogin: false
		};
	},
	onLoad() {
		this.miniprogramlist = CFG.miniprogramlist;
		console.log(this.miniprogramlist);
		this.userInfo = uni.getStorageSync('userInfo');
		this.isLogin = uni.getStorageSync('isLogin');
		console.log(this.userInfo);
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo');
		this.isLogin = uni.getStorageSync('isLogin');
	},
	methods: {
		openSetting: function() {
			uni.openSetting({
				success(res) {
					console.log(res.authSetting);
				}
			});
		},
		clearStorageSync: function() {
			uni.clearStorageSync();
			uni.showToast({
				icon: 'none',
				title: '缓存已清除',
				success: () => {
					this.isLogin=false
				}
			});
		},
		surprise: function() {
			uni.showToast({
				icon: 'none',
				title: '敬请期待...'
			});
		},
		goAccount: function() {
			uni.navigateTo({
				url: '/pages/account/account'
			});
		},
		goTreaty: function() {
			uni.navigateTo({
				url: '/pages/treaty/treaty'
			});
		},

		goMore: function() {
			uni.navigateTo({
				url: '/pages/newgame/newgame'
			});
		},
		goCollection:function(){
			uni.navigateTo({
				url: '/pages/collection/collection'
			});
		},
		getuserinfo: function() {
			uni.showLoading({
				title: '登录中'
			});
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
							console.log(res);
							uni.hideLoading();
							that.userInfo.openid = res.data.data;
							uni.setStorageSync('isLogin', true);
							that.isLogin = true;
							uni.setStorageSync('userInfo', that.userInfo);
							uni.setStorageSync('openid', that.userInfo.openid);
							console.log(that.userInfo);
						}
					});
				}
			});
			// #endif
			// #ifdef MP-QQ
			uni.login({
				success(res) {
					if (res.code) {
						var code = res.code;
						uni.getUserProfile({
							success: function(res) {
								console.log(res);
								res.userInfo.code = code;
								that.userInfo = res.userInfo;
								uni.request({
									url: API.QQLogin(that.userInfo),

									success: function(res) {
										// console.log(res);
										uni.hideLoading();
										that.userInfo.openid = res.data.data;
										uni.setStorageSync('isLogin', true);
										that.isLogin = true;
										uni.setStorageSync('userInfo', that.userInfo);
										uni.setStorageSync('openid', that.userInfo.openid);
										console.log(that.userInfo);
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
		}
	}
};
</script>

<style lang="less">
.bg {
	top: 0;
	left: 0;
	width: 750rpx;
	height: 324rpx;
	filter: blur(2rpx);
}
.head {
	width: 690rpx;
	background-color: rgba(255, 255, 255, 0.9);
	height: 250rpx;
	position: absolute;
	top: 200rpx;
	left: 30rpx;
	border-radius: 5rpx;
	box-shadow: 0 0 10rpx #efefef;
	display: flex;
	line-height: 210rpx;
	justify-content: space-between;
	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin: 75rpx 0;
		margin-left: 20rpx;
	}
	.name {
		width: 460rpx;
		text-align: left;
		line-height: 250rpx;
		font-size: 40rpx;
		color: #1f1f1f;
		overflow: hidden;
	}
	.set {
		width: 50rpx;
		height: 50rpx;
		margin: 100rpx 0;
		margin-right: 20rpx;
	}
	button {
		width: 690rpx;
		text-align: center;
		line-height: 250rpx;
		letter-spacing: 15rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #444444;
		background-color: rgba(255, 255, 255, 0.9);
	}
	button:after {
		border: none;
	}
}
.handle {
	display: flex;
	margin: 150rpx 30rpx 30rpx 30rpx;
	justify-content: space-between;
	.submit {
		width: 325rpx;
		height: 150rpx;
		display: flex;
		border-radius: 5rpx;
		box-shadow: 0 0 10rpx #efefef;
		.icon {
			width: 50rpx;
			height: 50rpx;
			margin: 50rpx 30rpx 50rpx 50rpx;
		}
		.name {
			line-height: 150rpx;
			font-size: 30rpx;
			color: #9a9a9a;
		}
	}
}
.menu {
	margin: 40rpx 30rpx 30rpx 40rpx;
	button:after {
		border: none;
	}
	button {
		background-color: #ffffff;
		padding: 0;
	}
	.submenu {
		display: flex;
		margin: 50rpx 0;
		line-height: 50rpx;
		font-size: 30rpx;
		.icon {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}
		.right {
			margin-left: auto;
		}
	}
}
</style>
