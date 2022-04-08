<template>
	<view>
		confirmorder
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(option) {
			console.log(option)
			console.log(uni.getStorageSync('productId'))
		},
		methods: {

		},
		onBackPress() {
			uni.showModal({
				title: '提示',
				content: '是否退出uni-app？',
				success: function(res) {
					if (res.confirm) {
						// 退出当前应用，改方法只在App中生效  
						plus.runtime.quit();
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
		  })
			return true
		},
	}
</script>

<style>

</style>
