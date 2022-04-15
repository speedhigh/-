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
					{ title: '配送方式', salias: 'shipment' },
					{ title: '配送服务', salias: 'shipment2' },
					{ title: '运费标准', salias: 'yfbz' },
					{ title: '物流跟踪', salias: 'wlgz' }
				]
			}
		}
	}
</script>
