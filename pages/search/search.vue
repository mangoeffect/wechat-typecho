<template>
	<view class="">
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input confirm-type="search" @confirm="searchStart()" placeholder="孩子,在这里输入搜索内容!" v-model.trim="searchText"></input>
			</view>
			<view class="action">
				<button class="cu-btn  shadow-blur round" @click="searchStart()">搜索</button>
			</view>
		</view>
	
		<view class="s-circle radius bg-white" v-if="hList.length > 0">
			<view class="header">
				<text class="cuIcon-title padding-right-sm text-blue"></text>
				历史记录
				<image src="../../static/zy-search/delete.svg" mode="aspectFit" @click="delhistory"></image>
			</view>
			<view class="list">
				<view v-for="(item,index) in hList" :key="index" @click="liSou(item)">{{item}}</view>
			</view>
		</view>
		<view class="wanted-circle bg-white">
			<view class="header"><text class="cuIcon-title padding-right-sm text-blue"></text>猜你想搜</view>
			<view class="list">
				<view v-for="(item,index) in hotKeywordList" :key="item" @click="keywordsClick(item)">{{ item }}</view>
			</view>
		</view>
		<view class="wanted-circle bg-white">
			<view class="header"><text class="cuIcon-title padding-right-sm text-orange"></text>推荐阅读</view>
		</view>
<view class="ad">
	<ad unit-id="adunit-aeed43498ec75860" ad-type="video" ad-theme="white"></ad>
</view>
	</view>
</template>

<script>
	var API = require('../../utils/api');

	export default {
		name: "zy-search",
		props: {
			hotList: { //推荐列表数据
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				searchText: '', //搜索关键词
				hList: uni.getStorageSync('search_cache'), //历史记录
				hotKeywordList: ['小创果','博客小程序'], //由于时间关系并没有网络获取列表
			};
		},
		onLoad() {
		},
		methods: {
			searchStart: function() { //触发搜索
				let _this = this;
				if (_this.searchText == '') {
					uni.showToast({
						title: '啥都不输入，搜什么？',
						icon: 'none',
						duration: 1000
					});
				} else {
					_this.$emit('getSearchText', _this.searchText);
					uni.getStorage({
						key: 'search_cache',
						success(res) {
							let list = res.data;
							if (list.length > 5) {
								for (let item of list) {
									if (item == _this.searchText) {
										return;
									}
								}
								list.pop();
								list.unshift(_this.searchText);
							} else {
								for (let item of list) {
									if (item == _this.searchText) {
										return;
									}
								}
								list.unshift(_this.searchText);
							}
							_this.hList = list;
							uni.setStorage({
								key: 'search_cache',
								data: _this.hList
							});
						},
						fail() {
							_this.hList = [];
							_this.hList.push(_this.searchText);
							uni.setStorage({
								key: 'search_cache',
								data: _this.hList
							});
							_this.$emit('getSearchText', _this.searchText);
						}
					})
					// 回车后获取字段,跳转界面
					var tagName = _this.searchText
					// console.log(tagName)
					uni.navigateTo({
						url: '../searchlist/searchlist?key=' + tagName,
					})
				}
			},
			keywordsClick(item) { //关键词搜索与历史搜索
				// 把点击的猜你想搜标签传给历史
				this.searchText = item;
				// 触发searchStart函数
				this.searchStart()

			},
			delhistory() { //清空历史记录
				this.hList = [];
				uni.setStorage({
					key: 'search_cache',
					data: []
				});
			},
			// 获取点击的tag的id, 传给新界面
			// tag(item) {
			// 	var tagName = item;
			// 	console.log(tagName)
			// 	uni.navigateTo({
			// 		url: '../searchlist/searchlist?key=' + tagName,
			// 	})
			// },
			// 获取历史的搜索字段,传给新界面
			liSou(item) {
				var tagName = item;
				// console.log(tagName)
				uni.navigateTo({
					url: '../searchlist/searchlist?key=' + tagName,
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.radius{
		border-radius: 40upx 40upx 0upx 0upx;
	}
	.ad{
		padding: 20rpx;
	}
	.search {
		.voice-icon {
			width: 36upx;
			height: 36upx;
			padding: 16upx 20upx 16upx 0;
			position: absolute;
			left: 16upx;
			top: 4upx;
			z-index: 10;
		}
	}

	.s-circle {
		margin-top: 30upx;

		.header {
			font-size: 32upx;
			padding: 30upx;
			border-bottom: 2upx solid #F9F9F9;
			position: relative;

			image {
				width: 36upx;
				height: 36upx;
				padding: 10upx;
				position: absolute;
				right: 40upx;
				top: 24upx;
			}
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			padding: 0 30upx 20upx;

			view {
				padding: 8upx 30upx;
				margin: 20upx 30upx 0 0;
				font-size: 28upx;
				color: #8A8A8A;
				background-color: #F7F7F7;
				box-sizing: border-box;
				text-align: center;
				border-radius: 20upx;
			}
		}
	}

	.wanted-circle {
		margin-top: 30upx;

		.header {
			font-size: 32upx;
			padding: 30upx;
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			padding: 0 30upx 20upx;

			view {
				padding: 8upx 30upx;
				margin: 20upx 30upx 0 0;
				font-size: 28upx;
				color: #8A8A8A;
				background-color: #F7F7F7;
				box-sizing: border-box;
				text-align: center;
				border-radius: 20upx;
			}
		}
	}
</style>
