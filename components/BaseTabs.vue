<template>
	<view class="center-cut-menu">
		<scroll-view scroll-x="true" enable-flex="true" scroll-with-animation="true" class="scroll-view" :scroll-left="scrollLeft">
			<view class="flex items-center">
				<view class="scroll-item" v-for="(item, index) in list" :key="index" @click="changeMenu(index, item.scountry, item.sfuncid)">
					<text class="item-text text-gray-900" :class="curIndex == index? 'active' : ''">{{ item.sname }}</text>
					<view 
						class="text-xs" 
						:class="curIndex === index ? 'bg-origin-400 text-white rounded-full' : 'text-gray-700'" 
						style="line-height: 44rpx; margin-top: 10rpx;"
					>
						{{ item.seodescription }}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
 
<script>
	export default {
		props: {
			list : {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				contentScrollW: 0, // 导航区宽度
				curIndex: 0, // 当前选中
				scrollLeft: 0, // 横向滚动条位置
			}
		},
		watch: {
			list: {
				handler(item,index) {
					if(item.length > 0) this.getScrollW()
				},
				deep: true ,// 深度监听父组件传过来对象变化
				immediate: true
			}
		},
		methods: {
			// 获取标题区域宽度，和每个子元素节点的宽度以及元素距离左边栏的距离
			getScrollW() {
				let query = uni.createSelectorQuery().in(this)
				query.select('.scroll-view').boundingClientRect(data => {
					this.contentScrollW = data.width	// 拿到 scroll-view 组件宽度
				}).exec();
 
				query.selectAll('.scroll-item').boundingClientRect(data => {
					for (let i = 0; i < data.length; i++) {
						this.list[i].left = data[i].left;		//  scroll-view 子元素组件距离左边栏的距离
						this.list[i].width = data[i].width	//  scroll-view 子元素组件宽度
					}
				}).exec()
			},
 
			// 选择标题
			changeMenu(index, countryCode, secondClass) {
				this.$emit('change',countryCode, secondClass)
				this.curIndex = index
				this.scrollLeft = this.list[index].left - this.contentScrollW / 2 + this.list[index].width / 2
			}
		}
	}
</script>
 
<style lang="scss">
	.center-cut-menu {
		width: 100%;
		height: 138rpx;
		box-sizing: border-box;
		padding: 16rpx;
 
		.scroll-view {
			height: 126rpx;
			white-space: nowrap;
 
			.scroll-item {
				height: 126rpx;
				padding: 0 20rpx;
				// display: inline-block;
				text-align: center;
 
				.item-text {
					font-size: 30rpx;
					line-height: 40rpx;
 
					&.active {
						color: #E94D4C;
					}
				}
			}
		}
	}
</style>