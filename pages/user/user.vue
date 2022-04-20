<template>
	<view class="bg-gray-200 text-gray-800 text-sm min-h-screen">
		<!-- loading -->
		<u-loading-page :loading="showLoading" loadingText="正在加载..." style="z-index: 99999" />
		<view v-if="!showLoading">
			<!-- top -->
			<view 
				class="bg-red-400 rounded-b-2xl text-white" 
				style="height: 380rpx; padding: 50rpx 24rpx 0 30rpx"
			>
				<view class="flex">
					<u--image v-if="!isLogin" src="/static/images/user/avatar.png" width="110rpx" height="110rpx" shape="circle" @click="toLogin" />
					<u--image v-else :src="info.avatar" width="110rpx" height="110rpx" shape="circle" />
					<view v-if="!isLogin" style="margin-left: 24rpx; margin-top: 30rpx" @click="toLogin">
						<view>登录/注册</view>
					</view>
					<view v-else style="margin-left: 24rpx; margin-top: 16rpx">
						<view>{{ info.name }}</view>
						<view style="margin-top: 8rpx">{{ user.userMaintbl.imobile }}</view>
					</view>
					<navigator url="/subpages/set/set" class="ml-auto" style="margin-top: 14rpx">
						<u-icon name="setting" color="#FFFFFF" size="48rpx" />
					</navigator>
				</view>
				<view 
					class="flex items-center justify-around" 
					style="margin-top: 40rpx; padding: 0 24rpx"
				>
					<!-- 收藏 -->
					<navigator url="/subpages/collection/collection" class="text-center" style="width: 110rpx; height: 98rpx">
						<view class="text-lg">{{ isLogin ? user.collectcount : '0' }}</view>
						<view class="text-xs" style="margin-top: 8rpx">收藏</view>
					</navigator>
					<u-line direction="col" length="36rpx" color="#FFFFFF" :hairline="false" />
					<!-- 关注品牌 -->
					<view class="text-center" style="width: 110rpx; height: 98rpx">
						<view class="text-lg">{{ isLogin ? user.brandcount : '0' }}</view>
						<view class="text-xs" style="margin-top: 8rpx">关注品牌</view>
					</view>
					<u-line direction="col" length="36rpx" color="#FFFFFF" :hairline="false" />
					<!-- 足迹 -->
					<navigator url="/subpages/history/history" class="text-center" style="width: 110rpx; height: 98rpx">
						<view class="text-lg">{{ isLogin ? user.userhistorycount : '0' }}</view>
						<view class="text-xs" style="margin-top: 8rpx">足迹</view>
					</navigator>
					<u-line direction="col" length="36rpx" color="#FFFFFF" :hairline="false" />
					<!-- 优惠券 -->
					<navigator url="/subpages/coupon/coupon?type=readonly" class="text-center" style="width: 110rpx; height: 98rpx">
						<view class="text-lg">{{ isLogin ? user.quancount : '0' }}</view>
						<view class="text-xs" style="margin-top: 8rpx">优惠券</view>
					</navigator>
				</view>
			</view>
			<!-- main -->
			<view style="padding: 0 32rpx">
				<!-- 1, 积分、余额 -->
				<view
					class="rounded-xl bg-white flex items-center" 
					style="height: 140rpx; margin-top: -70rpx; padding: 16rpx"
				>
					<view class="flex items-center" style="width: 50%; padding: 0 16rpx">
						<view>
							<view class="font-bold" style="margin-bottom: 10rpx">积分</view>
							<view class="text-xs text-gray-600">积分兑换好礼</view>
						</view>
						<view class="ml-auto font-bold text-lg">{{ isLogin ? user.jifen : '0' }}</view>
					</view>
					<view class="flex items-center" style="width: 50%; padding: 0 16rpx">
						<view>
							<view class="font-bold" style="margin-bottom: 10rpx">余额</view>
							<view class="text-xs text-gray-600">充值更方便</view>
						</view>
						<view class="ml-auto font-bold text-lg">{{ isLogin ? user.money : '0' }}</view>
					</view>
				</view>
				<!-- 2, 订单信息 -->
				<view 
					class="rounded-xl bg-white flex items-center justify-around" 
					style="margin-top: 24rpx; height: 160rpx; padding: 16rpx"
				>
					<!-- 全部订单 -->
					<view class="flex flex-col items-center" @click="toOrder(0, 0)">
						<u--image src="/static/images/user/全部订单.webp" width="56rpx" height="56rpx" />
						<view class="text-xs" style="margin-top: 12rpx">全部订单</view>
					</view>
					<u-line direction="col" length="36rpx" :hairline="false" />
					<!-- 待付款 -->
					<view class="flex flex-col items-center relative" @click="toOrder(1, 1)">
						<u--image src="/static/images/user/待付款.webp" width="56rpx" height="56rpx" />
						<view class="text-xs" style="margin-top: 12rpx">待付款</view>
						<u-badge v-if="isLogin" max="99" :value="user.daifukuancount" :offset="[-10,-14]" absolute />
					</view>
					<u-line direction="col" length="36rpx" :hairline="false" />
					<!-- 待发货 -->
					<view class="flex flex-col items-center relative" @click="toOrder(2, 2)">
						<u--image src="/static/images/user/待发货.webp" width="56rpx" height="56rpx" />
						<view class="text-xs" style="margin-top: 12rpx">待发货</view>
						<u-badge v-if="isLogin" max="99" :value="user.daifahuocount" :offset="[-10,-14]" absolute />
					</view>
					<u-line direction="col" length="36rpx" :hairline="false" />
					<!-- 待收货 -->
					<view class="flex flex-col items-center relative" @click="toOrder(3, 3)">
						<u--image src="/static/images/user/待收货.webp" width="60rpx" height="52rpx" />
						<view class="text-xs" style="margin-top: 12rpx">待收货</view>
						<u-badge v-if="isLogin" max="99" :value="user.daishouhuocount" :offset="[-10,-14]" absolute />
					</view>
					<u-line direction="col" length="36rpx" :hairline="false" />
					<!-- 待评价 -->
					<view class="flex flex-col items-center relative" @click="toOrder(5, 4)">
						<u--image src="/static/images/user/待评价.webp" width="56rpx" height="56rpx" />
						<view class="text-xs" style="margin-top: 12rpx">待评价</view>
						<u-badge v-if="isLogin" max="99" :value="user.daipingjiacount" :offset="[-10,-14]" absolute />
					</view>
				</view>
				<!-- 3, 菜单menu -->
				<view 
					class="rounded-xl bg-white" 
					style="margin-top: 24rpx; height: 326rpx; padding: 0 32rpx"
				>
					<!-- 编码查询 -->
					<view class="u-border-bottom flex items-center justify-between" style="height: 108rpx" @click="showToast">
						<view>编码查询</view>
						<u-icon slot="right" name="arrow-right" />
					</view>
					<!-- 购物指南 -->
					<navigator
						url="/subpages/guide/guide"
						class="u-border-bottom flex items-center justify-between"
						style="height: 108rpx"
					>
						<view>购物指南</view>
						<u-icon slot="right" name="arrow-right" />
					</navigator>
					<!-- 物流配送 -->
					<navigator
						url="/subpages/logistics/logistics"
						class="flex items-center justify-between"
						style="height: 108rpx"
					>
						<view>物流配送</view>
						<u-icon slot="right" name="arrow-right" />
					</navigator>
				</view>
			</view>
			<!-- button -->
			<view style="margin-top: 16rpx; padding:32rpx 85rpx">
				<view 
					v-if="!isLogin" 
					class="bg-red-400 text-white rounded-full text-center"
					style="line-height: 80rpx"
					@click="toLogin"
				>
					一键登录/注册
				</view>
				<view 
					v-else
					class="bg-red-400 text-white rounded-full text-center"
					style="line-height: 80rpx"
					@click="quit"
				>
					退出登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				isLogin: false,
				info: {
					name: '',
					avatar: ''
				},
				user: {
					quancount: 0,
					brandcount: 0,
					collectcount: 0,
					daifahuocount: 0,
					daifukuancount: 0,
					daipingjiacount: 0,
					daishouhuocount: 0,
					userMaintbl: {}
				}
			}
		},
		onShow() {
			this.isLogin = !!(uni.getStorageSync('token'))
			if(uni.getStorageSync('token')) {
				this.info.name = uni.getStorageSync('info').nickName
				this.info.avatar = uni.getStorageSync('info').avatarUrl
				this.getUserInfo()
			} else {
				setTimeout(() => { this.showLoading = false }, 200)
			}
		},
		methods: {
			async getUserInfo() {
				const res = await this.$api({url: '/myhome/get', data: {userid: uni.getStorageSync('user').id}})
				Object.assign(this.user, res.data.data)
				this.showLoading = false
			},
			showToast() {
				uni.showToast({title: '功能即将上线', icon: 'none'})
			},
			// 退出登录
			quit() {
				uni.showModal({
					title: '确定要退出登录吗？',
					confirmColor: '#F03E38',
					success: () => {
						uni.removeStorage({ key: 'openid'})
						uni.removeStorage({ key: 'token' })
						uni.removeStorage({ key: 'user' })
						uni.removeStorage({ key: 'shiming' })
						uni.reLaunch({ url: '/pages/user/user' })
					}
				})
			},
			// 去订单页
			toOrder(state, active) {
				if(uni.getStorageSync('token')) {
					uni.navigateTo({ url: '/subpages/order/order?state=' + state +'&active=' + active })
				} else {
					uni.showModal({ title: '您还未登录，请先登录', icon: 'fail', showCancel: false, success: () => {
						uni.navigateTo({ url: '/pages/login/login' })
					}})
				}
			},
			// 去登录
			toLogin() {
				uni.navigateTo({ url: '/pages/login/login' })
			}
		}
	}
</script>

<style>

</style>
