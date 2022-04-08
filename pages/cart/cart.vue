<template>
	<view 
		class="relative text-sm text-gray-800 bg-gray-100 min-h-screen"
		style="padding: 96rpx 0 126rpx 0"
	>
		<!-- 缺省页 Empty -->
		<view v-show="showEmpty && !showLoading">
			<u-empty
			  mode="car"
			  width="460rpx"
				height="460rpx"
				text="购物车还是空的"
				icon="http://cdn.uviewui.com/uview/empty/car.png"
			/>
			<navigator url="/pages/index/index" open-type="switchTab" class="mx-auto" style="width: 300rpx; margin-top: 50rpx">
				<u-button type="primary" shape="circle" text="逛逛首页" color="linear-gradient(to right, #ff5d32, #f00f23)" />
			</navigator>
		</view>
		<!-- 加载 Loading -->
		<view v-show="showLoading" class="absolute inset-x-0" style="padding: 16rpx; top: 120rpx" >
			<u-loading-icon text="加载中,请稍后..." textSize="16" />
		</view>
		<!-- top -->
		<view v-show="showTop" class="fixed top-0 inset-x-0" style="z-index: 999">
			<view
				class="flex items-center bg-white rounded-b-2xl" 
				style="height: 96rpx; padding: 0 32rpx"
			>
				<view class="text-lg font-bold">购物车</view>
				<view
					class="ml-auto text-sm"
					style="padding: 16rpx"
					@click="editStatus = !editStatus"
				>
					{{ editStatus ? '完成': cartList.length > 0 ? '编辑商品' : '' }}
				</view>
			</view>
		</view>
		<!-- main -->
		<view v-show="!showLoading">
			<view
				v-for="(shop, index) in cartList"
				:key="index"
				class="bg-white rounded-2xl"
				style="padding: 32rpx; margin-top: 28rpx"
			>
				<!-- 店铺 -->
				<view class="flex items-center">
					<view
						class="rounded-full flex items-center justify-center"
						:class="shop.checkcountry ? 'bg-red-400' : 'bg-white border-red-full'"
						style="width: 34rpx; height: 34rpx"
						@click="checkShop(index)"
					>
						<u-icon v-show="shop.checkcountry" size="34rpx" labelSize="22rpx" name="checkbox-mark" color="#FFFFFF" />
					</view>
					<text class="text-sm font-bold" style="margin-left: 32rpx">{{ shop.storename }}</text>
				</view>
				
				<view v-for="(card, cardIdx) in shop.productMain" :key="card.id" style="margin-top: 32rpx">
					<view class="flex ites-stretch">
						<view class="flex-shrink-0 flex items-center">
							<view
								class="rounded-full flex items-center justify-center"
								:class="card.check ? 'bg-red-400' : 'bg-white border-red-full'"
								style="width: 34rpx; height: 34rpx"
								@click="checkDrug(index, cardIdx)"
							>
								<u-icon v-show="card.check" size="34rpx" labelSize="22rpx" name="checkbox-mark" color="#FFFFFF" />
							</view>
						</view>
						
						<view class="flex-shrink-0" style="margin-left: 32rpx; width: 200rpx; height: 200rpx">
							<u--image :src="card.simage1" width="200rpx" height="200rpx" radius="5" />
						</view>
						<view class="flex-grow" style="margin-left: 24rpx">
							<view
								class="line-2" style="height: 80rpx; line-height: 40rpx"
								:class="card.productMaintbl.icount === 0 ? 'text-gray-500':''"
							>
								{{ card.stitle }}
							</view>
							<view 
								class="text-lg" style="margin-top: 4rpx"
								:class="card.productMaintbl.icount === 0 ? 'text-red-300':'text-red-400'"
							>
								{{ card.productMaintbl.iprice }}
								<span class="text-xs" style="margin-right: 4rpx">港币</span>
								<span class="text-xs text-gray-500">约{{ Math.round(card.productMaintbl.iprice * rate * 10) / 10 }}元</span>
							</view>
							<view class="flex items-center" style="margin-top: 8rpx">
								<u-number-box
									v-model="cartList[index].productMain[cardIdx].icount"
									:name="card.id"
									:disabled="disabled.stepper"
									button-size="56rpx"
									:max="999"
									integer
								  @change="changeStepper"
								/>
								<view
									v-if="card.productMaintbl.icount === 0"
									class="text-xs text-gray-600 ml-auto"
								>
									已售罄
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- submit-bar -->
		<view
			v-show="!showLoading && !showEmpty" 
			class="fixed bottom-0 inset-x-0 bg-white u-border-top flex items-center"
			style="height: 98rpx; z-index: 999; padding: 0 32rpx"
		>
			<!-- checked -->
			<view class="flex-shrink-0 flex items-center" @click="checkAll">
				<view
					class="rounded-full flex items-center justify-center"
					:class="checked ? 'bg-red-400' : 'bg-white border-red-full'"
					style="width: 34rpx; height: 34rpx"
				>
					<u-icon v-show="checked" size="34rpx" labelSize="22rpx" name="checkbox-mark" color="#FFFFFF" />
				</view>
				<text class="text-gray-600" style="margin-left: 8rpx">全选</text>
			</view>
			<!-- right -->
			<view v-show="!editStatus" class="ml-auto flex items-center">
				<view style="margin-right: 8rpx">合计:</view>
				<view class="text-red-400 text-xs">HK$ <text class="text-lg">{{ totalPrice }}</text></view>
				<button 
					class="text-white text-sm rounded-full buy-btn"
					:disabled="disabled.submit"
					@click="onSubmit"
				>
					去结算({{ totalNum }})
				</button>
			</view>
			<view v-show="editStatus" class="ml-auto flex items-center">
				<button
					plain
					:disabled="disabled.collection"
					class="rounded-full text-sm collection-btn"
				>
					移入收藏夹
				</button>
				<button 
					class="rounded-full text-sm bg-red-400 text-white delete-btn"
					:disabled="disabled.delete"
					@click="deleteProduct"
				>
					删除
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rate: uni.getStorageSync('rate'),
				showTop: false,  // 一开始不显示，当列表不为空时显示
				showEmpty: false,
				showLoading: true,
				cartList: [],
				choiceList: [],
				checked: false,
				editStatus: false,
				disabled: {
					stepper: false,
					collection: true,
					delete: true,
					submit: true
				},
				totalNum: 0,
				totalPrice: 0
			}
		},
		onLoad() {
			if(!uni.getStorageSync('token')) this.showEmpty = true
		},
		onShow() {
			this.getList()
		},
		watch: {
			cartList: {
				handler(item,index) {
					this.choiceList = []
					this.checked = true
					this.totalNum = this.totalPrice = 0
					this.cartList.forEach((item) => {
						item.productMain.forEach((i) => {
							if(i.check) {
								this.choiceList.push(i.id)
								this.totalNum += i.icount
								this.totalPrice += i.productMaintbl.iprice * i.icount
								this.disabled.delete = this.disabled.submit = this.disabled.collection = false
							} else {
								this.checked = false
							}
						})
					})
					if(this.totalNum === 0) this.disabled.delete = this.disabled.submit = this.disabled.collection = true
				},
				deep: true // 深度监听父组件传过来对象变化
			}
		},
		methods: {
			// 获取列表
			async getList() {
				const res = await this.$api({url: '/cart/getList', data: { userid: uni.getStorageSync('user').id }})
				this.showLoading = false
				this.showEmpty = res.data.data.length === 0
				this.showTop = !(res.data.data.length === 0)
				this.cartList = res.data.data
			},
			// 选择店铺
			checkShop(sIdx) {
				this.cartList[sIdx].checkcountry = !this.cartList[sIdx].checkcountry
				this.cartList[sIdx].productMain.forEach(item => {
					if(item.productMaintbl.icount > 0 || this.editStatus) { item.check = this.cartList[sIdx].checkcountry }
				})
			},
			// 选择药品
			checkDrug(sIdx, cIdx) {
				let dValue = this.cartList[sIdx].productMain[cIdx].check
				dValue = this.cartList[sIdx].productMain[cIdx].check = !dValue
				if(!dValue) this.cartList[sIdx].checkcountry = false
				if(dValue && this.cartList[sIdx].productMain.every(item => item.check === true)) this.cartList[sIdx].checkcountry = true
			},
			// 全选
			checkAll() {
				this.checked = !this.checked
				this.cartList.forEach(item => {
					item.checkcountry = this.checked
					item.productMain.forEach(i => i.check = this.checked)
				})
			},
			// 切换数量
			async changeStepper(stepper) {
				this.disabled.stepper = true
				uni.showLoading({title: '加载中'})
				const res = await this.$api({
					method: 'PUT',
					url: '/cart/putcount', 
					contentType: 'application/x-www-form-urlencoded', 
					data: { cartid: stepper.name, count:stepper.value }
				})
				setTimeout(() => {
					uni.showToast({ title:'成功！', complete: () => {this.disabled.stepper = false}})
				}, 300)
			},
			// 删除商品
			deleteProduct() {
				if(this.choiceList.length > 0) {
					uni.showModal({ content: '确认删除选中的商品吗？', cancelText: '我再想想', cancelColor: '#999999', confirmColor:'#F03E38', success:(res) => {
						if(res.confirm) this.delete()
					}})
				} else {
					uni.showToast({ title: '当前没有选择商品'})
				}
			},
			async delete() {
				const res = await this.$api({
					method: 'DELETE',
					contentType: 'application/x-www-form-urlencoded',
					url: '/cart/deleteBatch',
					data: { cartids: this.choiceList.toString()}
				})
				uni.showToast({ title: '删除成功'})
				this.getList()
			},
			// 去结算
			onSubmit() {
				if(uni.getStorageSync('shiming') === '0') {
					uni.showModal({ title: '您还未实名认证，请先完善信息喲', icon: 'fail', showCancel: false, success: () => {
						uni.navigateTo({ url: '/subpages/info/info' })
					}})
					return
				}
				uni.setStorageSync('orderList', this.choiceList)
				uni.navigateTo({ url: '/subpages/confirmorder/confirmorder?from=cart' })
			}
		}
	}
</script>

<style scoped>
	.border-red-full {
		border: 1px solid #CCCCCC
	}
	.buy-btn {
		min-width: 200rpx; margin-left: 16rpx; background: linear-gradient(to right, #ff5d32, #f00f23)
	}
	.buy-btn[disabled] {
		min-width: 200rpx; margin-left: 16rpx; background: linear-gradient(to right, #FFC3B3, #F7828C); color: #FFFFFF;
	}
	.collection-btn[disabled] {
		color: #CCCCCC; border: 1px solid #CCCCCC
	}
	.delete-btn {
		margin-left: 20rpx
	}
	.delete-btn[disabled] {
		margin-left: 20rpx; background-color: #FCA5A5; color: #FFFFFF;
	}
</style>
