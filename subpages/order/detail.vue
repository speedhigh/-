<template>
	<view class="relative text-sm text-gray-800 bg-gray-200 min-h-screen">
		<view>
			<!-- 红色背景、状态 -->
			<view class="bg-red-400 p-4 flex items-center text-white" style="height: 180rpx">
				<view class="flex-shrink-0">
					<u--image src="/static/images/user/car.webp" width="88rpx" height="84rpx" />
				</view>
				<view class="flex-grow" style="margin-left: 29rpx">
					<view class="text-base">{{ content[list.orderstate].title }}</view>
					<view class="text-xs" style="margin-top: 24rpx">{{ content[list.orderstate].text }}</view>
				</view>
			</view>
			<!-- 地址 -->
			<view class="bg-white rounded-b-2xl p-4">
				<view style="margin-bottom: 16rpx">
					<view>{{ list.name }} {{ list.telephone }}</view>
				</view>
				<view class="line-2 text-xs text-gray-600">
					{{ list.address }} {{ list.sdetail }}
				</view>
			</view>
			<!-- card -->
			<view 
				v-for="(item, index) in list.carts" 
				:key="index" 
				class="bg-white rounded-2xl p-4"
				style="margin-top: 24rpx"
			>
				<view class="flex items-center text-xs">
					<view>订单号：{{ id }}</view>
					<view class="text-red-400 ml-auto"> 订单状态：{{ list.orderstate }} </view>
				</view>
				<view v-for="(msg, idx) in item.productMain" :key="idx">
					<view class="flex items-stretch" style="margin-top: 32rpx">
						<image :src="msg.simage1" width="200rpx" height="200rpx" class="rounded-md flex-shrink-0" style="width: 200rpx; height: 200rpx" />
						<view class="flex-grow text-xs flex flex-col justify-between relative" style="margin-left: 16rpx; padding: 8rpx 0">
							<view class="line-2 text-xs" style="height: 64rpx">{{ msg.stitle }}</view>
							<view class="text-gray-500">x{{ msg.icount }}</view>
							<view class="text-lg text-red-400">
								<text>{{ msg.iprice }}</text>
								<text class="text-xs" style="margin-right: 8rpx">港币</text>
								<text class="text-xs text-gray-500">约{{ Math.round(msg.iprice * rate * 10) / 10 }}元</text>
							</view>
							<!-- 评价按钮 -->
							<button
								v-if="list.orderstate === '待评价'"
								size="mini" plain
								class="absolute right-0 bottom-0 text-xs rounded-2xl"
								:class="msg.evaluated ? 'btn-gray' : 'btn-red'"
							>
								{{ msg.evaluated ? '已评价' : '去评价' }}
							</button>
						</view>
					</view>
				</view>
				<!-- btn -->
				<view class="flex justify-end items-center">
					<button
						v-if="list.orderstate === '待付款'"
						size="mini" plain
						:disabled="disabled.cancel"
						class="rounded-2xl text-xs btn-gray"
						@click="cancelOrders"
					>
						取消订单
					</button>
					<!-- 去支付 -->
					<button
						v-if="list.orderstate === '待付款'"
						size="mini" plain
						class="rounded-2xl text-xs btn-red"
					>
						去支付
					</button>
					<!-- 查看物流 -->
					<button
						v-if="list.orderstate === '待发货' || list.orderstate === '待收货'"
						size="mini" plain
						class="rounded-2xl text-xs btn-red"
						@click="toLogistics(id)"
					>
						查看物流
					</button>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="p-4 bg-white rounded-2xl text-xs text-gray-600" style="margin-top: 24rpx">
				<view class="flex items-center justify-end">
					<view>订单编号</view>
					<view style="margin: 0 24rpx 0 16rpx">:</view>
					<view style="width: 200rpx">{{ id }}</view>
				</view>
				<view 
					v-for="(item, index) in infoList"
					:key="index"
					v-show="list[item.value] > 0"
					class="flex items-center justify-end"
					style="margin-top: 28rpx"
				>
					<view>{{ item.text }}</view>
					<view style="margin: 0 24rpx 0 16rpx">:</view>
					<view style="width: 200rpx">{{ list[item.value] }}港币</view>
				</view>
				<view class="flex items-center justify-end" style="margin-top:24rpx">
					<view>应付金额</view>
					<view style="margin: 0 24rpx 0 16rpx">:</view>
					<view style="width: 200rpx"> <text class="text-red-400 text-base font-bold">{{ list.totalprice }}</text> 港币</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rate: uni.getStorageSync('rate'),
				id: null,
				active: '',
				state: '',
				list: [],
				content: {
					'待付款': { title: '待付款', text: '订单有效期为24小时，请尽快完成订单' },
					'待发货': { title: '待发货', text: '包裹正在揽收' },
					'待收货': { title: '待收货', text: '请留意电话或短信以便及时接收快递' },
					'待评价': { title: '交易成功啦！', text: '写评价分享你的购物心情吧！' },
					'已评价': { title: '已评价', text: '感谢您的评价！您的满意是我们永恒的追求！' }
				},
				infoList: [
					{ text: '商品应付总计', value:'price' },
					{ text: '运费', value:'yunfei' },
					{ text: '税费', value:'shuifei' },
					{ text: '会员优惠', value:'vipyouhui' },
					{ text: '优惠券优惠', value:'quanyouhui' }
				],
				disabled: {
					cancel: false
				}
			}
		},
		onLoad(option) {
			this.id = option.id
			this.active = option.active
			this.state = option.state
		},
		onShow() {
			this.getList(this.id)
		},
		methods: {
			async getList(id) {
				const res = await this.$api({url: '/order/get', data: {orderid: id}})
				if(res.data.code === 20000) this.list = res.data.data
			},
			cancelOrders() {
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
								data: { userid: uni.getStorageSync('user').id, orderid: this.id }
							}).then((res) => {
								if(res.data.code === 20000) {
									uni.showToast({title: '取消成功'})
									uni.redirectTo({ url: '/subpages/order/order?state=' + this.state + '&active=' + this.active })
								}
							})
						}
						this.disabled.cancel = false
					}
				})
			},
			toLogistics(id) {
				uni.navigateTo({
					url: "/subpages/transport/transport?id=" + id
				})
			}
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
