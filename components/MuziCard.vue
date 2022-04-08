<template>
	<view 
		class="bg-white rounded-md" 
		style="width: 340rpx; height: 586rpx; margin: 18rpx 0"
	>
		<image :src="item.simage1" width="340rpx" height="340rpx" class="rounded-t-md" style="width: 340rpx; height: 340rpx"/>
		<view class="relative" style="padding: 12rpx 8rpx 30rpx 10rpx">
			<rich-text :nodes="item.stitle" class="text-md line-2" style="height: 84rpx; line-height: 42rpx" />
			<view class="text-slg font-bold text-red-400" style="margin-top: 16rpx; padding: 0 8rpx; line-height: 48rpx">{{ item.iprice }}港币</view>
			<view class="text-gray-600 font-thin" style="padding: 2rpx 8rpx; line-height: 40rpx">约{{ Math.round(item.iprice * rate * 10) / 10 }}元</view>
			<view 
				class="absolute bg-gray-100 text-center text-xs text-gray-500" 
				style="right: 0; bottom: 30rpx; width: 132rpx; height: 46rpx; border-radius: 200px 0px 0px 200px; line-height: 46rpx;"
			>
				已售 {{ item.icountsale }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"MuziCard",
		props: {
			item: {
				type: Object,
				resquired: true
			}
		},
		data() {
			return {
				rate: uni.getStorageSync('rate')
			}
		}
	}
</script>
