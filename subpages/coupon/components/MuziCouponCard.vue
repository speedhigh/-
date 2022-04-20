<template>
	<view>
		<!-- loading -->
		<view v-show="showLoading" style="padding: 16rpx" >
			<u-loading-icon text="加载中,请稍后..." textSize="16" />
		</view>
		<!-- empty -->
		<view v-show="showEmpty" style="margin-top: 200rpx">
			<u-empty 
				mode="coupon" 
				icon="http://cdn.uviewui.com/uview/empty/coupon.png" 
				:text="type === 'list' ? '暂无可用优惠券' : '不可用列表为空'" 
			/>
		</view>
		<!-- list -->
		<view
			v-show="!showLoading"
			v-for="(item, index) in list"
			:key="item.id"
			class="rounded-lg bg-white shadow"
			style="margin-bottom: 24rpx; height: 258rpx"
		>
			<view 
				class="flex items-center"
				style="height: 190rpx; padding: 28rpx 0; border-bottom: dashed 2rpx #E6E6E6"
				@click="selected(index)"
			>
				<!-- 价格 -->
				<view
					class="flex-shrink-0 flex flex-col items-center justify-center"
					:class="type === 'list' ? 'text-red-400' : ''"
					style="padding: 0 16rpx; width: 192rpx; height: 134rpx"
				>
					<view class="text-center" style="margin-bottom: 12rpx">
						<text class="text-3xl font-bold">{{ item.valueDesc }}</text>
						<text class="text-xs" style="margin-left: 4rpx">{{ item.unitDesc }}</text>
					</view>
					<text class="text-xs">无使用门槛</text>
				</view>
				<!-- title -->
				<view style="margin-top: -16rpx">
					<view class="line-1 font-bold">{{ item.name }}</view>
					<view class="text-xs" style="margin-top: 20rpx">{{ item.startAtstr }} - {{ item.endAtstr }}</view>
				</view>
				<!-- 选择器 -->
				<view v-if="showCheck" class="ml-auto flex-shrink-0 p-4">
					<view v-if="!item.selected" class="rounded-full" style="width: 40rpx; height: 40rpx; border: solid 2rpx #999999" />
					<u-icon v-else name="checkmark-circle-fill" color="#F03E38" size="44rpx" />
				</view>
			</view>
			<view class="flex items-center text-gray-500" style="padding: 0 32rpx; height: 60rpx">
				{{ item.description }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"MuziCouponCard",
		props:{
			list: {
				type: Array,
				required: true
			},
			// 可用列表 list， 不可用列表 noList
			type: {
				type: String,
				default: 'list'
			},
			// 是否显示选择按钮
			showCheck: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showLoading: true,
				showEmpty: false
			}
		},
		methods: {
			selected(index) {
				if(this.showCheck) {
					this.$emit('change', index)
				}
			}
		}
	}
</script>

<style scoped>
	.border {
		border: solid #999999 2rpx;
	}
</style>
