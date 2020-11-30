<template>
	<view>
		<view class="card" v-for="(item,index) in list" :key="index" @click="navigateToMiniProgram(item.appid)">
			<image :src="item.image" mode="widthFix"></image>
			<view class="name">{{item.name}}</view>
		</view>
		<view class="copyright">-- {{title}} --</view>
	</view>
</template>

<script>
import API from '../../utils/config.js';
export default {
	data() {
		return {
			list: [],
			title:"本程序由小创果开发"
		};
	},
	onLoad() {
		this.list = API.miniprogramlist;
		console.log(this.list)
	},
	methods: {
		navigateToMiniProgram: function(e) {
			uni.navigateToMiniProgram({
				appId: e,
				path: 'pages/index/index',
				success(res) {
					// 打开成功
				}
			})
		},
	}
};
</script>

<style lang="less">
	page{
		padding-top: 30rpx;
	}
	.card{
		display: flex;
		width: 700rpx;
		margin: 30rpx 25rpx;
		box-shadow: 0 0 100rpx #ececec;
		padding: 10rpx;
		border-radius: 20rpx;
		image{
			width: 100rpx;
			border-radius: 20rpx;
			margin-left: 20rpx;
		}
		.name{
			line-height: 100rpx;
			font-size: 30rpx;
			margin-left: 30rpx;
		}
	}
	.copyright{
		position: absolute;
		width: 750rpx;
		text-align: center;
		bottom: 10rpx;
		color: #a1a1a1;
	}
</style>
