<template>
	<view class="relative text-sm text-gray-800">
		<!-- 搜索 -->
		<view class="search sticky top-0 inset-x-0 bg-white" style="padding: 8rpx 26rpx 8rpx 26rpx; z-index: 999">
			<navigator url="/pages/search/search">
				<u-search disabled :showAction="false" height="74rpx" placeholder="搜索药品名、品牌" />
			</navigator>
		</view>
		<!-- 药品分类 -->
		<view class="flex" :style="scrollHeight">
			<scroll-view scroll-y="true" class="bg-gray-100" style="width: 270rpx;">
				<view 
					v-for="(item, index) in navList" 
					:key="i" class="text-center" 
					style="height: 90rpx"
					:class="active === index ? 'bg-white font-bold' : 'bg-gray-100'"
					@click="changeTabs(index)"
				>
					<text style="line-height: 90rpx">{{ item.sname }}</text>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" lower-threshold="150" @scrolltolower="scrolltolower">
				<base-pagination url="/open/home/search" :params="params" :currentPage="currentPage">
					<template v-slot="{list}">
						<view v-for="(item, index) in list" :key="index" style="height: 230rpx; padding: 0 22rpx 0 14rpx">
							<navigator
								:url="'/pages/detail/detail?id=' + item.id"
								class="flex relative" 
								style="padding: 36rpx 0 24rpx 0; border-bottom: 2rpx solid #EDF2F7"
							>
								<view class="flex-shrink-0" style="width: 168rpx; padding: 18rpx 14rpx 14rpx 24rpx">
									<u--image :src="item.simage1" width="130rpx" height="130rpx" radius="8rpx" />
								</view>
								<view class="flex-grow" style="margin-left: 20rpx">
									<view class="line-2" style="height: 80rpx; line-height: 40rpx">{{ item.stitle }}</view>
									<view class="text-red-400 font-bold" style="margin-top: 20rpx">{{ item.iprice }}港币</view>
									<view class="text-gray-600" style="margin-top: 4rpx">约1911.2元</view>
								</view>
								<view class="absolute right-0" style="padding: 12rpx; bottom: 18rpx" @click.stop="addCart(item.id)">
									<u-icon size="42rpx" name="plus-circle-fill" color="#F03E38" />
								</view>
							</navigator>
						</view>
					</template>
				</base-pagination>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import BasePagination from '@/components/BasePagination.vue'
	export default {
		components: {
			BasePagination
		},
		data() {
			return {
				scrollHeight: "",
				navList: [],
				active: 0,
				cartDisabled: false,
				params: {
					onefunctioncategory: '',
					countryCode: ''
				},
				currentPage: 1
			}
		},
		onLoad() {
			this.scrollHeight = `height:${uni.getSystemInfoSync().windowHeight-50}px`
			this.getNav()
		},
		onReachBottom() {
			this.currentPage++
		},
		methods: {
			scrolltolower() {
				this.currentPage++
			},
			async getNav() {
				const res = await this.$api({url: '/open/home/wxapp/get_nav_class'})
				console.log(res)
				this.navList = res.data.data
				this.currentPage = 1
				let obj = { countryCode: '01', onefunctioncategory: res.data.data[0].sfuncid }
				Object.assign(this.params, obj)
			},
			changeTabs(index) {
				this.active = index
				this.currentPage = 1
				let obj = { countryCode: '01', onefunctioncategory: this.navList[index].sfuncid }
				Object.assign(this.params, obj)
				uni.pageScrollTo({ scrollTop: 0, duration: 0 })
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