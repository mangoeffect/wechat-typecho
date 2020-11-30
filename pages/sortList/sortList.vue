<template>
	<view>
		<view class="top">
			{{name}}
		</view>
		<view class="article_list">
			<view class="article" v-for="(item,index) in articleList" :key="index" @click="goDetails(item.cid)">
				<image :src="item.thumb[0].str_value" class="thumb" mode="aspectFill"></image>
				<view class="title">{{item.title}}</view>
				<view class="des">{{item.description[0].str_value}}</view>
				<view class="flex margin-sm shuju">
					<view class="views text-center"><text class="cuIcon-attention margin-right-xs"></text>{{item.views}}</view>
					<view class="comments text-center"><text class="cuIcon-comment margin-right-xs"></text>{{item.commentsNum}}</view>
					<view class="likes text-center"><text class="cuIcon-like margin-right-xs"></text>{{item.likes}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import API from "../../utils/api.js";
	import CFG from "../../utils/config.js";
	var interstitialAd = null;
	export default {
		data() {
			return {
				mid: "99999999",
				name:"",
				articleList: []
			}
		},
		onLoad(e) {
			// console.log(e)
			this.mid = e.mid;
			this.name = e.name;
			
			 // uni.setNavigationBarTitle({
			 //      title: this.name
			 //    })
			this.getCategoriesList();
			//#ifndef H5
			this.adLoad();
			//#endif
		},
		onShow() {
			if (interstitialAd) {
			  interstitialAd.show().catch((err) => {
			    console.error(err)
			  })
			}
		},
		methods: {
			adLoad:function(){
				if (wx.createInterstitialAd) {
				  interstitialAd = wx.createInterstitialAd({
				    adUnitId: CFG.adId.interstitialAd
				  })
				  interstitialAd.onLoad(() => {})
				  interstitialAd.onError((err) => {})
				  interstitialAd.onClose(() => {})
				}
			},
			getCategoriesList: function() {
				var that = this;
				var mid = this.mid;
				uni.request({
					url: API.GetPostsbyMID(mid),
					success: function(res) {
						console.log(res)
						that.articleList = res.data.data
					}
				})
			},
			goDetails: function(e) {
				uni.navigateTo({
					url: "/pages/details/details?cid=" + e
				})
			},
		}
	}
</script>

<style lang="less">
	.top{
		width: 700rpx;
		height: 200rpx;
		background-color: #6739B6;
		border-radius: 20rpx;
		margin: 25rpx;
		text-align: center;
		line-height: 200rpx;
		color: #FFFFFF;
		font-size: 40rpx;
		font-weight: bold;
	}
	.article_list {
		display: flex;
		flex-wrap: wrap;

		.article {
			margin: 27.5rpx;
			width: 320rpx;
			box-shadow: 0 0 10rpx #e1e1e1;
			border-radius: 20rpx;

			.thumb {
				width: 320rpx;
				height: 150rpx;
				border-radius: 20rpx 20rpx 0 0 ;
			}

			.title {
				width: 310rpx;
				font-size: 30rpx;
				line-height: 50rpx;
				margin: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				height: 50rpx;
				font-weight: bold;
			}
			.des{
				margin: 15rpx;
				height: 80rpx;
				font-size: 26rpx;
				line-height: 40rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.shuju{
				position: relative;
				bottom: -10rpx;
			}
			.views{
				width: 100rpx;
				margin: 5rpx;
				color: #d0d0d0;
				font-size: 24rpx;
			}
			.comments{
				width: 100rpx;
				margin: 5rpx;
				color: #d0d0d0;
				font-size: 24rpx;
			}
			.likes{
				width: 100rpx;
				margin: 5rpx;
				color: #d0d0d0;
				font-size: 24rpx;
			}
			
		}
	}
</style>
