<template>
	<view>
		<view class="cat_list">
			<view class="cat" v-for="(item,index) in catList" :key="index" @click="goSortList(item.mid,item.name)">
				<view class="name">{{item.name}}</view>
				<view class="des">{{item.description}}</view>
				<image src="../../static/list.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import API from "../../utils/api.js";
	export default {
		data() {
			return {
				catList:[]
			}
		},
		onLoad() {
			this.getCat()
		},
		methods: {
			getCat:function(){
				uni.request({
					url:API.GetCat()
				}).then(res=>{
					console.log(res)
					this.catList = res[1].data.data
					
				})
			},
			goSortList:function(a,b){
				uni.navigateTo({
					url:"/pages/sortList/sortList?mid="+a+"&name="+b
				})
			},
		}
	}
</script>

<style lang="less">
	page{
	}
	.cat_list{
		display: flex;
		flex-wrap: wrap;
		.cat{
			width: 300rpx;
			height: 500rpx;
			border-radius: 30rpx;
			box-shadow: 0 0 15rpx #f0f0f0;
			margin: 30rpx 35rpx;
			image{
				position: relative;
				width: 200rpx;
				top: 50rpx;
				left: 100rpx;

			}
			.name{
				font-size: 40rpx;
				font-weight: bold;
				padding:50rpx 0 20rpx 50rpx;
			}
			.des{
				margin: 20rpx 50rpx;
				font-size: 30rpx;
				width: 230rpx;
				line-height: 50rpx;
				height: 100rpx;
				overflow: hidden;
				
			}
		}
	}

</style>
