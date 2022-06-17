<template>
	<view>
		<view class="content">本指引是芒果小屋博客小程序(基于双鱼小程序)开发者收集、使用和存储你的信息而制定。</view>
		<view class="title">
			开发者收集的信息
			<text>根据法律规定仅收集功能所必要的信息</text>
		</view>
		<view class="content">开发者收集你的用户信息（微信昵称、头像、性别、地区），用于注册、登录小程序。</view>
		<view class="title">开发者对信息的存储</view>
		<view class="content">存储地点：境内</view>
		<view class="content">存储期限：小程序停止运营后及时删除</view>
		<view class="title">信息的使用规则</view>
		<view class="content">开发者将会在本指引所涵盖的用途内使用收集的信息。</view>
		<view class="content">如开发者使用你的信息超出本指引目的或合理范围，会及时更新本指引，同时，开发者在使用你的信息前，再次以小程序浮窗等方式告知并征得你的明示同意。</view>
		<view class="title">信息对外提供</view>
		<view class="content">不会主动共享或转让你的信息至任何第三方，如存在确需共享或转让时，开发者应当直接或确认第三方征得你的明示同意。</view>
		<view class="content">不会对外公开披露你的信息，如必须公开披露时，开发者应当向你告知公开披露的目的、披露信息的类型及可能涉及的信息，并征得你的明示同意。</view>
		<view class="content">若你认为开发者未遵守上述约定，或有其他的投诉建议、未成年人个人信息相关问题，可通过以下方式与开发者联系；或者向微信进行投诉。</view>
		<view class="content">邮箱：{{email}}</view>
		<view class="time">更新日期：2022-06-20</view>
		<view class="time">生效日期：2021-04-01</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			email:"2321544362@QQ.com"
		};
	},
	methods: {}
};
</script>

<style lang="less" scoped>
.title {
	font-size: 30rpx;
	font-weight: bold;
	margin: 30rpx;
	text {
		font-size: 25rpx;
		color: #999999;
	}
}
.content {
	font-size: 28rpx;
	margin: 10rpx 30rpx;
	line-height: 45rpx;
}
.time {
	font-size: 28rpx;
	margin: 10rpx;
	text-align: right;
	margin-right: 30rpx;
}
</style>
