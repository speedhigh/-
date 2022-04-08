<template>
	<view class="relative text-sm text-gray-800 bg-gray-100" style="padding-bottom: 100rpx">
		<!-- 轮播图 -->
		<u-swiper :list="swipers" height="750rpx" imgMode="scaleToFill" indicator indicatorInactiveColor="#E6E6E6" indicatorActiveColor="#F03E38" />
		<!-- 信息区 -->
		<view 
			class="bg-white rounded-b-2xl"
			style="border-top:1px solid #F7F7F7; padding: 36rpx 32rpx;"
		>
			<text class="text-base font-bold">{{ info.stitle }}</text>
			<view class="text-red-400" style="margin-top: 20rpx">
				<text class="text-4xl font-bold">{{ info.iprice }}</text>
				<text style="margin-left: 8rpx; margin-top: -4rpx;">港币 (约{{ Math.round(info.iprice * rate * 10) / 10 }}元)</text>
			</view>
			<view class="flex text-gray-600" style="margin-top: 14rpx">
				<view v-if="info.brand">{{ info.brand }}</view>
				<view class="ml-auto">已售{{ info.icountsale }}</view>
			</view>
			<view
				class="flex justify-between items-center"
				style="margin-top: 32rpx; padding: 0 8rpx"
			>
				<view class="iconfont icon-selection text-red-400 flex items-center">
					<view class="text-gray-900 text-sm" style="margin-left: 8rpx">正品承诺</view>
				</view>
				<view class="bg-gray-300" style="width: 2rpx; height: 40rpx" /> <!-- 分割线 -->
				<view class="iconfont icon-global text-red-400 flex items-center">
					<view class="text-gray-900 text-sm" style="margin-left: 8rpx">海外直邮</view>
				</view>
				<view class="bg-gray-300" style="width: 2rpx; height: 40rpx" /> <!-- 分割线 -->
				<view class="iconfont icon-safe text-red-400 flex items-center">
					<view class="text-gray-900 text-sm" style="margin-left: 8rpx">低价保障</view>
				</view>
			</view>
		</view>
		<!-- 评价 -->
		<view v-show="commentList.length > 0" class="bg-white rounded-2xl" style="margin-top: 28rpx; padding: 32rpx">
			<view class="flex items-center">
				<view class="bg-red-400 rounded-lg" style="width: 6rpx; height: 32rpx; margin-right: 13rpx;" />
				<view class="text-base font-bold">评价<text class="text-xs text-gray-600 font-normal" style="margin-left: 12rpx">({{ cmtTotal }}条)</text></view>
				<view class="ml-auto">
					<u-icon label="查看更多" labelPos="left" labelSize="28rpx" size="28rpx" name="arrow-right"></u-icon>
				</view>
			</view>
			<view v-for="(item, index) in commentList" :key="index">
				<view class="flex items-center" style="margin-top: 32rpx">
					<u-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" size="68rpx" />
					<view style="margin-left: 13rpx">
						<view>{{ item.userName }}</view>
						<view class="flex items-center">
							<view class="text-gray-600 text-xs" style="margin-right: 12rpx">{{ item.time }}</view>
							<u-rate :count="5" v-model="item.irank" size="12" gutter="0" />
						</view>
					</view>
				</view>
				<view class="line-2" style="margin-top: 25rpx; height: 66rpx">
					{{ item.smemo }}
				</view>
			</view>
		</view>
		<!-- 更多推荐 -->
		<view 
			class="bg-white rounded-2xl" 
			style="margin-top: 28rpx; padding: 32rpx 0 32rpx 32rpx"
		>
			<view class="flex items-center" style="margin-bottom: 32rpx">
				<view class="bg-red-400 rounded-lg" style="width: 6rpx; height: 32rpx; margin-right: 13rpx" />
				<text class="text-base font-bold">更多推荐</text>
			</view>
			<scroll-view scroll-x="true" enable-flex="true" scroll-with-animation="true" :scroll-left="scrollLeft">
				<view class="flex items-center">
					<view v-for="(item, index) in moreList" :key="index" class="flex-shrink-0">
						<navigator
							:url="'/pages/detail/detail?id=' + item.id"
							class="rounded-md"
							style="width: 240rpx; height: 452rpx; border:1px solid #F1F1F1; margin-right: 28rpx"
						>
							<image :src="item.simage1" mode="" class="rounded-t-md" style="width: 240rpx; height: 240rpx" />
							<view style="padding: 16rpx">
								<view class="text-xs line-2">{{ item.stitle }}</view>
								<view class="text-red-400 text-lg" style="margin-top: 8rpx">{{ item.iprice }} <text class="text-xs">港币</text></view>
								<view class="flex items-center text-xs text-gray-600" style="margin-top: 16rpx;">
									<view>{{ item.country }}</view>
									<view class="ml-auto">已售{{ item.icountsale }}</view>
								</view>
							</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 药品详情 -->
		<view class="bg-white rounded-t-2xl" style="margin-top: 28rpx; padding: 32rpx">
			<view class="flex items-center" style="margin-bottom: 32rpx">
				<view class="bg-red-400 rounded-lg" style="width: 6rpx; height: 32rpx; margin-right: 13rpx" />
				<text class="text-base font-bold">药品详情</text>
			</view>
			<view v-for="(item, index) in dtlList" :key="index" class="text-center">
				<image :src="item.img" mode="widthFix" lazy-load="true" />
			</view>
		</view>
		<!-- action-bar -->
		<view
			class="fixed bottom-0 inset-x-0 w-full bg-white u-border-top flex items-center" 
			style="height: 100rpx; z-index: 9999; padding: 0 16rpx"
		>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="flex-shrink-0" style="padding: 0 14rpx">
				<u-icon label="购物车" labelPos="bottom" labelSize="24rpx" size="52rpx" name="shopping-cart" />
			</navigator>
			<view class="flex-shrink-0" style="padding: 0 20rpx">
				<u-icon label="客服" labelPos="bottom" labelSize="24rpx" size="48rpx" name="kefu-ermai" />
			</view>
			<view class="flex-shrink-0" style="padding: 0 20rpx">
				<u-icon label="收藏" labelPos="bottom" labelSize="24rpx" size="48rpx" name="star" />
			</view>
			<view class="flex-grow flex items-center" style="margin-left: 16rpx;">
				<view
					class="rounded-l-full flex items-center justify-center text-white"
					:class="disabled.cart ? 'cart-btn-disabled' : 'cart-btn'"
					@click="addCart"
				>
					加入购物车
				</view>
				<view 
					class="rounded-r-full flex items-center justify-center text-white" 
					:class="disabled.buy ? 'buy-btn-disabled' : 'buy-btn'"
					@click="buy"
				>
					立即购买
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productId: 0,
				rate: uni.getStorageSync('rate'),
				swipers: [],
				info: {},
				commentList: [{}],
				cmtTotal: 0,
				moreList: [],
				scrollLeft: 0,
				dtlList: [],
				disabled: {
					cart: false,
					buy: true
				}
			}
		},
		onLoad(option) {
			uni.setStorage('productId', option.id)
			this.productId = option.id
			this.getSwipers(option.id)	// 获取轮播
			this.getInfo(option.id)			// 获取Info
			this.getComment(option.id) 	// 获取评论
			this.getMoreList(option.id) // 获取更多推荐
			this.getDtlList(option.id)  // 获取详情图
		},
		methods: {
			async getSwipers(id) {
				const res = await this.$api({ url: '/open/product_detail/get_product_images', data: { id: id } })
				this.swipers = res.data.data
			},
			async getInfo(id) {
				const res = await this.$api({ url: '/open/product_detail/get_product_info', data: { id: id } })
				this.info = res.data.data
				this.disabled.buy = (res.data.data.icount === 0)
				if(res.data.data.icount === 0) uni.showToast({ title:'库存为0' })
			},
			async getComment(id) {
				const res = await this.$api({ url: '/open/product_detail/get_productdetail_comment', data: { id: id } })
				this.cmtTotal = res.data.data.length
				this.commentList = res.data.data.length > 2 ? res.data.data.slice(0,2) : res.data.data
				
			},
			async getMoreList(id) {
				const res = await this.$api({ url: '/open/product_detail/get_product_comment', data: { id: id } })
				this.moreList = res.data.data
			},
			async getDtlList(id) {
				const res = await this.$api({ url: '/open/product_detail/get_product_detail_image', data: { productId: id } })
				console.log(res)
				this.dtlList = res.data.data.images
			},
			// 加入购物车
			async addCart() {
				if(!this.disabled.cart) {
					// 没登录
					if(!uni.getStorageSync('token')) {
						uni.showModal({ title: '您还未登录，请先登录', icon: 'fail', showCancel: false, success: () => {
							uni.navigateTo({ url: '/pages/login/login' })
						}})
						return 
					}
					// 没实名认证
					if(uni.getStorageSync('shiming') === '0') {
						uni.showModal({ title: '您还未实名认证，请先完善信息喲', icon: 'fail', showCancel: false, success: () => {
							uni.navigateTo({ url: '/subpages/info/info' })
						}})
						return
					}
					this.disabled.cart = true
					const res = await this.$api({
						method: 'POST',
						contentType: 'application/x-www-form-urlencoded',
						url: '/cart/post',
						data: { userid: uni.getStorageSync('user').id, productId: this.productId }
					})
					if(res.data.code !== 20002) uni.showLoading({title: '加载中'})
					if(res.data.code === 20000) {
						setTimeout(() => {
							uni.showToast({ title:'成功加入购物车', complete: () => {this.disabled.cart = false}})
						}, 300)
					}
				}
			},
			buy() {
				// 没登录
				if(!uni.getStorageSync('token')) {
					uni.showModal({ title: '您还未登录，请先登录', icon: 'fail', showCancel: false, success: () => {
						uni.navigateTo({ url: '/pages/login/login' })
					}})
					return 
				}
				// 没实名认证
				if(uni.getStorageSync('shiming') === '0') {
					uni.showModal({ title: '您还未实名认证，请先完善信息喲', icon: 'fail', showCancel: false, success: () => {
						uni.navigateTo({ url: '/subpages/info/info' })
					}})
					return
				}
				if(!this.disabled.buy) uni.navigateTo({ url: '/subpages/confirmorder/confirmorder?from=deatil' })
			}
		}
	}
</script>

<style scoped>
	.cart-btn {
		width: 215rpx; 
		height: 80rpx;
		background: linear-gradient(to right, rgba(254,204,29,1), rgba(255,141,24,1))
	}
	.cart-btn-disabled {
		width: 215rpx;
		height: 80rpx;
		background: linear-gradient(to right, rgba(254,204,29,0.5), rgba(255,141,24,0.5))
	}
	.buy-btn {
		width: 215rpx; 
		height: 80rpx; 
		background: linear-gradient(to right, rgba(255,93,50,1), rgba(240,15,35,1))
	}
	.buy-btn-disabled {
		width: 215rpx;
		height: 80rpx; 
		background: linear-gradient(to right, rgba(255,93,50,0.5), rgba(240,15,35,0.5))
	}
</style>
