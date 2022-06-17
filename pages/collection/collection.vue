<template>
	<view>
		<view class="no_find" v-if="collectionList.length == 0">
			<image src="../../static/image/403.png"></image>
			<view class="tip">{{ tip }}</view>
		</view>
		<view class="list">
			<view
				class="card"
				v-for="(item, index) in collectionList"
				:key="index"
				:style="[{ backgroundImage: 'url(' + item.thumb[0].str_value + ')' }]"
				@click="goDetails(item.cid)"
			>
				<view class="content">{{ item.title }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import API from '../../utils/api.js';
export default {
	data() {
		return {
			collectionList: [],
			tip:'未登录或无收藏'
		};
	},
	onLoad() {
		this.getList();
	},
	methods: {
		getList: function() {
			let openid = uni.getStorageSync('openid');
			console.log(openid);
			uni.request({
				url: API.GetUserCollection(openid),
				success: res => {
					console.log(res.data.data);
					if (res.data.data != 'none') {
						this.collectionList = res.data.data;
					}
				}
			});
		},
		goDetails: function(cid) {
			uni.navigateTo({
				url: '/pages/details/details?cid=' + cid
			});
		}
	}
};
</script>

<style lang="less" scoped>
.no_find {
	image {
		width: 600rpx;
		height: 468rpx;
		margin: 30rpx 75rpx;
	}
	.tip {
		text-align: center;
		font-size: 30rpx;
		color: #c0c0c0;
	}
}
.list {
	.card {
		margin: 25rpx;
		width: 700rpx;
		height: 150rpx;
		background-size: 700rpx 150rpx;
		border-radius: 20rpx;
		font-size: 30rpx;
		background-size: cover;
		.content {
			border-radius: 20rpx;
			height: 150rpx;
			background-color: rgba(71, 71, 71, 0.3);
			padding: 0 30rpx;
			color: #ffffff;
			text-align: center;
			line-height: 150rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.tag {
			width: 40rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			border-radius: 50%;
			color: #9c9c9c;
			position: relative;
			top: -140rpx;
			right: -650rpx;
			font-size: 18rpx;
			background-color: #ece4ff;
		}
	}
}
</style>
