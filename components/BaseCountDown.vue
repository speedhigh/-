<template>
	<u-count-down 
		:time="time" 
		format="DD:HH:mm:ss" 
		autoStart 
		millisecond 
		@change="onChange"
	>
		<view class="time">
			<view class="time__custom">
				<text class="time__custom__item">{{ timeData.days }}</text>
			</view>
			<text class="time__doc">天</text>
			<view class="time__custom">
				<text class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
			</view>
			<text class="time__doc">:</text>
			<view class="time__custom">
				<text class="time__custom__item">{{ timeData.minutes }}</text>
			</view>
			<text class="time__doc">:</text>
			<view class="time__custom">
				<text class="time__custom__item">{{ timeData.seconds }}</text>
			</view>
		</view>
	</u-count-down>
</template>

<script>
	export default {
		props: {
			time: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				timeData: {},
			}
		},
		methods: {
			onChange(e) {
				this.timeData = e
			}
		}
	}
</script>

<style lang="scss">
	.time {
		@include flex;
		align-items: center;

		&__custom {
			margin-top: 4px;
			width: 22px;
			height: 22px;
			background-color: #FFFFFF;
			border-radius: 4px;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;

			&__item {
				color: #1A202C;
				font-size: 12px;
				text-align: center;
			}
		}

		&__doc {
			color: #FFFFFF;
			padding: 0px 4px;
		}

		&__item {
			color: #606266;
			font-size: 15px;
			margin-right: 4px;
		}
	}
</style>
