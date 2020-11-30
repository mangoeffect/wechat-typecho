<template>
	<view>
		<view class="poster">
			<image src="../../static/aboutposter.png" mode="widthFix"></image>
		</view>
		<view class="list">
			<view class="card" @click="surprise">
				<image src="../../static/mine/dingyue.png" mode="widthFix"></image>
				<view class="content">订阅</view>
			</view>
			<view class="card" @click="surprise">
				<image src="../../static/mine/bangzhu.png" mode="widthFix"></image>
				<view class="content">帮助</view>
			</view>
			<!-- #ifdef MP-QQ -->
			<button class="card" open-type = "openGroupProfile"  group-id="660459637">
				<image src="../../static/mine/jiaoliuqun.png" mode="widthFix"></image>
				<view class="content">交流群</view>
			</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button class="card" @click="goAccount">
				<image src="../../static/mine/jiaoliuqun.png" mode="widthFix"></image>
				<view class="content">公众号</view>
			</button>
			<!-- #endif -->
			
			<view class="card" @click="goMore">
				<image src="../../static/mine/xihuan.png" mode="widthFix"></image>
				<view class="content">更多好玩</view>
			</view>
			<view class="card" @click="openSetting">
				<image src="../../static/mine/shezhi.png" mode="widthFix"></image>
				<view class="content">设置</view>
			</view>
			
		</view>

	</view>
</template>

<script>
	import CFG from "../../utils/config.js";
	export default {
		data() {
			return {
				miniprogramlist:[]
			}
		},
		onLoad() {
			this.miniprogramlist = CFG.miniprogramlist
			console.log(this.miniprogramlist)
		},
		methods: {
			openSetting: function() {
				uni.openSetting({
					success(res) {
						console.log(res.authSetting)
					}
				});
			},
			clearStorageSync: function() {
				uni.clearStorageSync()
				uni.showToast({
					icon: "none",
					title: "缓存已清除"
				})
			},
			surprise:function(){
				uni.showToast({
					icon:"none",
					title:"敬请期待..."
				})
			},
			goAccount:function(){
				uni.navigateTo({
					url:"/pages/account/account"
				})
			},
			
			goMore:function(){
				uni.navigateTo({
					url:"/pages/newgame/newgame"
				})
			}

		}
	}
</script>

<style lang="less">
	.poster{
		padding: 20rpx 0;
		border-top: 1rpx #f5f5f5 solid;
		image{
			width: 700rpx;
			border-radius: 40rpx;
			margin: 0 25rpx;
		
		}
	}
	.list{
		.card{
			display: flex;
			box-shadow: 0 0 100rpx #f0f0f0;
			width: 650rpx;
			margin: 40rpx 50rpx;
			padding: 20rpx;
			border-radius: 30rpx;
			image{
				width: 65rpx;
			}
			.content{
				margin-left: 30rpx;
				line-height: 65rpx;
				font-size: 32rpx;

			}
		}
		button{
			background-color: #FFFFFF;
		}
		button:after{
			border: none;
		}
	}
</style>
