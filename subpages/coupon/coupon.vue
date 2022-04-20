<template>
	<view class="relative text-sm text-gray-800 bg-gray-200 min-h-screen" style="padding-bottom: 120rpx">
		<view class="flex justify-center bg-white sticky top-0 shadow" style="z-index: 999">
			<u-tabs
				:list="tabs" 
				lineWidth="150rpx"
				lineColor="#f56c6c"
				:activeStyle="{ color: '#303133', fontWeight: 'bold'}"
				itemStyle="padding-left: 60rpx; padding-right: 60rpx; height: 80rpx"
				@change="changeTabs"
			/>
		</view>
		<view style="padding: 24rpx">
			<!-- 可用列表 -->
			<view v-show="active === 0">
				<muzi-coupon-card ref="couponRef1" :list="coupon.list" :show-check="type === 'edit'" @change="changeCoupon" />
			</view>
			<!-- 不可用列表 -->
			<view v-show="active === 1">
				<muzi-coupon-card ref="couponRef2" :list="coupon.noList" type="noList" />
			</view>
		</view>
		<!-- 不使用优惠券 -->
		<view v-if="coupon.list.length > 0 && type==='edit'" class="fixed bottom-0 inset-x-0 bg-white u-border-top" style="padding: 16rpx 32rpx;">
			<button class="bg-red-400 text-white rounded-full text-base" @click="cancelCoupon">
				不使用优惠券
			</button>
		</view>
	</view>
</template>

<script>
	import MuziCouponCard from './components/MuziCouponCard.vue'
	export default {
		components: {
			MuziCouponCard
		},
		data() {
			return {
				type: 'edit',
				active: 0,
				tabs: [{name: '可用列表'},{name: '不可用列表'}],
				coupon: {
					list: [],
					noList: []
				}
			}
		},
		onLoad(option) {
			// type === 'edit'(可编辑) || 'readonly'(只读)
			this.type = option.type
			this.getCouponList()
		},
		methods: {
			// 获取可用惠券列表
			async getCouponList() {
			  const res = await this.$api({url: '/quan/getList_Canuse', data: {userid: uni.getStorageSync('user').id}})
				if(res.data.data.length > 0) this.tabs[0].name = '可用列表(' + res.data.data.length + ')'
			  this.coupon.list = res.data.data
				this.$refs.couponRef1.showLoading = false
				if(res.data.data.length === 0) this.$refs.couponRef1.showEmpty = true
			},
			// 获取不可用惠券列表
			async getCouponNoList() {
			  const res = await this.$api({url: '/quan/getList_Cannotuse', data: {userid: uni.getStorageSync('user').id}})
			  this.coupon.noList = res.data.data
				this.$refs.couponRef2.showLoading = false
				if(res.data.data.length === 0) this.$refs.couponRef2.showEmpty = true
			},
			// 切换tabs
			changeTabs(e) {
				if(e.index === 1 && this.coupon.noList.length === 0) {
					this.$refs.couponRef2.showLoading = true
					this.getCouponNoList()
				}
				this.active = e.index
			},
			// 选择优惠券
			async changeCoupon(index) {
				if(this.coupon.list[index].selected) return
				this.coupon.list.forEach((c, idx) => {
					c.selected = (index === idx)
				})
				await this.$api({url: '/quan/addquanstorage', data: {userid: uni.getStorageSync('user').id, quanid: this.coupon.list[index].id}})
				uni.showModal({ showCancel: false, content: '选择成功！', confirmColor: '#F03E38', success() {
					uni.navigateBack()
				}})
			},
			// 不使用优惠券
			async cancelCoupon() {
				this.coupon.list.forEach((c, idx) => {
					c.selected = false
				})
				await this.$api({url: '/quan/clearquanstorage', data: {userid: uni.getStorageSync('user').id}})
				uni.showModal({ showCancel: false, content: '完成！', confirmColor: '#F03E38', success() {
					uni.navigateBack()
				}})
			},
		}
	}
</script>
