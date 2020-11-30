<!-- 该程序为阳光艺创站小创果独立开发 -->
<!-- 小程序使用教程请访问www.i4qq.com进行查看 -->
<!-- 官方唯一指定交流群：927510477 -->
<!-- 删除上述文字将不会获得维护 -->

<template>
	<view>
		<view class="haibao">
			<swiper :circular="true" :autoplay="true" :duration="1000" class="swiper">
				<swiper-item v-for="(item, index) in haiBao" :key="index" @click="goDetails(item.cid)">
					<image :src="item.thumb[0].str_value" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="cu-bar">
			<view class="action">
				<text class="cuIcon-newfill text-orange"></text>
				<text class="text-xl text-bold">热门分类</text>
			</view>
		</view>

		<scroll-view scroll-x="true" class="sort_list">
			<view v-for="(item, index) in sortList" :key="index" class="sort" @click="goSortList(item.mid, item.name)">
				<image :src="item.thumb" mode="widthFix"></image>
				<view class="name">{{ item.name }}</view>
			</view>
		</scroll-view>

		<!-- 	<view class="cat_list">
			<view class="cat_card" v-for="(item,index) in sortList" :key="index">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</view> -->
		<view class="notice">
			<image src="../../static/gg.png"></image>
			<swiper class="notice_c" :autoplay="true" :interval="3000" :duration="1000" :vertical="true" :circular="true">
				<swiper-item v-for="(item, index) in recommend" :key="index" @click="goDetails(item.cid)">
					<view>{{ item.title }}</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="cu-bar">
			<view class="action">
				<text class="cuIcon-hotfill text-red"></text>
				<text class="text-xl text-bold">热门文章</text>
			</view>
		</view>

		<view class="article_list">
			<view v-for="(item, index) in articleList" :key="index">
				<view class="article1" @click="goDetails(item.cid)" v-if="item.style[0].str_value == '1'">
					<view class="flex">
						<view class="title">{{ item.title }}</view>
						<image :src="item.thumb[0].str_value" class="thumb" mode="widthFix"></image>
					</view>
					<view class="flex margin-top text-gray">
						<view class="author">{{ item.author }}</view>
						<view class="times">{{ item.month + '月' + item.day + '日' }}</view>
						<!-- <view class="views"><text class="cuIcon-attention margin-right-xs"></text>{{item.views[0].views}}</view>
					<view class="likes"><text class="cuIcon-like margin-right-xs"></text>{{item.likes[0].likes}}</view> -->
						<view style="margin-left: auto;"><text class="cuIcon-more"></text></view>
					</view>
				</view>
				<!-- <view class="article1 ad" v-if="index%5==3">
				<ad unit-id="adunit-b1362a923c58a450"></ad>
			</view> -->

				<view class="article2" @click="goDetails(item.cid)" v-if="item.style[0].str_value == '2'">
					<view class="flex">
						<image :src="item.thumb[0].str_value" class="thumb" mode="widthFix"></image>
						<view class="title">{{ item.title }}</view>
					</view>
					<view class="flex margin-top text-gray">
						<view class="author">{{ item.author }}</view>
						<view class="times">{{ item.month + '月' + item.day + '日' }}</view>
						<!-- 					<view class="views"><text class="cuIcon-attention margin-right-xs"></text>{{item.views[0].views}}</view>
					<view class="likes"><text class="cuIcon-like margin-right-xs"></text>{{item.likes[0].likes}}</view> -->
						<view style="margin-left: auto;"><text class="cuIcon-more"></text></view>
					</view>
				</view>

				<view class="article3" @click="goDetails(item.cid)" v-if="item.style[0].str_value == '3'">
					<image :src="item.thumb[0].str_value" class="thumb" mode="widthFix"></image>
					<view class="title">{{ item.title }}</view>
					<view class="flex text-gray">
						<view class="author">{{ item.author }}</view>
						<view class="times">{{ item.month + '月' + item.day + '日' }}</view>
						<!-- 					<view class="views"><text class="cuIcon-attention margin-right-xs"></text>{{item.views[0].views}}</view>
					<view class="likes"><text class="cuIcon-like margin-right-xs"></text>{{item.likes[0].likes}}</view> -->
						<view style="margin-left: auto; margin-right: 20rpx;"><text class="cuIcon-more"></text></view>
					</view>
				</view>
				<view class="article4" @click="goDetails(item.cid)" v-if="item.style[0].str_value == '4'">
					<view class="title">{{ item.title }}</view>
					<view class="article_dec">{{ item.description[0].str_value }}</view>
					<view class="des">
						<view class="author">{{ item.author }}</view>
						<view style="margin-left: auto; margin-right: 20rpx;"><text class="cuIcon-more margin-left-xs"></text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var page = 2;
