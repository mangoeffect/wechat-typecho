<!-- 该程序为阳光艺创站小创果独立开发 -->
<!-- 小程序使用教程请访问www.i4qq.com进行查看 -->
<!-- 官方唯一指定交流群：927510477 -->
<!-- 删除上述文字将不会获得维护 -->

<template>
	<view class="bg">
		<view class="haibao">
			<swiper :circular="true" :autoplay="true" :duration="1000" class="swiper">
				<swiper-item v-for="(item, index) in haiBao" :key="index" @click="goDetails(item.cid)">
					<image :src="item.thumb[0].str_value" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

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
				<text class="cuIcon-newfill text-orange"></text>
				<text class="text-xl text-bold">热门分类</text>
			</view>
		</view>

		<scroll-view scroll-x="true" class="sort_list">
			<view v-for="(item, index) in hotCat" :key="index" class="sort" @click="goSortList(item.mid, item.name)">
				<image :src="item.thumb" mode="aspectFill" class="sort_image"></image>
			</view>
		</scroll-view>

		<view class="cu-bar">
			<view class="action">
				<text class="cuIcon-hotfill text-red"></text>
				<text class="text-xl text-bold">热门文章</text>
			</view>
		</view>

		<view class="article_list">
			<view v-for="(item, index) in articleList" :key="index">
				<view class="new_ad" v-if="index % 5 == 2"><ad unit-id="adunit-aeed43498ec75860" ad-type="video" ad-theme="white"></ad></view>

				<view class="article1" @click="goDetails(item.cid)" v-if="item.style[0].str_value == '1'">
					<view class="flex">
						<view class="title">{{ item.title }}</view>
						<image :src="item.thumb[0].str_value" class="thumb" mode="aspectFill"></image>
					</view>
					<view class="flex margin-top text-gray">
						<view class="author">{{ item.author }}</view>
						<view class="times">{{ item.month + '月' + item.day + '日' }}</view>
						<view style="margin-left: auto;"><text class="cuIcon-more"></text></view>
					</view>
				</view>

				<view class="article2" @click="goDetails(item.cid)" v-if="item.style[0].str_value == '2'">
					<view class="flex">
						<image :src="item.thumb[0].str_value" class="thumb" mode="aspectFill"></image>
						<view class="title">{{ item.title }}</view>
					</view>
					<view class="flex margin-top text-gray">
						<view class="author">{{ item.author }}</view>
						<view class="times">{{ item.month + '月' + item.day + '日' }}</view>
						<view style="margin-left: auto;"><text class="cuIcon-more"></text></view>
					</view>
				</view>

				<view class="article3" @click="goDetails(item.cid)" v-if="item.style[0].str_value == '3'">
					<image :src="item.thumb[0].str_value" class="thumb" mode="aspectFill"></image>
					<view class="title">{{ item.title }}</view>
					<view class="flex text-gray">
						<view class="author">{{ item.author }}</view>
						<view class="times">{{ item.month + '月' + item.day + '日' }}</view>
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
			hotCat: [],
			recommend: []
		};
	},
	onLoad() {
		this.getHaibao();
		this.getHotCat()
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
					// console.log(res.data.data);
				}
			});
		},
		getArticleList: function() {
			uni.request({
				url: API.GetPosts(),
				success: res => {
					// console.log(res.data.data);
					this.articleList = res.data.data;
				}
			});
		},
		getHotCat: function() {
			uni.request({
				url:API.GetHotCat(),
				success: (res) => {
					if(res.data.data){
						let data = res.data.data.split(/[\n]/g)
						let hotCat = data.map(item=>{
							return {
								'name':item.split('|')[0],
								'mid':item.split('|')[1],
								'thumb':item.split('|')[2]
								
							}
						})
						this.hotCat = hotCat
						console.log(this.hotCat)
					}
					
					
				}
			})
		},
		getNewArticleList: function() {
			uni.request({
				url: API.GetPosts(),
				data: {
					page: page
				},
				success: res => {
					if (res.data.status == '403') {
						return;
					}
					page++;
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
					// console.log(res.data.data);
				}
			});
		}
	}
};
</script>

<style lang="less">
.bg {
	background-color: #f9f9f9;
}
.swiper {
	width: 700rpx;
	margin: 0 25rpx;
	height: 300rpx;
	border-radius: 10rpx;
	overflow: hidden;
	image {
		width: 700rpx;
		height: 300rpx;
		border-radius: 10rpx;
	}
}
.new_ad {
	margin: 30rpx 20rpx;
}
.haibao {
	margin-top: 10rpx;
	height: 300rpx;
}

.notice {
	display: flex;
	padding: 20rpx;
	margin-top: 10rpx;
	background-color: #ffffff;
	image {
		width: 180rpx;
		height: 180rpx;
		height: 70rpx;
		border-radius: 20rpx 0 0 20rpx;
	}

	.notice_c {
		width: 530rpx;
		height: 60rpx;
		padding: 0 20rpx 0 10rpx;
		background-color: #c5c5c5;
		color: #ffffff;
		border-radius: 0 20rpx 20rpx 0;
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
		background-color: #ffffff;
		background-color: #ffffff;
		padding: 20rpx 25rpx;
		border-radius: 5rpx;

		.title {
			width: 420rpx;
			height: 100rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			font-size: 30rpx;
			line-height: 50rpx;
		}

		.thumb {
			width: 220rpx;
			height: 130rpx;
			margin-left: auto;
			border-radius: 5rpx;
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
		background-color: #ffffff;
		padding: 20rpx 25rpx;
		border-radius: 5rpx;

		.thumb {
			width: 220rpx;
			height: 130rpx;
			border-radius: 5rpx;
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
			font-size: 30rpx;
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
		border-radius: 10rpx;
		background-color: #ffffff;
		padding-bottom: 20rpx;

		.thumb {
			width: 710rpx;
			height: 300rpx;
			border-radius: 10rpx 10rpx 0 0;
		}

		.title {
			width: 690rpx;
			padding: 10rpx 20rpx;
			font-size: 30rpx;
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
		background-color: #ffffff;
		border-radius: 30rpx;
		padding: 10rpx;
		.title {
			width: 645rpx;
			font-size: 30rpx;
			margin: 20rpx 10rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.article_dec {
			margin: 30rpx 0;
			padding: 20rpx;
			border-radius: 5rpx;
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
	white-space: nowrap;
	.sort {
		margin: 0 20rpx;
		box-shadow: 0 0 20rpx #f1f1f1;
		width: 300rpx;
		border-radius: 0 0 10rpx 10rpx;
		display: inline-block;
		.sort_image {
			width: 300rpx;
			height: 278rpx;
			border-radius: 10rpx 10rpx 0 0;
		}

		.name {
			padding: 15rpx 30rpx;
			font-size: 30rpx;
		}
	}
}
</style>
