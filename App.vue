<script>
	export default {
		// 当项目初始化完成是触发（全局只触发一次）
		onLaunch: function() { 
			if(!uni.getStorageSync('rate'))	this.getRate()
		},
		// 当 uni-app 启动，或从后台进入前台显示
		onShow: function() {
			console.log('App Show')
		},
		// 当 uni-app 从前台进入后台
		onHide: function() {
			console.log('App Hide')
		},
		// 页面不存在监听函数
		onPageNotFound: function() {
			uni.navigateTo({ url:'/pages/404/404' })
		},
		methods: {
			async getRate() {
				const res = await this.$api({ url: '/open/home/get_huilv' })
				uni.setStorageSync('rate', res.data.data)
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef MP-WEIXIN */
		:not(not) { box-sizing: border-box }
	/* #endif */
	@import "@/uni_modules/uview-ui/index.scss";
	@import  url("./static/css/iconfont.css");
	button { margin: 0 }
	.w-full { width: 750rpx }
	.min-h-screen { min-height: 100vh }
	.h-screen { height: 100vh }
	.block { display: block }
	.inline-block { display: inline-block }
	.flex { display: flex }
	.flex-col { flex-direction: column }
	.flex-wrap { flex-wrap: wrap }
	.items-center { align-items: center }
	.ites-stretch { align-items: stretch; }
	.justify-center { justify-content: center }
	.justify-between { justify-content: space-between }
	.justify-around { justify-content: space-around }
	.flex-shrink-0 { flex-shrink: 0 }
	.flex-grow { flex-grow: 1 }
	.font-normal { font-weight: 400 }
	.font-bold { font-weight: bold }
	.font-thin { font-weight: 300 }
	.text-xs { font-size: 24rpx }
	.text-sm { font-size: 28rpx }
	.text-md { font-size: 30rpx }
	.text-base { font-size: 32rpx }
	.text-slg { font-size: 34rpx }
	.text-lg { font-size: 36rpx }
	.text-xl { font-size: 40rpx }
	.text-2xl { font-size: 44rpx }
	.text-3xl { font-size: 48rpx }
	.text-4xl { font-size: 52rpx }
	.text-center { text-align: center }
	.text-right { text-align: right }
	.text-left { text-align: left }
	.text-white { color: #FFFFFF }
	.text-gray-100 { color: #F7F7F7 }
	.text-gray-200 { color: #F1F1F1 }
	.text-gray-300 { color: #E6E6E6 }
	.text-gray-400 { color: #CCCCCC }
	.text-gray-500 { color: #999999 }
	.text-gray-600 { color: #666666 }
	.text-gray-700 { color: #4a5568 }
	.text-gray-800 { color: #2D3748 }
	.text-gray-900 { color: #1A202C }
	.text-red-300 { color: #FCA5A5 }
	.text-red-400 { color: #F03E38 }
	.text-origin-400 { color: #E94D4C }
	.bg-white { background-color: #FFFFFF }
	.bg-gray-100 { background-color: #F7F7F7 }
	.bg-gray-200 { background-color: #F1F1F1 }
	.bg-gray-300 { background-color: #E6E6E6 }
	.bg-gray-400 { background-color: #CCCCCC }
	.bg-gray-500 { background-color: #999999 }
	.bg-gray-600 { background-color: #666666 }
	.bg-gray-700 { background-color: #4a5568 }
	.bg-red-300 { background-color: #FCA5A5 }
	.bg-red-400 { background-color: #F03E38 }
	.bg-origin-400 { background-color: #E94D4C }
	.overflow-x-scroll { overflow-x: scroll }
	.overflow-y-scroll { overflow-y: scroll }
	.relative { position: relative }
	.absolute { position: absolute }
	.sticky { position: sticky }
	.top-0 { top: 0 }
	.right-0 { right: 0 }
	.bottom-0 { bottom: 0 }
	.inset-x-0 { left: 0; right: 0 }
	.fixed { position: fixed }
	.rounded-t-md { border-top-left-radius: 12rpx; border-top-right-radius: 12rpx }
	.rounded-md { border-radius: 12rpx }
	.rounded-lg { border-radius: 16rpx }
	.rounded-xl { border-radius: 24rpx }
	.rounded-t-xl { border-top-left-radius: 24rpx; border-top-right-radius: 24rpx }
	.rounded-b-xl { border-bottom-left-radius: 24rpx; border-bottom-right-radius: 24rpx }
	.rounded-2xl { border-radius: 32rpx }
	.rounded-t-2xl { border-top-left-radius: 32rpx; border-top-right-radius: 32rpx }
	.rounded-b-2xl { border-bottom-left-radius: 32rpx; border-bottom-right-radius: 32rpx }
	.rounded-full { border-radius: 9999rpx }
	.rounded-l-full { border-bottom-left-radius: 9999rpx; border-top-left-radius: 9999rpx }
	.rounded-r-full { border-bottom-right-radius: 9999rpx; border-top-right-radius: 9999rpx }
	.ml-auto { margin-left: auto }
	.mx-auto { margin-left: auto; margin-right: auto }
	.line-1 { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; word-break: break-all }
	.line-2 { 
		text-overflow: -o-ellipsis-lastline; 
		overflow: hidden; 
		text-overflow: ellipsis;  
		display: -webkit-box;
		-webkit-line-clamp: 2; 
		line-clamp: 2; 
		-webkit-box-orient: vertical;
		word-break: break-all 
	}
</style>
