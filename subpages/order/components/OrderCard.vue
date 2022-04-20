<template>
	<view class="bg-white rounded-2xl w-full p-4">
		<view class="flex items-center text-xs">
			<view>订单号：{{ msg.id }}</view>
			<view class="text-red-400 ml-auto">订单状态：{{ msg.orderstate }}</view>
		</view>
		<view v-for="(item, index) in msg.orderproducts" :key="index" style="margin-top: 32rpx">
			<view class="flex items-stretch">
				<image :src="item.productimage" width="200rpx" height="200rpx" class="rounded-md flex-shrink-0" style="width: 200rpx; height: 200rpx" />
				<view class="flex-grow text-xs flex flex-col justify-between" style="margin-left: 16rpx; padding: 8rpx 0">
					<view class="line-2 text-xs" style="height: 64rpx">{{ item.productname }}</view>
					<view class="text-gray-500">x{{ item.icount }}</view>
					<view class="text-lg text-red-400">
						<text>{{ item.iprice }}</text>
						<text class="text-xs" style="margin-right: 8rpx">港币</text>
						<text class="text-xs text-gray-500">约{{ Math.round(item.iprice * rate * 10) / 10 }}元</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex items-center justify-end">
			<!-- 取消订单 -->
			<button
				v-if="msg.orderstate === '待付款'"
				size="mini" plain
				:disabled="disabled.cancel"
				class="rounded-2xl text-xs btn-gray"
				@click="cancelOrders(msg.id)"
			>
				取消订单
			</button>
			<!-- 查看订单 -->
			<button
				v-if="msg.orderstate !== '已评价' && msg.orderstate !== '已取消' && msg.productname !== '高级经理购买'"
				size="mini" plain
				class="rounded-2xl text-xs btn-red"
				@click="toDetail(msg.id)"
			>
				查看订单
			</button>
			<!-- 确认收货 -->
			<button
				v-if="msg.orderstate === '待收货' || msg.orderstate === '正在派件'"
				size="mini" plain
				class="rounded-2xl text-xs btn-red"
				@click="confirmReceipt(msg.id)"
			>
				确认收货
			</button>
			<!-- 去支付 -->
			<button
				v-if="msg.orderstate === '待付款'"
				size="mini" plain
				class="rounded-2xl text-xs btn-red"
			>
				去支付
			</button>
		</view>
		<view v-if="msg.ipaysum" class="text-right text-xs text-gray-600" style="margin-top: 32rpx">{{ count }}件商品  共{{ msg.ipaysum }}港币</view>
	</view>
</template>

<script>
	export default {
		name: "OrderCard",
		props: {
			msg: {
				type: Object,
				resquired: true
			}
		},
		data() {
			return {
				rate: uni.getStorageSync('rate'),
				disabled: {
					cancel: false
				}
			}
		},
		computed: {
			count() {
				let c = 0
				this.msg.orderproducts.forEach(item => { c += item.icount })
				return c
			}
		},
		methods: {
			// 查看订单
			toDetail(id) {
				this.$emit('todtl', id)
			},
			// 确认收货
			confirmReceipt(id) {
				uni.showModal({
					content: '是否已收到货物?',
					confirmText: '我已签收',
					cancelText: '还未签收',
					cancelColor: '#999999',
					confirmColor: '#F03E38',
					success: (e) => {
						if(e.confirm) {
							this.$api({
								method: 'PUT',
								url: '/order/putConfirmgetpro', 
								contentType: 'application/x-www-form-urlencoded',
								data: { userid: uni.getStorageSync('user').id, orderid: id }
							}).then((res) => {
								if(res.data.code === 20000) {
									uni.showToast({title: '操作成功'})
									this.$emit('confirm')
								}
							})
						}
					}
				})
			},
			// 取消订单
			cancelOrders(id) {
				this.disabled.cancel = true
				uni.showModal({
					content: '确定要取消订单吗?',
					confirmText: '取消订单',
					cancelText: '暂不取消',
					cancelColor: '#F03E38',
					confirmColor: '#999999',
					success: (e) => {
						if(e.confirm) {
							this.$api({
								method: 'PUT',
								url: '/order/putCancelorder', 
								contentType: 'application/x-www-form-urlencoded',
								data: { userid: uni.getStorageSync('user').id, orderid: id }
							}).then((res) => {
								if(res.data.code === 20000) {
									uni.showToast({title: '取消成功'})
									this.$emit('cancel')
								}
							})
						}
						this.disabled.cancel = false
					}
				})
			},
		}
	}
</script>

<style scoped>
	.btn-red {
		line-height: 48rpx; 
		padding: 0 24rpx; 
		margin-left: 16rpx; 
		margin-top: 32rpx; 
		border: solid #F03E38 2rpx; color: #F03E38
	}
	.btn-gray {
		line-height: 48rpx; 
		padding: 0 24rpx; 
		margin-left: 16rpx; 
		margin-top: 32rpx; 
		color: #999999; border: solid #999999 2rpx
	}
</style>
