<template>
	<view class="relative text-gray-800 text-sm bg-gray-200 min-h-screen" style="padding-bottom: 128rpx">
		<!-- loading -->
		<u-loading-page :loading="showLoading" loadingText="正在加载..." style="z-index: 999" />
		<!-- empty -->
		<view v-if="showEmpty" style="padding: 200rpx">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png" text="地址列表为空">
			</u-empty>
		</view>
		<!-- list -->
		<view style="padding: 24rpx">
			<view 
				v-for="(item,index) in list"
				:key="index" 
				class="bg-white rounded-md shadow" 
				style="margin-bottom: 20rpx"
			>
				<view 
					class="flex items-center" 
					style="padding: 24rpx" 
					@click="selectedAddress(item.id)"
				>
					<!-- checked -->
					<view
						class="rounded-full flex-shrink-0 flex items-center justify-center"
						:class="item.id === chosenId ? 'bg-red-400' : 'bg-white u-border'"
						style="width: 34rpx; height: 34rpx"
					>
						<u-icon v-show="item.id === chosenId" size="34rpx" labelSize="22rpx" name="checkbox-mark" color="#FFFFFF" />
					</view>
					<!-- content -->
					<view class="flex-grow text-base" style="margin-left: 24rpx">
						<view class="flex items-center" style="margin-bottom: 16rpx">
							<view class="text-md line-1">{{ item.name }} <text style="letter-spacing: -0.05em">{{ item.tel }}</text></view>
							<view 
								v-show="item.isDefault" 
								class="bg-red-400 text-xs text-white rounded-full" 
								style="padding: 0 8rpx; margin-left: 16rpx"
							>
								默认
							</view>
						</view>
						<view class="line-2 text-xs text-gray-600">{{ item.address }}</view>
					</view>
					<!-- edit -->
					<view class="flex-shrink-0" style="padding: 16rpx" @click.native.stop="editAddress(item.id)">
						<u-icon name="edit-pen" color="#999999" size="46rpx"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 新增地址 -->
		<view 
			v-if="!showLoading" 
			class="fixed bottom-0 inset-x-0 bg-white u-border-top" 
			style="padding: 16rpx 32rpx; z-index: 999"
		>
			<button class="bg-red-400 text-white rounded-full text-base" @click="addAddress">
				新增地址
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageFrom: '',
				chosenId: uni.getStorageSync('addressId'),
				showLoading: true,
				showEmpty: false,
				list: []
			}
		},
		onLoad(option) {
			this.pageFrom = option.from
		},
		onShow() {
			this.getAddressList()
		},
		methods: {
			async getAddressList() {
				const res = await this.$api({url: '/useraddress/getList', data: {userid: uni.getStorageSync('user').id}})
				this.list = res.data.data
				this.showLoading = false
				if(res.data.data.length === 0) this.showEmpty = true
			},
			// 选择地址
			selectedAddress(id) {
				this.chosenId = id
				uni.setStorageSync('addressId', id)
				uni.redirectTo({ url: '/subpages/confirmorder/confirmorder?from=' + this.pageFrom })
			},
			// 新增地址
			addAddress() {
				uni.navigateTo({ url: '/subpages/address/edit?from=' + this.pageFrom + '&operation=creat' })
			},
			// 编辑地址
			editAddress(id) {
				uni.navigateTo({ url: '/subpages/address/edit?from=' + this.pageFrom + '&operation=edit&addressId=' + id })
			}
		}
	}
</script>
