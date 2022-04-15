<template>
	<view class="text-sm text-gray-800 bg-gray-200 min-h-screen">
		<view style="padding: 0 32rpx">
			<view v-for="(item, index) in list" :key="index">
				<navigator 
					:url="'/subpages/article/article?title=' + item.title + '&salias=' + item.salias" 
					class="flex items-center justify-between u-border-bottom"
					style="height: 108rpx"
				>
					<view>{{ item.title }}</view>
					<u-icon slot="right" name="arrow-right" />
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{ title: '购物流程', salias: 'gwlc' },
					{ title: '支付方式', salias: 'zffs' },
					{ title: '通关税费', salias: 'tgsf' },
					{ title: '常见问题', salias: 'faq' }
				]
			}
		}
	}
</script>
