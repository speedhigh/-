<template>
	<view class="text-sm text-gray-800 bg-gray-200 min-h-screen">
		<!-- loading -->
		<u-loading-page v-if="loadingNum < 2" :loading="true" loadingText="正在加载..."  style="z-index: 999"/>
		<!-- content -->
		<view v-if="list.length > 0 && loadingNum >= 2">
			<!-- 1. info -->
			<view class="bg-white p-4 rounded-b-2xl">
				<view class="flex">
					<view class="flex-shrink-0 relative rounded-md" style="width: 200rpx; height: 200rpx">
						<u--image :src="info.productImg" width="200rpx" height="200rpx" radius="7" />
						<view 
							class="absolute bottom-0 inset-x-0 text-center text-white text-xs rounded-b-md" 
							style="background-color: rgba(0,0,0,0.6); line-height: 40rpx"
						>
							共{{ info.count }}件商品
						</view>
					</view>
					<view class="flex-grow flex flex-col justify-between text-xs" style="padding: 8rpx 0; margin-left: 32rpx">
						<p>订单状态：{{ info.status }}</p>
						<p>物流公司：{{ info.sname }}</p>
						<p>运单号码：{{ info.swaybillnum }}</p>
						<p>订 单 号：{{ info.orderid }}</p>
					</view>
				</view>
			</view>
			<!-- 2. address -->
			<view class="p-4 bg-white rounded-2xl" style="margin-top: 28rpx">
				<view style="margin-bottom: 16rpx">{{ address.slinkman }} {{ address.smobile }}</view>
				<view class="line-2 text-xs text-gray-600">
					{{ address.saddressname }} {{ address.sdetail }}
				</view>
			</view>
			<!-- 2. seteps -->
			<view class="p-4 bg-white rounded-2xl" style="margin-top: 28rpx">
				<u-steps current="0" direction="column" activeColor="#F03E38" dot>
					<u-steps-item v-for="(item,index) in list" :key="index" :title="item.sdesc" :desc="item.dinserttimestr" />
				</u-steps>
			</view>
		</view>
		<!-- empty -->
		<view v-if="showEmpty && loadingNum >= 2" class="flex items-center justify-center" style="height: 80vh">
			<u-empty text="暂无物流数据"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showEmpty: false,
				loadingNum: 0,
				info: {
					productImg: '',
					count: '',
					status: '',
					sname: '',
					swaybillnum: '',
					orderid: ''
				},
				list: [],
				address: {
					saddressname: "",
					scardno: "",
					sdetail: "",
					slinkman: "",
					smobile: ""
				}
			}
		},
		onLoad(option) {
			this.info.orderid = option.id
			this.getData(option.id)
		  this.getAddress(option.id)
			this.getList(option.id)
		},
		methods: {
			async getData(id) {
				const res = await this.$api({ url: '/ship/getProductInfo', data: {orderid: id} })
				this.info.productImg = res.data.data.productImg
				this.info.count = res.data.data.totalCount
				this.loadingNum += 1
			},
			async getList(id) {
				const res = await this.$api({ url: '/ship/getList', data: {orderid: id} })
				this.list = res.data.data
				if(res.data.data.length > 0) {
					this.info.status = res.data.data[0].iwaybillstatus
					this.info.swaybillnum = res.data.data[0].swaybillnum
					this.info.sname = res.data.data[0].sname
				} else {
					this.showEmpty = true
				}
				this.loadingNum += 1
			},
			async getAddress(id) {
				const res = await this.$api({ url: '/useraddress/getorderaddress', data: {orderid: id} })
				Object.assign(this.address, res.data.data)
				this.loadingNum += 1
			}
		}
	}
</script>

<style>

</style>
