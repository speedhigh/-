<template>
	<view class="text-sm text-gray-800">
		<u-loading-page v-if="loadingNum < 4" :loading="true" loadingText="正在加载..." />
		<view v-else class="relative bg-gray-200">
			<view class="absolute top-bg" />
			<view class="relative">
				<!-- 搜索，购物车 -->
				<view class="flex items-center" style="padding: 8rpx 26rpx 8rpx 26rpx">
					<navigator url="/pages/search/search" class="flex-grow">
						<u-search disabled :showAction="false" height="74rpx" placeholder="搜索药品名、品牌" bgColor="#FFFFFF" />
					</navigator>
					<navigator url="/pages/cart/cart" open-type="switchTab" class="flex-shrink-0" style="margin-left: 10rpx; padding: 0 10rpx">
						<u--image src="/static/images/home/top-cart.png" width="50rpx" height="50rpx" />
					</navigator>
				</view>
				<view class="flex justify-around" style="padding: 18rpx 26rpx 8rpx 26rpx">
					<u-icon size="36rpx" labelSize="24rpx" name="integral" color="#FFFFFF" labelColor="#FFFFFF"
						label="正品承诺" />
					<u-icon size="36rpx" labelSize="24rpx" name="integral" color="#FFFFFF" labelColor="#FFFFFF"
						label="低价保障" />
					<u-icon size="36rpx" labelSize="24rpx" name="integral" color="#FFFFFF" labelColor="#FFFFFF"
						label="会员包邮" />
					<u-icon size="36rpx" labelSize="24rpx" name="integral" color="#FFFFFF" labelColor="#FFFFFF"
						label="海外直邮" />
				</view>
				<!-- 轮播图 -->
				<view style="padding: 0 20rpx; height: 270rpx; margin-top: 16rpx">
					<u-swiper :list="swipers" height="270rpx" imgMode="scaleToFill" radius="12rpx" />
				</view>
				<!-- kingkong 金刚区 -->
				<view style="height: 396rpx; padding: 12rpx 15rpx">
					<u-grid :border="false" col="5">
						<u-grid-item v-for="(item, index) in kingkong" :key="index">
							<navigator :url="'/pages/search/list?id=' + item.scode" style="padding: 20rpx 0">
								<u--image :src="item.image" width="98rpx" height="98rpx" shape="circle" />
								<view class="text-sm" style="margin-top: 10rpx">{{ item.sname }}</view>
							</navigator>
						</u-grid-item>
					</u-grid>
				</view>
				<!-- family 家庭常备药 -->
				<navigator url="/pages/search/list?id=01" height="190rpx">
					<u--image src="/static/images/home/banner-family.png" width="750rpx" height="190rpx" />
				</navigator>
				<!-- recommend 热销推荐区 -->
				<view style="height: 706rpx; padding: 32rpx 20rpx">
					<view class="flex justify-between">
						<navigator :url="'/pages/detail/detail?id=' + recommend.a.productId">
							<u--image :src="recommend.a.img" width="348rpx" height="394rpx" radius="12rpx" />
						</navigator>
						<view>
							<navigator :url="'/pages/detail/detail?id=' + recommend.b.productId">
								<u--image :src="recommend.b.img" width="348rpx" height="190rpx" radius="12rpx" />
							</navigator>
							<navigator :url="'/pages/detail/detail?id=' + recommend.c.productId" style="margin-top: 14rpx">
								<u--image :src="recommend.c.img" width="348rpx" height="190rpx" radius="12rpx" />
							</navigator>
						</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20rpx">
						<view v-for="(item, index) in recommend.list" :key="i">
							<navigator :url="'/pages/detail/detail?id=' + item.productId">
								<u--image :src="item.img" width="166rpx" height="226rpx" radius="12rpx" />
							</navigator>
						</view>
					</view>
				</view>
				<!-- discount 秒杀专区 -->
				<view class="discount-view">
					<view class="flex items-center">
						<text class="font-bold text-white text-base" style="margin-right: 16rpx">秒杀专区</text>
						<base-count-down :time="time" />
						<view class="ml-auto text-white" style="padding: 0 16rpx">查看更多 ></view>
					</view>
					<view class="overflow-x-scroll flex items-center" style="margin-top: 36rpx">
						<view v-for="(item, index) in promotionList" :key="index" class="flex-shrink-0">
							<navigator :url="'/pages/detail/detail?id=' + item.sproduct.id" class="rounded-md bg-white"
								style="width: 258rpx; height: 368rpx; margin-right: 22rpx; padding: 20rpx 16rpx">
								<view class="flex justify-center">
									<u--image :src="item.sproduct.simage1" width="113rpx" height="113rpx" />
								</view>
								<view class="line-2" style="margin-top: 12rpx">{{ item.sproduct.stitle }}</view>
								<view class="text-red-400" style="margin-top: 32rpx">{{ item.sproduct.iprice }}港币</view>
								<view class="flex items-center justify-between" style="margin-top: 6rpx">
									<view class="text-gray-600">约{{ Math.round(item.sproduct.iprice * rate * 10) / 10 }}元</view>
									<u-icon size="46rpx" name="plus-circle-fill" color="#F03E38" @click.native.stop="addCart(item.sproduct.id)" />
								</view>
							</navigator>
						</view>
					</view>
				</view>
				<!-- 分类筛选区域 -->
				<view class="tab-view" />
				<view class="sticky top-0 bg-gray-200" style="z-index: 9999">
					<base-tabs :list="tabTitles" @change="changeTabs" />
				</view>
				<!-- list -->
				<base-pagination ref="paginationRef" url="/open/home/search" :params="params" :loading="false">
					<template v-slot="{list}">
						<view class="flex flex-wrap justify-between" style="padding: 0 20rpx">
							<view v-for="(item, index) in list" :key="index">
								<navigator :url="'/pages/detail/detail?id=' + item.id">
									<muzi-card :item="item" />
								</navigator>
							</view>
						</view>
					</template>
				</base-pagination>
			</view>
		</view>
	</view>
