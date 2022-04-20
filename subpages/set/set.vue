<template>
	<view class="text-sm text-gray-800" style="padding: 0 32rpx">
		<!-- 实名认证 -->
		<navigator
			url="/subpages/shiming/shiming"
			class="flex items-center justify-between u-border-bottom" 
			style="height: 108rpx"
		>
			<view>实名认证</view>
			<u-icon slot="right" name="arrow-right" />
		</navigator>
		<!-- 地址管理 -->
		<navigator
			:url="'/subpages/address/address?from=set'"
			class="flex items-center justify-between u-border-bottom" 
			style="height: 108rpx"
		>
			<view>地址管理</view>
			<u-icon slot="right" name="arrow-right" />
		</navigator>
		<!-- 售后服务 serve -->
		<view 
			class="flex items-center justify-between u-border-bottom" 
			style="height: 108rpx"
			@click="serve.show = true"
		>
			<view>售后服务</view>
			<u-icon slot="right" name="arrow-right" />
		</view>
		<u-action-sheet :actions="serve.list" :show="serve.show" cancelText="取消" @close="serve.show = false" @select="selServe" />
		<!-- 关于我们 about -->
		<view
			class="flex items-center justify-between u-border-bottom"
			style="height: 108rpx"
			@click="about.show = true"
		>
			<view>关于我们</view>
			<u-icon slot="right" name="arrow-right" />
		</view>
		<u-action-sheet :actions="about.list" :show="about.show" cancelText="取消" @close="about.show = false" @select="selAbout" />
		<!-- 隐私条款 -->
		<navigator
			url="/subpages/article/article?title=隐私条款&salias=ystk"
			class="flex items-center justify-between u-border-bottom" 
			style="height: 108rpx"
		>
			<view>隐私条款</view>
			<u-icon slot="right" name="arrow-right" />
		</navigator>
		<!-- 服务条款 -->
		<navigator
			url="/subpages/article/article?title=服务条款&salias=advice"
			class="flex items-center justify-between u-border-bottom"
			style="height: 108rpx"
		>
			<view>服务条款</view>
			<u-icon slot="right" name="arrow-right" />
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serve: {
					show: false,
					list: [
						{ name: '退货政策' },
						{ name: '退货流程' },
						{ name: '退货说明' }
					]
				},
				about: {
					show: false,
					list: [
						{ name: '关于我们' },
						{ name: '药商资质' },
						{ name: '联系我们' }
					]
				}
			}
		},
		methods: {
			selServe(e) {
				let obj = { '退货政策': 'refundpolicy', '退货流程': 'thlc', '退货说明': 'tksm' }
				uni.navigateTo({ url: '/subpages/article/article?title=' + e.name + '&salias=' + obj[e.name] })
			},
			selAbout(e) {
				let obj = { '关于我们': 'aboutus', '药商资质': 'certifcate', '联系我们': 'contact' }
				uni.navigateTo({ url: '/subpages/article/article?title=' + e.name + '&salias=' + obj[e.name] })
			}
		}
	}
</script>
