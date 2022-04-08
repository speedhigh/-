<template>
	<view>
		<view v-show="!showLoading">
			<slot :list="localList"></slot>
		</view>
		<view v-show="showLoading" style="padding: 16rpx" >
			<u-loading-icon text="加载中,请稍后..." textSize="16" />
		</view>
		<view v-if="!finished && localList.length > 0 && !showLoading" style="padding: 16rpx">
			<u-loading-icon text="加载中,请稍后..." />
		</view>
		<view v-show="finished && localList.length > 0" class="text-gray-600 text-center" style="padding: 16rpx">没有更多了~</view>
		<view v-if="localList.length === 0 && !showLoading" style="margin-top: 100rpx">
			<u-empty
				mode="list"
				icon="http://cdn.uviewui.com/uview/empty/list.png"
				width="480rpx"
				height="480rpx"
				textSize="32rpx"
			/>
		</view>
	</view>
</template>

<script>
	import { pickBy } from 'lodash'
	export default {
		name: "BasePagination",
		props: {
			url: {
				type: String,
				required: true
			},
			params: {
				type: Object,
				required: true
			},
			currentPage: {
				type: Number,
				default: 1
			},
			size: {
				type: Number,
				default: 10
			}
		},
		data() {
			return {
				showLoading: true,
				finished: false,
				localList: []
			};
		},
		mounted() {
			this.askApi(false)
		},
		methods: {
			async askApi(more = true) {
				const newParams = {}
				Object.assign(newParams, this.params, { currentPage: this.currentPage, size: this.size })	
				const res = await this.$api({ url: '/open/home/search', data: pickBy(newParams)})
				if(more) this.localList.push(...res.data.data.records)
				if(!more) this.localList = res.data.data.records
				if (res.data.data.current*res.data.data.size >= res.data.data.total)this.finished = true
				this.showLoading = false
			},
		},
		watch: {
			params: {
				handler(item,index) {
					this.finished = false
					this.showLoading = true
					this.askApi(false)
				},
				deep: true // 深度监听父组件传过来对象变化
			},
			currentPage: {
				handler(item,index) {
					if(this.currentPage > 1) {
						this.askApi()
					}
				},
				deep: true // 深度监听父组件传过来对象变化
			}
		}
	}
</script>