</template>

<script>
	import BaseCountDown from '@/components/BaseCountDown.vue'
	import BaseTabs from '@/components/BaseTabs.vue'
	import BasePagination from '@/components/BasePagination.vue'
	import MuziCard from '@/components/MuziCard.vue'
	export default {
		components: {
			BaseCountDown,
			BaseTabs,
			BasePagination,
			MuziCard
		},
		data() {
			return {
				loadingNum: 0,
				rate: uni.getStorageSync('rate'),
				swipers: [],
				kingkong: [],
				recommend: {
					a: {},
					b: {},
					c: {},
					list:[]
				},
				promotionList: [],
				time: 0,
				cartDisabled: false,
				tabTitles: [],
				list: [],
				params: {
					onefunctioncategory: '',
					countryCode: ''
				}
			}
		},
		onLoad() {
			this.getSwipers() // 获取轮播图数据
			this.getKingKong() // 获取金刚区数据
			this.getRecommend() // 获取推荐产品
			this.getPromotionProduct() // 获取促销产品
			this.getTabTitleList() // 获取类型标题
		},
		onReachBottom() {
			this.$refs.paginationRef.addPage()
		},
		methods: {
			async getSwipers() {
				const res = await this.$api({url: '/open/home/get_banner'})
				this.swipers = res.data.data
				this.loadingNum += 1
			},
			async getKingKong() {
				const res = await this.$api({url: '/open/home/get_product_class'})
				this.kingkong = res.data.data
				this.loadingNum += 1
			},
			async getRecommend() {
				const res = await this.$api({url: '/open/home/wxapp/getrecommend'})
				this.recommend.a = res.data.data[0]
				this.recommend.b = res.data.data[1]
				this.recommend.c = res.data.data[2]
				this.recommend.list = res.data.data.slice(3)
				this.loadingNum += 1
			},
			async getPromotionProduct() {
				const res = await this.$api({url: '/open/home/wxapp/getPromotionProduct'})
				if(res.data.data.length > 0) this.time = (Date.parse(res.data.data[0].dendtime) - Date.parse(new Date()))
				this.promotionList = res.data.data
				this.loadingNum += 1
			},
			async getTabTitleList() {
				const res = await this.$api({url: '/open/home/wxapp/get_home_first_class'})
				this.tabTitles = res.data.data
				Object.assign(this.params, {countryCode: res.data.data[0].scountry, onefunctioncategory: res.data.data[0].sfuncid})
				this.loadingNum += 1
			},
			changeTabs(countryCode, secondClass) {
				Object.assign(this.params, {countryCode: countryCode, onefunctioncategory: secondClass})
				uni.pageScrollTo({ selector: '.tab-view', duration: 0 })
			},
			// 加入购物车
			async addCart(productid) {
				if(!this.cartDisabled) {
					if(!uni.getStorageSync('token')) { uni.navigateTo({ url:'/pages/login/login'}); return }
					this.cartDisabled = true
					uni.showLoading({title: '加载中'})
					const res = await this.$api({
						method: 'POST',
						contentType: 'application/x-www-form-urlencoded',
						url: '/cart/post',
						data: { userid: uni.getStorageSync('user').id, productid: productid }
					})
					if(res.data.code === 20000) {
						setTimeout(() => {
							uni.showToast({ title:'成功加入购物车', complete: () => {this.cartDisabled = false}})
						}, 300)
					}
					if(res.data.code !== 20000) {
						setTimeout(() => {
							uni.showToast({ title:'加入购物车失败', complete: () => {this.cartDisabled = false} })
						}, 300)
					}
				}
			}
		}
	}
</script>

<style scoped>
	.top-bg {
		width: 750rpx;
		height: 325rpx;
		background: linear-gradient(360deg, rgba(249, 95, 94, 0) 0%, rgba(249, 95, 93, 0.01) 0%, rgba(249, 92, 90, 0.07) 0%, #F13130 100%);
	}

	.discount-view {
		padding: 34rpx 0 28rpx 20rpx;
		height: 516rpx;
		background-image: url(@/static/images/home/bg-discount.png);
		background-repeat: no-repeat;
		background-size: contain;
		margin-bottom: 26rpx
	}
</style>