import API from '../../utils/api.js';
import CFG from '../../utils/config.js';
export default {
	data() {
		return {
			haiBao: [],
			articleList: [],
			sortList: [],
			recommend: []
		};
	},
	onLoad() {
		this.sortList = CFG.hotList;
		this.getHaibao();
		this.getArticleList();
		this.getRecommend();
	},
	onShareAppMessage: function() {
		return {
			title: '快来看看这个小程序，真心不错噢！',
			imageUrl: '',
			path: '/pages/index/index'
		};
	},
	onShareTimeline: function() {
		return {
			title: '快来看看这个小程序，真心不错噢！',
			imageUrl: '',
			path: '/pages/index/index'
		};
	},
	onReachBottom() {
		this.getNewArticleList();
	},
	methods: {
		getHaibao: function() {
			uni.request({
				url: API.GetSwiperPost(),
				success: res => {
					this.haiBao = res.data.data;
					console.log(res.data.data);
				}
			});
		},
		getArticleList: function() {
			var that = this;
			uni.request({
				url: API.GetPosts(),
				success: function(res) {
					console.log(res.data.data);
					that.articleList = res.data.data;
				}
			});
		},
		getNewArticleList: function() {
			uni.request({
				url: API.GetPosts(),
				data: {
					page: page
				},
				success: res => {
					if (res.data.status == '403') {
						//没有数据
						return;
					}
					page++; //每触底一次 page +1
					// console.log(page);
					this.articleList = this.articleList.concat(res.data.data); //将数据拼接在一起
				}
			});
		},
		goSortList: function(a, b) {
			uni.navigateTo({
				url: '/pages/sortList/sortList?mid=' + a + '&name=' + b
			});
		},
		goDetails: function(cid) {
			uni.navigateTo({
				url: '/pages/details/details?cid=' + cid
			});
		},
		getRecommend: function() {
			uni.request({
				url: API.GetRecommend(),
				success: res => {
					this.recommend = res.data.data;
					console.log(res.data.data);
				}
			});
		}
	}
};
</script>

<style lang="less">
.swiper {
	width: 700rpx;
	margin: 0 25rpx;
	height: 300rpx;
	image {
		width: 700rpx;
		height: 300rpx;
		border-radius: 30rpx;
	}
}
.haibao {
	height: 300rpx;
}

.notice {
	display: flex;
	padding: 20rpx;

	image {
		width: 180rpx;
		height: 180rpx;
		height: 70rpx;
		border-radius: 30rpx 0 0 30rpx;
	}

	.notice_c {
		width: 530rpx;
		height: 60rpx;
		padding: 0 10rpx;
		background-color: #c5c5c5;
		color: #ffffff;
		border-radius: 0 30rpx 30rpx 0;
		line-height: 60rpx;
		font-size: 30rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
.cat_list {
	display: flex;
	flex-wrap: wrap;
	.cat_card {
		width: 350rpx;
		margin: 10rpx 12.5rpx;
		height: 180rpx;
		background-color: #f0f0f0;
		border-radius: 30rpx;
		image {
			border-radius: 30rpx;
		}
	}
}

.article_list {
	.article1 {
		width: 710rpx;
		margin: 30rpx 20rpx;
		box-shadow: 0 0 100rpx #f3f3f3;
		padding: 20rpx 25rpx;
		border-radius: 10rpx;

		.title {
			width: 420rpx;
			height: 100rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			font-size: 32rpx;
			line-height: 50rpx;
		}

		.thumb {
			width: 220rpx;
			margin-left: auto;
			border-radius: 10rpx;
		}

		.author {
			width: 180rpx;
			line-height: 30rpx;
		}

		.times {
			width: 230rpx;
			line-height: 30rpx;
		}

		.views {
			width: 110rpx;
			line-height: 30rpx;
		}

		.likes {
			width: 110rpx;
			line-height: 30rpx;
		}
	}

	.article2 {
		width: 710rpx;
		margin: 30rpx 20rpx;
		box-shadow: 0 0 100rpx #f3f3f3;
		padding: 20rpx 25rpx;
		border-radius: 10rpx;

		.thumb {
			width: 220rpx;
			border-radius: 10rpx;
		}

		.title {
			margin-left: auto;
			width: 420rpx;
			height: 100rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			font-size: 32rpx;
			line-height: 50rpx;
		}

		.author {
			width: 180rpx;
			line-height: 30rpx;
		}

		.times {
			width: 230rpx;
			line-height: 30rpx;
		}

		.views {
			width: 110rpx;
			line-height: 30rpx;
		}

		.likes {
			width: 110rpx;
			line-height: 30rpx;
		}
	}

	.article3 {
		margin: 30rpx 20rpx;
		width: 710rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 100rpx #f3f3f3;
		padding-bottom: 20rpx;

		.thumb {
			width: 710rpx;
			border-radius: 20rpx 20rpx 0 0;
		}

		.title {
			width: 690rpx;
			padding: 10rpx 20rpx;
			font-size: 32rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			margin-bottom: 10rpx;
		}

		.author {
			width: 180rpx;
			line-height: 30rpx;
			margin-left: 20rpx;
		}

		.times {
			width: 230rpx;
			line-height: 30rpx;
		}

		.views {
			width: 110rpx;
			line-height: 30rpx;
		}

		.likes {
			width: 110rpx;
			line-height: 30rpx;
		}
	}
	.article4 {
		margin: 30rpx 20rpx;
		box-shadow: 0 0 100rpx #f3f3f3;
		border-radius: 30rpx;
		padding: 10rpx;
		.title {
			width: 645rpx;
			font-size: 35rpx;
			font-weight: bold;
			margin: 20rpx 10rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.article_dec {
			margin: 30rpx;
			padding: 20rpx;
			border-radius: 10rpx;
			background-color: #f1f1f1;
		}
		.des {
			display: flex;
			color: gray;
			.author {
				margin-right: 20rpx;
				line-height: 30rpx;
				margin-left: 10rpx;
			}
			.views {
				margin-right: 20rpx;
				line-height: 30rpx;
			}

			.likes {
				line-height: 30rpx;
			}
		}
	}
}

.sort_list {
	width: 100%;
	height: 250rpx;
	white-space: nowrap;

	.sort {
		margin: 0 20rpx;
		box-shadow: 0 0 10rpx #f1f1f1;
		width: 300rpx;
		border-radius: 0 0 10rpx 10rpx;
		display: inline-block;

		image {
			width: 300rpx;
			border-radius: 10rpx 10rpx 0 0;
		}

		.name {
			padding: 15rpx 30rpx;
			font-size: 30rpx;
		}
	}
}
</style>
