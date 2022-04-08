<template>
	<view class="relative text-sm text-gray-800 bg-gray-100 min-h-screen">
		<!-- 搜索 -->
		<view style="padding: 16rpx 26rpx">
			<u-search
				v-model="searchValue"
				height="74rpx" 
				bgColor="#FFFFFF" 
				placeholder="搜索药品名、品牌" 
				clearabled
				@custom="onSearch"
				@search="onSearch"
			/>
			<!-- 历史搜索 -->
			<view 
				v-if="historyList.length > 0" 
				class="flex justify-between" 
				style="margin-top: 32rpx"
			>
				<view class="text-sm font-bold">历史搜索</view>
				<u-icon size="32rpx" name="trash" bold @click="clearHistory"></u-icon>
			</view>
			<view class="flex flex-wrap">
				<view
					v-for="(item, index) in historyList" 
					:key="index" 
					class="flex-shrink-0" 
					style="margin: 16rpx 16rpx 0 0"
				>
					<u-tag :text="item" shape="circle" bgColor="#E6E6E6" borderColor="#E6E6E6" color="#666666" @click="onSearch(item)"></u-tag>
				</view>
			</view>
			<!-- 热门搜索 -->
			<view class="text-sm font-bold" style="margin-top: 32rpx;">热门搜索</view>
			<view class="flex flex-wrap">
				<view 
					v-for="(item, index) in hotList" 
					:key="index" 
					class="flex-shrink-0" 
					style="margin: 16rpx 16rpx 0 0"
				>
					<u-tag :text="item" shape="circle" bgColor="#E6E6E6" borderColor="#E6E6E6" color="#666666" @click="onSearch(item)"></u-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { uniq, trim } from 'lodash'
	export default {
		data() {
			return {
				searchValue: '',
				historyList: [],
				hotList: ['第一三共新露露','感冒药','更年期保健药','胃药','咽喉消炎','眼药水','大幸药品','小林制药','乐敦制药'],
			}
		},
		methods: {
			// 清空历史记录
			clearHistory() {
				let that = this
				uni.showModal({ content: '确定要清空历史记录吗？', confirmColor: '#F03E38', success: function (res) {
					if (res.confirm) {
						that.historyList = []
						uni.removeStorageSync('history')
						uni.showToast({ title: '成功', icon: 'success', duration: 2000 })
					}
				}})
			},
			onSearch(value) {
				if(trim(value)) {
					this.historyList.unshift(value)
					this.historyList = uniq(this.historyList)
					uni.setStorageSync('history', this.historyList)
				}
				this.searchValue = ''
				uni.redirectTo({ url: '/pages/search/list?drug=' + value })
			}
		},
		onLoad() {
			if(uni.getStorageSync('history')) this.historyList = uni.getStorageSync('history')
		}
	}
</script>
