<template>
	<view class="text-sm text-gray-800 bg-gray-200 min-h-screen" style="padding: 0 32rpx">
		<!-- 地址管理 -->
		<view class="flex items-center justify-between u-border-bottom" style="height: 108rpx">
			<view>地址管理</view>
			<u-icon slot="right" name="arrow-right" />
		</view>
		<!-- 个人信息 -->
		<view class="flex items-center justify-between u-border-bottom" style="height: 108rpx">
			<view>个人信息</view>
			<u-icon slot="right" name="arrow-right" />
		</view>
		<!-- 售后服务 -->
		<view class="flex items-center justify-between u-border-bottom" style="height: 108rpx">
			<view>售后服务</view>
			<u-icon slot="right" name="arrow-right" />
		</view>
		<!-- 关于我们 -->
		<view class="flex items-center justify-between u-border-bottom" style="height: 108rpx">
			<view>关于我们</view>
			<u-icon slot="right" name="arrow-right" />
		</view>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
