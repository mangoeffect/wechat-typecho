<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
	
</template>

<script>
	import API from "../../utils/config.js";
export default {
	data() {
		return {
			url:"https://mangoroom.cn"
		};
	},
	onLoad() {
		console.log(API.accountUrl)
		this.url = API.accountUrl
	},
	methods: {
	}
};
</script>

<style></style>
