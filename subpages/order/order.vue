<template>
	<view class="relative text-gray-800 text-sm bg-gray-200 min-h-screen" style="padding:120rpx 0 32rpx 0">
		<u-navbar title="我的订单" @leftClick="back" />
		<!-- tabs -->
		<view class="flex justify-around bg-white sticky shadow" style="z-index: 999; top: 115rpx">
			<u-tabs
				:list="tabs"
				lineColor="#f56c6c"
				:current="active"
				:activeStyle="{ color: '#303133', fontWeight: 'bold'}"
				itemStyle="padding-left: 30rpx; padding-right: 30rpx; height: 80rpx"
				@change="changeTabs()"
			/>
		</view>
		<!-- content -->
		<base-pagination ref="paginationRef" url="/order/getpages" :params="params">
			<template v-slot="{list}">
				<view class="flex flex-wrap justify-between" style="padding-top: 20rpx">
					<view v-for="(item, index) in list" :key="index" style="margin-bottom: 24rpx">
						<order-card :msg="item" @cancel="cancelOrders" @todtl="toDetail" @confirm="confirmOrders" />
					</view>
				</view>
			</template>
		</base-pagination>
	</view>
</template>

<script>
	import BasePagination from '@/components/BasePagination.vue'
	import OrderCard from './components/OrderCard.vue'
	export default {
		components: {
			BasePagination,
			OrderCard
		},
		data() {
			return {
				active: 0,
				tabs: [
					{name: '全部', state: '0'}, 
					{name: '待付款', state: '1'}, 
					{name: '待发货', state: '2'}, 
					{name: '待收货', state: '3'}, 
					{name: '待评价', state: '5'},
				],
				params: {
					userid: uni.getStorageSync('user').id,
					state: '0'
				}
			}
		},
		onLoad(option) {
			this.active = +option.active
			this.params.state = option.state
			console.log(this.active)
		},
		onShow() {
			this.$refs.paginationRef.askApi(false)
		},
		onReachBottom() {
			this.$refs.paginationRef.addPage()
		},
		methods: {
			changeTabs(e) {
				this.active = e.index
				this.params.state = this.tabs[e.index].state
			},
			cancelOrders() {
				this.$refs.paginationRef.askApi(false)
			},
			confirmOrders() {
				this.$refs.paginationRef.askApi(false)
			},
			toDetail(id) {
				uni.navigateTo({ url: '/subpages/order/detail?id=' + id + '&active=' + this.active + '&state=' + this.params.state })
			},
			back() {
				uni.navigateBack({
					delta: getCurrentPages().filter(item => item.route === "subpages/order/order").length
				})
			}
		}
	}
</script>
