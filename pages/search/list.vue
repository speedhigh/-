<template>
	<view
		class="relative text-sm text-gray-800 bg-gray-100 min-h-screen h-full" 
		style="padding-top: 114rpx; height: 100%"
	>
		<view
			class="fixed top-0 inset-x-0 bg-white"
			style="padding: 20rpx 16rpx; z-index: 9999"
		>
			<navigator url="/pages/search/search">
				<u-search
					:placeholder="params.searchContent ? params.searchContent : '搜索药品名、品牌'"
					disabled
					:showAction="false"
					height="74rpx"
				/>
			</navigator>
		</view>
		<!-- list -->
		<view>
			<view
				class="flex flex-wrap justify-between" 
				style="padding: 12rpx 20rpx"
			>
				<view v-for="(item, index) in list" :key="index">
					<navigator :url="'/pages/detail/detail?id=' + item.id">
						<muzi-card :item="item" />
					</navigator>
				</view>
			</view>
			<view v-show="showLoading" style="padding: 16rpx" >
				<u-loading-icon text="加载中,请稍后..." textSize="16" />
			</view>
			<view v-show="finished && list.length > 0" class="text-gray-600 text-center" style="padding-bottom: 32rpx">没有更多了~</view>
			<view v-show="list.length === 0 && !showLoading" style="margin-top: 100rpx">
				<u-empty
					mode="list"
					icon="http://cdn.uviewui.com/uview/empty/list.png"
					width="480rpx"
					height="480rpx"
					textSize="32rpx"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import { pickBy } from 'lodash'
	import MuziCard from '../../components/MuziCard.vue'
	export default {
		components: {
			MuziCard
		},
		data() {
			return {
				showLoading: true,
				currentPage: 1,
				list: [],
				finished: false,
				params: {
					searchContent: '',
					sclass: '',
					countryCode: '',
					onefunctioncategory: ''
				}
			}
		},
		methods: {
			async askApi(more = true) {
				const newParams = {}
				if(!more) this.currentPage = 1
				Object.assign(newParams, this.params, { currentPage: this.currentPage, size: 10 })
				const res = await this.$api({ url: '/open/home/search', data: pickBy(newParams)})
				if(more) this.list.push(...res.data.data.records)
				if(!more) this.list = res.data.data.records
				if (res.data.data.current*res.data.data.size >= res.data.data.total) {
					this.finished = true
				}
				this.showLoading = false
			},
		},
		onLoad(option) {
			if(option.drug) this.params.searchContent = option.drug
			if(option.id) this.params.sclass = option.id
			if(option.secondClass) this.params.onefunctioncategory = option.secondClass
			this.askApi(false)
		},
		onReachBottom(){
			if(!this.finished) {
				this.showLoading = true
				this.currentPage += 1
				this.askApi()
			} else {
				this.showLoading = false
			}
		}
	}
</script>
