<template>
	<view class="relative bg-gray-100 text-sm text-gray-800 min-h-screen" style="padding-bottom: 128rpx">
		<!-- 1，地址 -->
		<navigator 
			:url="'/subpages/address/address?from=' + pageFrom"
			open-type="redirect"
			class="bg-white rounded-b-2xl flex items-center p-4"
		>
			<view class="flex-grow" style="margin-right: 16rpx">
				<view class="flex items-center" style="margin-bottom: 16rpx">
					<view style="margin-right: 16rpx">{{ address.slinkman }} {{ address.smobile }}</view>
					<view 
						v-show="address.itype === 2" 
						class="bg-red-400 text-xs text-white rounded-full" style="padding: 0 8rpx"
					>
						默认
					</view>
				</view>
				<view class="line-2 text-xs text-gray-600">{{ address.saddressname }} {{ address.sdetail }}</view>
			</view>
			<view class="ml-auto flex-shrink-0">
				<u-icon slot="right" name="arrow-right" color="#666666" />
			</view>
		</navigator>
		<!-- 2，商品 -->
		<view
			v-for="(item, index) in orderList.carts"
			:key="index"
			class="bg-white rounded-2xl mt-3d5 p-4" 
		>
			<text>{{ item.storename }}</text>
			<view v-for="(card) in item.productMain" :key="card.id" style="margin-top: 32rpx">
				<view class="flex items-stretch">
					<view class="flex-shrink-0" style="width: 200rpx; height: 200rpx">
						<u--image :src="card.simage1" width="200rpx" height="200rpx" radius="5" />
					</view>
					<view class="flex-grow" style="margin-left: 20rpx">
						<view class="line-2" style="height: 68rpx">{{ card.stitle }}</view>
						<view class="text-red-400" style="margin-top: 10rpx">
							<text class="text-lg">{{ card.productMaintbl.iprice }}</text>
							<text class="text-xs" style="margin: 0 8rpx">港币</text>
							<text class="text-xs text-gray-500">约{{ Math.round(card.productMaintbl.iprice * rate * 10) / 10 }}元</text>
						</view>
						<view style="margin-top: 16rpx">
							<u-number-box
								v-model="card.icount"
								:name="card.id"
								:disabled="disabled.stepper"
								button-size="56rpx"
								:max="999"
								integer
							  @change="changeStepper"
							/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 3，价格表 -->
		<view class="bg-white rounded-2xl mt-3d5 p-4">
			<!-- 商品金额 -->
			<view class="flex">
				<view>商品金额</view>
				<view class="ml-auto">{{ price }}港币</view>
			</view>
			<!-- 运费 -->
			<view
				v-show="freight > 0 || orderList.yanxitangyouhuiyaopin === 1" 
				class="flex justify-between text-sm mt-3d5"
			>
				<view>运费</view>
				<view v-if="orderList.yanxitangyouhuiyaopin === 0">{{ freight }}港币</view>
				<view v-else class="text-red-300">燕喜堂用户专享0运费</view>
			</view>
			<!-- 税费 -->
			<view class="flex mt-3d5">
				<view>税费</view>
				<view class="ml-auto">{{ tax }}港币</view>
			</view>
			<!-- 优惠券 -->
			<view class="flex mt-3d5">
				<view>优惠券</view>
				<view v-if="coupon.text === '暂无可用优惠券'" class="text-gray-400">暂无可用优惠券</view>
				<navigator url="/subpages/coupon/coupon" v-else class="ml-auto">
					<text>{{ coupon.text }}</text>
					<text style="margin-left: 4rpx">></text>
				</navigator>
			</view>
			<!-- 运费提示 -->
			<view class="text-right text-xs mt-3d5 text-gray-600">邮费65港币，满500邮费20，满700包邮</view>
			<!-- 勾选同意委托 -->
			<view class="mt-3d5 flex justify-end">
				<u-checkbox-group @change="clickProxy">
					<u-checkbox
						shape="circle"
						name="同意"
						label="本人同意并接受"
						labelSize="24rpx"
						iconSize="28rpx"
						activeColor="#F03E38"
					/>
					<text class="text-xs text-red-400" @click="showProxy">《进口个人申报委托》</text>
				</u-checkbox-group>
			</view>
		</view>
		<!-- 4，支付方式 -->
		<view class="bg-white rounded-2xl mt-3d5 p-4 flex items-center justify-between">
			<view>支付方式</view>
			<u-icon name="weixin-fill" color="#04BE02" size="50rpx" label="微信支付" />
		</view>
		<!-- submit-bar -->
		<view 
			class="fixed bottom-0 inset-x-0 bg-white u-border-top" 
			style="height: 100rpx; padding: 0 32rpx"
		>
			<view class="flex items-center justify-end" style="height: 100%">
				<view>合计：</view>
				<view class="text-red-400" style="margin-top: -6rpx">
					<text>HK$</text>
					<text class="text-lg">148</text>
				</view>
				<button
					class="text-white text-sm rounded-full buy-btn"
				>
					去结算
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			// 商品金额
			price() {
				let p = 0
				this.orderList.carts.forEach(item => {
					item.productMain.forEach((i) => { p += i.productMaintbl.iprice * i.icount })
				})
				return p
			},
			// 运费
			freight() {
				if(this.orderList.vip === 2 || this.price >= 700 || this.orderList.yanxitangyouhuiyaopin === 1) return 0
				if(this.price < 500) return 65
				return 20
			},
			// 税费
			tax() {
				return Math.ceil(this.price * 0.5) / 10 
			}
		},
		data() {
			return {
				rate: uni.getStorageSync('rate'),
				pageFrom: '',
				disabled: {
					stepper: false
				},
				address: {
					id: 0,
					itype: 0,
					iuserid: 0,
					saddressname: "",
					scardno: "",
					sdetail: "",
					slinkman: "",
					smobile: ""
				},
				orderList: {
					carts: []
				},
				coupon: {
					text: '',
					list: [],
					noList: []
				},
				checkedProxy: false
			}
		},
		onLoad(option) {
			this.pageFrom = option.from
		},
		onShow() {
			// 一， 获取地址信息（两种情况，显示默认地址 或 地址列表选择的地址）
			if(uni.getStorageSync('addressId')) this.getAddress('/useraddress/get', {addressid: uni.getStorageSync('addressId')})
			if(!uni.getStorageSync('addressId')) this.getAddress('/useraddress/getdefault', {userid: uni.getStorageSync('user').id})
			// 二， 获取商品列表（两种情况，详情页进入的 或 购物车进入的）
			if(this.pageFrom === 'detail') this.getOrderList('/pay/buynow', { userid: uni.getStorageSync('user').id, pid: uni.getStorageSync('productId')})
			if(this.pageFrom === 'cart')	this.getOrderList('/pay/confirmorder', {userid: uni.getStorageSync('user').id, cartids: uni.getStorageSync('orderList')})
		},
		methods: {
			async getAddress(url, data) {
				const res = await this.$api({ url: url, data: data })
				Object.assign(this.address, res.data.data)
				if(!uni.getStorageSync('addressId')) uni.setStorageSync('addressId', res.data.data.id)
			},
			async getOrderList(url, data) {
				const res = await this.$api({ url: url, data: data })
				Object.assign(this.orderList, res.data.data)
				if(res.data.data.usingquan.id) this.coupon.text = res.data.data.usingquan.quanname
				if(!res.data.data.usingquan.id) this.getCouponNum()
			},
			async getCouponNum() {
				const res = await this.$api({url: '/quan/getcount_Canuse', data: {userid: uni.getStorageSync('user').id}})
				res.data.data === 0 ? this.coupon.text = '暂无可用优惠券' : this.coupon.text = res.data.data + '张可用'
			},
			// 修改数量（两种情况，详情页进入的 或 购物车进入的）
			async changeStepper(stepper) {
				this.disabled.stepper = true
				uni.showLoading({title: '加载中'})
				if(this.pageFrom === 'cart') {
					await this.$api({
						contentType: 'application/x-www-form-urlencoded', 
						url: '/cart/putcount', 
						method: 'PUT', 
						data: {cartid: stepper.name, count: stepper.value}
					})
				} else {
					await this.$api({
						url: '/pay/buynowchange',
						data: { userid: uni.getStorageSync('user').id, pid: uni.getStorageSync('productId'), count: stepper.value }
					})
				}
				setTimeout(() => {
					uni.hideLoading()
					this.disabled.stepper = false
				}, 50)
			},
			clickProxy(n) {
				this.checkedProxy = (n[0] === '同意')
			},
			showProxy() {
				uni.showModal({ title:'进口个人申报委托', showCancel: false, confirmColor: '#F03E38', content: '本人承诺所购买商品系个人合理自用，不会进行二次销售，针对境外（包括保税区等特殊监管区域）发货的各种商品，现委托商家或其委托的物流商代理申报、代缴税款等通关事宜，本人保证遵守《海关法》和国家相关法律法规，保证所提供的收件人身份信息和收货信息真实完整，无侵犯他人权益的行为，并督促保证代缴义务人足额支付应缴税款。以上委托关系系如实填写，本人愿意接受海关及其他监管部门的监管，并承担相应法律责任。' })
			}
		}
	}
</script>

<style scoped>
  .buy-btn {
		min-width: 200rpx; margin-left: 16rpx; background: linear-gradient(to right, #ff5d32, #f00f23)
	}
	.buy-btn[disabled] {
		min-width: 200rpx; margin-left: 16rpx; background: linear-gradient(to right, #FFC3B3, #F7828C); color: #FFFFFF;
	}
</style>
