<template>
	<view class="text-gray-800" style="padding: 130rpx 32rpx 32rpx 32rpx">
		<u-navbar :title="title" autoBack />
		<u-parse 
			:content="content" 
			class="text-sm" 
			style="overflow-x: hidden;"
		/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: ''
			}
		},
		onLoad(option) {
			console.log(option)
			this.title = option.title
			this.getArticle(option.salias)
		},
		methods: {
			async getArticle(salias) {
				const res = await this.$api({ url: '/open/article/get', data: {salias: salias}})
				this.content = res.data.data.scontent
			}
		}
	}
</script>

<style>

</style>
