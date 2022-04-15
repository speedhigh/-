<template>
	<view class="bg-gray-200 text-gray-800 text-sm min-h-screen">
		<!-- top -->
		<view 
			class="bg-red-400 rounded-b-2xl text-white" 
			style="height: 380rpx; padding: 50rpx 24rpx 0 30rpx"
		>
			<view class="flex">
				<u--image src="/static/images/user/avatar.png" width="110rpx" height="110rpx" shape="circle" />
				<view v-if="!isLogin" style="margin-left: 24rpx; margin-top: 30rpx">
					<view>登录/注册</view>
				</view>
				<view v-else style="margin-left: 24rpx; margin-top: 16rpx">
					<view>{{ user.userMaintbl.iname }}</view>
					<view style="margin-top: 8rpx">{{ user.userMaintbl.imobile }}</view>
				</view>
				<navigator url="/subpages/set/set" class="ml-auto" style="margin-top: 14rpx">
					<u-icon name="setting" color="#FFFFFF" size="48rpx" />
				</navigator>
			</view>
			<view 
				class="flex items-center justify-around" 
				style="margin-top: 40rpx; padding: 0 32rpx"
			>
				<!-- 收藏 -->
				<view class="text-center">
					<view class="text-lg">{{ isLogin ? user.collectcount : '0' }}</view>
					<view class="text-xs" style="margin-top: 8rpx">收藏</view>
				</view>
				<u-line direction="col" length="36rpx" color="#FFFFFF" :hairline="false" />
				<!-- 关注品牌 -->
				<view class="text-center">
					<view class="text-lg">{{ isLogin ? user.brandcount : '0' }}</view>
					<view class="text-xs" style="margin-top: 8rpx">关注品牌</view>
				</view>
				<u-line direction="col" length="36rpx" color="#FFFFFF" :hairline="false" />
				<!-- 足迹 -->
				<view class="text-center">
					<view class="text-lg">0</view>
					<view class="text-xs" style="margin-top: 8rpx">足迹</view>
				</view>
				<u-line direction="col" length="36rpx" color="#FFFFFF" :hairline="false" />
				<!-- 优惠券 -->
				<view class="text-center">
					<view class="text-lg">{{ isLogin ? user.quancount : '0' }}</view>
					<view class="text-xs" style="margin-top: 8rpx">优惠券</view>
				</view>
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
				<view class="flex flex-col items-center">
					<u--image src="/static/images/user/全部订单.webp" width="56rpx" height="56rpx" />
					<view class="text-xs" style="margin-top: 12rpx">全部订单</view>
				</view>
				<u-line direction="col" length="36rpx" :hairline="false" />
				<!-- 待付款 -->
				<view class="flex flex-col items-center relative">
					<u--image src="/static/images/user/待付款.webp" width="56rpx" height="56rpx" />
					<view class="text-xs" style="margin-top: 12rpx">待付款</view>
					<u-badge v-if="isLogin" max="99" :value="user.daifukuancount" :offset="[-10,-14]" absolute />
				</view>
				<u-line direction="col" length="36rpx" :hairline="false" />
				<!-- 待发货 -->
				<view class="flex flex-col items-center">
					<u--image src="/static/images/user/待发货.webp" width="56rpx" height="56rpx" />
					<view class="text-xs" style="margin-top: 12rpx">待发货</view>
					<u-badge v-if="isLogin" max="99" :value="user.daifahuocount" :offset="[-10,-14]" absolute />
				</view>
				<u-line direction="col" length="36rpx" :hairline="false" />
				<!-- 待收货 -->
				<view class="flex flex-col items-center">
					<u--image src="/static/images/user/待收货.webp" width="60rpx" height="52rpx" />
					<view class="text-xs" style="margin-top: 12rpx">待收货</view>
					<u-badge v-if="isLogin" max="99" :value="user.daishouhuocount" :offset="[-10,-14]" absolute />
				</view>
				<u-line direction="col" length="36rpx" :hairline="false" />
				<!-- 待评价 -->
				<view class="flex flex-col items-center">
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
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
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
				this.getUserInfo()
			}
		},
		methods: {
			async getUserInfo() {
				const res = await this.$api({url: '/myhome/get', data: {userid: uni.getStorageSync('user').id}})
				Object.assign(this.user, res.data.data)
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
			// 去登录
			toLogin() {
				uni.navigateTo({ url: '/pages/login/login' })
			}
		}
	}
</script>

<style>

</style>
