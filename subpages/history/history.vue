<template>
	<view class="text-sm text-gray-800 bg-gray-200 min-h-screen">
		<!-- loading -->
		<u-loading-page :loading="showLoading" loadingText="正在加载..." />
		<!-- empty -->
		<view v-if="showEmpty" style="padding: 200rpx">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png" text="收藏列表为空">
			</u-empty>
		</view>
		<!-- content -->
		<view v-show="!showLoading && list.length > 0"  style="padding: 10rpx 20rpx">
			<view class="flex flex-wrap justify-between">
				<view v-for="(item, index) in list" :key="index">
					<navigator :url="'/pages/detail/detail?id=' + item.id">
						<muzi-card :item="item" />
					</navigator>
				</view>
			</view>
			<view class="text-center p-4 text-gray-600">沒有更多了~</view>
		</view>
	</view>
</template>

<script>
	import MuziCard from '@/components/MuziCard.vue'
	export default {
		components: {
			MuziCard
		},
		data() {
			return {
				showLoading: true,
				showEmpty: false,
				list: []
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			async getList() {
				const res = await this.$api({ url: '/wxapp/getBrowseHistory' })
				this.list = res.data.data
				this.showLoading = false
				if(res.data.data.length === 0) this.showEmpty = true
			}
		}
	}
</script>
