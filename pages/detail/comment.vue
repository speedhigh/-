<template>
	<view class="text-gray-800 text-sm bg-gray-200 min-h-screen">
		<u-loading-page :loading="showLoading" loadingText="正在加载..." />
		<view v-if="!showLoading" class="flex flex-col min-h-screen">
			<!-- top -->
			<view class="bg-white rounded-b-2xl flex items-center flex-shrink-0" style="height: 284rpx">
				<view 
					class="flex-shrink-0 flex flex-col items-center justify-center u-border-right"
					style="width: 304rpx; height: 200rpx"
				>
					<view class="font-bold text-red-400" style="font-size: 100rpx">4.5</view>
					<u-rate :count="5" v-model="avg" size="20" gutter="0" readonly allowHalf />
				</view>
				<view class="flex-grow flex flex-col justify-between" style="padding: 20rpx 32rpx; height: 200rpx">
					<view v-for="(item, index) in score" :key="index" class="flex items-center">
						<view class="flex-shrink-0" style="margin-right: 28rpx">{{ item.title }}</view>
						<view class="flex-grow u-border rounded-sm" style="height: 30rpx">
							<view class="bg-red-400 rounded-sm" :style="{width: item.value + '%'}" style="height: 28rpx" />
						</view>
						<view class="flex-shrink-0" style="width: 48rpx; margin-left: 28rpx">{{ item.value }}%</view>
					</view>
				</view>
			</view>
			<!-- 评价 -->
			<view class="bg-white rounded-t-2xl p-4 flex-grow" style="margin-top: 28rpx">
				<view class="flex items-center">
					<view class="rounded-2xl bg-red-400" style="width: 6rpx; height: 32rpx" />
					<view class="font-bold text-base" style="margin-left: 12rpx">评价</view>
					<view class="text-gray-600 text-xs" style="margin-left: 14rpx">(623条)</view>
				</view>
				<view v-for="(item, index) in list" :key="index">
					<view class="flex items-center" style="margin-top: 48rpx">
						<u-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" size="68rpx" />
						<view style="margin-left: 13rpx">
							<view>{{ item.userName }}</view>
							<view class="flex items-center">
								<view class="text-gray-600 text-xs" style="margin-right: 12rpx">{{ item.time }}</view>
								<u-rate :count="5" v-model="item.irank" size="12" gutter="0" />
							</view>
						</view>
					</view>
					<view style="margin-top: 25rpx">
						{{ item.smemo ? item.smemo : '默认好评' }}
					</view>
				</view>
			</view>
			<view class="p-4 text-center bg-white">没有更多了~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				list: [],
				avg: 0,
				score: [
					{ title: '好评', value: 0},
					{ title: '一般', value: 0},
					{ title: '差评', value: 0}
				]
			}
		},
		onLoad(option) {
			this.getList(option.id)
		},
		methods: {
			async getList(id) {
				const res = await this.$api({url: '/open/product_detail/get_productdetail_comment', data: {id: id}})
				if(res.data.code === 20000) {
					this.list = res.data.data
					this.avg = res.data.data.reduce((sum, item) => sum + item.irank, 0) / res.data.data.length
					this.score[0].value = (res.data.data.filter(item => item.irank > 3).length / res.data.data.length).toFixed(2) * 100
					this.score[1].value = (res.data.data.filter(item => item.irank === 3).length / res.data.data.length).toFixed(2) * 100
					this.score[2].value = (res.data.data.filter(item => item.irank < 3).length / res.data.data.length).toFixed(2) * 100
				}
				this.showLoading = false
			}
		}
	}
</script>

<style>
</style>
